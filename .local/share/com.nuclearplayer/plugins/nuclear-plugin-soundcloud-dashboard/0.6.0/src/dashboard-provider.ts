import type {
  ArtistRef,
  DashboardProvider,
  FetchFunction,
  PlaylistRef,
  Track,
} from '@nuclearplayer/plugin-sdk';

import {
  getFeaturedTracks,
  getFeedTracks,
  getFollowings,
  getLikedPlaylists,
  getLikedTracks,
  getMixedSelections,
  getOwnPlaylists,
  getPlayHistory,
  getRepostedTracks,
  getTrendingChart,
  getUploadedTracks,
} from './api';
import {
  DASHBOARD_PROVIDER_ID,
  DASHBOARD_PROVIDER_NAME,
  EDITORIAL_PLAYLISTS_LIMIT,
  FEATURED_TRACKS_LIMIT,
  METADATA_PROVIDER_ID,
  PROFILE_ARTISTS_LIMIT,
  PROFILE_PLAYLISTS_LIMIT,
  PROFILE_TRACKS_LIMIT,
  SELECTIONS_LIMIT,
  TOP_ARTISTS_LIMIT,
  TRENDING_CHART_LIMIT,
} from './config';
import { createAuthorizedFetch } from './fetch';
import { mapPlaylistToRef, mapTrack, mapUserToArtistRef } from './mappers';
import { resolveDashboardUser, type Session } from './profile';
import {
  AUTHENTICATED_SOURCES,
  type PlaylistSource,
  type TrackSource,
} from './settings';
import type {
  SoundcloudChartEntry,
  SoundcloudTrack,
  SoundcloudUser,
} from './types';

type Logger = {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
};

/** What the provider needs from the host, kept narrow so it is easy to drive in tests. */
export type ProviderDeps = {
  fetch: FetchFunction;
  log: Logger;
  getProfileUrl: () => Promise<string | undefined>;
  getOAuthToken: () => Promise<string | undefined>;
  getTrackSource: () => Promise<TrackSource | undefined>;
  getPlaylistSource: () => Promise<PlaylistSource | undefined>;
  getSplitTitles: () => Promise<boolean | undefined>;
};

type RankedArtist = {
  user: SoundcloudUser;
  entries: number;
  bestScore: number;
};

/**
 * SoundCloud exposes no artist chart, so this ranks the authors of the trending
 * chart: first by how many of their tracks are charting, then by their best
 * track's score.
 */
const rankChartArtists = (chart: SoundcloudChartEntry[]): ArtistRef[] => {
  const ranked = new Map<number, RankedArtist>();

  for (const { track, score } of chart) {
    const user = track.user;
    const existing = ranked.get(user.id);
    if (existing) {
      existing.entries += 1;
      existing.bestScore = Math.max(existing.bestScore, score ?? 0);
      continue;
    }
    ranked.set(user.id, { user, entries: 1, bestScore: score ?? 0 });
  }

  return [...ranked.values()]
    .sort((a, b) => b.entries - a.entries || b.bestScore - a.bestScore)
    .slice(0, TOP_ARTISTS_LIMIT)
    .map(({ user }) => mapUserToArtistRef(user));
};

const dedupeUsers = (
  users: SoundcloudUser[],
  limit: number,
): SoundcloudUser[] => {
  const seen = new Set<number>();
  const result: SoundcloudUser[] = [];
  for (const user of users) {
    if (!user || seen.has(user.id)) {
      continue;
    }
    seen.add(user.id);
    result.push(user);
    if (result.length >= limit) {
      break;
    }
  }
  return result;
};

const dedupeById = <T extends { id: string }>(
  items: T[],
  limit: number,
): T[] => {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    result.push(item);
    if (result.length >= limit) {
      break;
    }
  }
  return result;
};

