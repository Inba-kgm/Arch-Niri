import type {
  FetchFunction,
  Playlist,
  PlaylistProvider,
} from '@nuclearplayer/plugin-sdk';

import { getSystemPlaylist, getTracks } from './api';
import {
  PLAYLIST_PROVIDER_ID,
  PLAYLIST_PROVIDER_NAME,
  SYSTEM_PLAYLIST_URN_REGEX,
  TRACK_BATCH_SIZE,
} from './config';
import { createAuthorizedFetch } from './fetch';
import { mapSystemPlaylistToPlaylist } from './mappers';
import type { SoundcloudSystemPlaylist, SoundcloudTrack } from './types';

type Logger = { info(message: string): void; warn(message: string): void };

export type PlaylistProviderDeps = {
  fetch: FetchFunction;
  log: Logger;
  getOAuthToken: () => Promise<string | undefined>;
  getSplitTitles: () => Promise<boolean | undefined>;
};

const isFullTrack = (track: {
  id: number;
  title?: string;
}): track is SoundcloudTrack => 'title' in track;

/** System playlists ship their tracks as bare `{id, kind, policy}` stubs. */
const hydrateTracks = async (
  fetchFn: FetchFunction,
  playlist: SoundcloudSystemPlaylist,
): Promise<SoundcloudTrack[]> => {
  const stubIds = playlist.tracks
    .filter((track) => !isFullTrack(track))
    .map((track) => track.id);

  if (stubIds.length === 0) {
    return playlist.tracks.filter(isFullTrack);
  }

  const batches: number[][] = [];
  for (let i = 0; i < stubIds.length; i += TRACK_BATCH_SIZE) {
    batches.push(stubIds.slice(i, i + TRACK_BATCH_SIZE));
  }
  const hydrated = (
    await Promise.all(batches.map((batch) => getTracks(fetchFn, batch)))
  ).flat();

  const byId = new Map<number, SoundcloudTrack>();
  for (const track of [...playlist.tracks.filter(isFullTrack), ...hydrated]) {
    byId.set(track.id, track);
  }

  // Preserve SoundCloud's ordering; drop anything that failed to hydrate.
  return playlist.tracks
    .map((track) => byId.get(track.id))
    .filter((track): track is SoundcloudTrack => track !== undefined);
};

export const createPlaylistProvider = (
  deps: PlaylistProviderDeps,
): PlaylistProvider => ({
  id: PLAYLIST_PROVIDER_ID,
  kind: 'playlists',
  name: PLAYLIST_PROVIDER_NAME,

  matchesUrl: (url: string): boolean => SYSTEM_PLAYLIST_URN_REGEX.test(url),

  fetchPlaylistByUrl: async (urn: string): Promise<Playlist> => {
    const token = (await deps.getOAuthToken())?.trim();
    if (!token) {
      throw new Error(
        'SoundCloud recommendations are tied to your account — set the OAuth ' +
          'token in Preferences to open them',
      );
    }

    const fetchFn = createAuthorizedFetch(deps.fetch, token);
    const playlist = await getSystemPlaylist(fetchFn, urn);
    const tracks = await hydrateTracks(fetchFn, playlist);

    deps.log.info(`opened "${playlist.title}" with ${tracks.length} tracks`);
    return mapSystemPlaylistToPlaylist(
      playlist,
      tracks,
      (await deps.getSplitTitles()) ?? true,
    );
  },
});