export const createDashboardProvider = (
  deps: ProviderDeps,
): DashboardProvider => {
  const { log } = deps;

  /**
   * Settings are read per call rather than captured at registration, so editing
   * the token or profile in Preferences takes effect on the next refresh.
   */
  const openSession = async (): Promise<Session> => {
    const token = (await deps.getOAuthToken())?.trim();
    return resolveDashboardUser({
      authFetch: token
        ? createAuthorizedFetch(deps.fetch, token)
        : deps.fetch,
      plainFetch: deps.fetch,
      token,
      profileUrl: await deps.getProfileUrl(),
      log,
    });
  };

  /**
   * Personal track sources are tried in the user's preferred order first, then
   * the remaining ones, so a profile with no likes still shows its uploads.
   * Feed and history are skipped entirely without a working token.
   */
  const personalTracks = async (
    session: Session,
    user: SoundcloudUser,
  ): Promise<SoundcloudTrack[]> => {
    const { fetch: fetchFn } = session;
    const preferred = (await deps.getTrackSource()) ?? 'likes';
    const loaders: Record<TrackSource, () => Promise<SoundcloudTrack[]>> = {
      likes: () => getLikedTracks(fetchFn, user.id, PROFILE_TRACKS_LIMIT),
      uploads: () => getUploadedTracks(fetchFn, user.id, PROFILE_TRACKS_LIMIT),
      reposts: () => getRepostedTracks(fetchFn, user.id, PROFILE_TRACKS_LIMIT),
      feed: () => getFeedTracks(fetchFn, PROFILE_TRACKS_LIMIT),
      history: () => getPlayHistory(fetchFn, PROFILE_TRACKS_LIMIT),
    };

    const all: TrackSource[] = [
      'likes',
      'uploads',
      'reposts',
      'feed',
      'history',
    ];
    const order = [preferred, ...all.filter((s) => s !== preferred)].filter(
      (source) =>
        session.authenticated || !AUTHENTICATED_SOURCES.includes(source),
    );

    if (!session.authenticated && AUTHENTICATED_SOURCES.includes(preferred)) {
      log.warn(`${preferred} needs a valid OAuth token, using public sources`);
    }

    for (const source of order) {
      try {
        const tracks = await loaders[source]();
        if (tracks.length > 0) {
          log.info(`${user.username}: ${tracks.length} tracks from ${source}`);
          return tracks;
        }
        log.warn(`${user.username}: nothing in ${source}`);
      } catch (error) {
        log.warn(`${user.username}: ${source} failed: ${String(error)}`);
      }
    }
    return [];
  };

  /** Defaults to true: the setting is only absent before it is first written. */
  const splitTitles = async (): Promise<boolean> =>
    (await deps.getSplitTitles()) ?? true;

  const globalTracks = async (fetchFn: FetchFunction): Promise<Track[]> => {
    const split = await splitTitles();
    const chart = await getTrendingChart(fetchFn, TRENDING_CHART_LIMIT);
    if (chart.length > 0) {
      log.info(`trending chart: ${chart.length} tracks`);
      return chart.map((entry) => mapTrack(entry.track, split));
    }
    const featured = await getFeaturedTracks(fetchFn, FEATURED_TRACKS_LIMIT);
    log.warn(
      `trending chart empty, fell back to featured tracks: ${featured.length}`,
    );
    return featured.map((track) => mapTrack(track, split));
  };

  return {
    id: DASHBOARD_PROVIDER_ID,
    kind: 'dashboard',
    name: DASHBOARD_PROVIDER_NAME,
    metadataProviderId: METADATA_PROVIDER_ID,
    capabilities: ['topTracks', 'topArtists', 'editorialPlaylists'],

    async fetchTopTracks(): Promise<Track[]> {
      const session = await openSession();
      if (!session.user) {
        return globalTracks(session.fetch);
      }
      const tracks = await personalTracks(session, session.user);
      if (tracks.length === 0) {
        return globalTracks(session.fetch);
      }
      const split = await splitTitles();
      return tracks.map((track) => mapTrack(track, split));
    },

    async fetchTopArtists(): Promise<ArtistRef[]> {
      const session = await openSession();
      if (session.user) {
        const followings = await getFollowings(
          session.fetch,
          session.user.id,
          PROFILE_ARTISTS_LIMIT,
        );
        // Following a handful of people would leave a near-empty row, so top it
        // up with the artists behind the tracks the user actually listens to.
        const heard = await personalTracks(session, session.user);
        const users = dedupeUsers(
          [...followings, ...heard.map((track) => track.user)],
          PROFILE_ARTISTS_LIMIT,
        );
        if (users.length > 0) {
          log.info(
            `${session.user.username}: ${users.length} artists ` +
              `(${followings.length} followed, rest from listening)`,
          );
          return users.map(mapUserToArtistRef);
        }
        log.warn(`${session.user.username}: no artists at all, using charts`);
      }

      const chart = await getTrendingChart(session.fetch, TRENDING_CHART_LIMIT);
      const artists = rankChartArtists(chart);
      log.info(`ranked ${artists.length} artists from ${chart.length} entries`);
      return artists;
    },

    async fetchEditorialPlaylists(): Promise<PlaylistRef[]> {
      const session = await openSession();
      const preference = (await deps.getPlaylistSource()) ?? 'recommended';

      if (preference === 'recommended') {
        const selections = await getMixedSelections(
          session.fetch,
          SELECTIONS_LIMIT,
        );
        const playlists = dedupeById(
          selections.flatMap((selection) =>
            (selection.items?.collection ?? []).map(mapPlaylistToRef),
          ),
          EDITORIAL_PLAYLISTS_LIMIT,
        );
        if (playlists.length > 0) {
          log.info(
            `${playlists.length} recommended playlists from ` +
              `${selections.length} selections` +
              `${session.authenticated ? ' (personalised)' : ' (generic)'}: ` +
              selections.map((s) => s.title).join(', '),
          );
          return playlists;
        }
        log.warn('no recommended playlists, falling back to own playlists');
      }

      if (session.user) {
        const [own, liked] = await Promise.all([
          getOwnPlaylists(
            session.fetch,
            session.user.id,
            PROFILE_PLAYLISTS_LIMIT,
          ),
          getLikedPlaylists(
            session.fetch,
            session.user.id,
            PROFILE_PLAYLISTS_LIMIT,
          ),
        ]);
        const playlists = dedupeById(
          [...own, ...liked].map(mapPlaylistToRef),
          PROFILE_PLAYLISTS_LIMIT,
        );
        if (playlists.length > 0) {
          log.info(
            `${session.user.username}: ${own.length} own + ${liked.length} liked playlists`,
          );
          return playlists;
        }
        log.warn(`${session.user.username}: no playlists, using selections`);
      }

      const selections = await getMixedSelections(
        session.fetch,
        SELECTIONS_LIMIT,
      );
      const playlists = dedupeById(
        selections.flatMap((selection) =>
          (selection.items?.collection ?? []).map(mapPlaylistToRef),
        ),
        EDITORIAL_PLAYLISTS_LIMIT,
      );
      log.info(
        `editorial playlists: ${playlists.length} from ${selections.length} selections`,
      );
      return playlists;
    },
  };
};
