import type {
  NuclearPluginAPI,
  Playlist,
  PlaylistProvider,
} from '@nuclearplayer/plugin-sdk';

import { getTracks, resolve } from './api';
import { PLAYLIST_PROVIDER_ID, SOUNDCLOUD_PLAYLIST_URL_REGEX } from './config';
import { createSoundcloudFetch } from './fetch';
import { mapPlaylistToPlaylist } from './mappers';
import type { SoundcloudPlaylist, SoundcloudTrack } from './types';

const TRACK_BATCH_SIZE = 50;

const isFullTrack = (track: {
  id: number;
  title?: string;
}): track is SoundcloudTrack => 'title' in track;

const hydratePlaylistTracks = async (
  fetchFn: Parameters<typeof getTracks>[0],
  playlist: SoundcloudPlaylist,
): Promise<SoundcloudTrack[]> => {
  const fullTracks: SoundcloudTrack[] = [];
  const stubIds: number[] = [];

  for (const track of playlist.tracks) {
    if (isFullTrack(track)) {
      fullTracks.push(track);
    } else {
      stubIds.push(track.id);
    }
  }

  if (stubIds.length === 0) {
    return fullTracks;
  }

  const batches: number[][] = [];
  for (let i = 0; i < stubIds.length; i += TRACK_BATCH_SIZE) {
    batches.push(stubIds.slice(i, i + TRACK_BATCH_SIZE));
  }

  const batchResults = await Promise.all(
    batches.map((batch) => getTracks(fetchFn, batch)),
  );
  const hydratedTracks = batchResults.flat();

  const trackMap = new Map<number, SoundcloudTrack>();
  for (const track of [...fullTracks, ...hydratedTracks]) {
    trackMap.set(track.id, track);
  }

  return playlist.tracks
    .map((track) => trackMap.get(track.id))
    .filter((track): track is SoundcloudTrack => track !== undefined);
};

export const createPlaylistProvider = (
  api: NuclearPluginAPI,
): PlaylistProvider => {
  const fetch = createSoundcloudFetch(api.Http.fetch);

  return {
    id: PLAYLIST_PROVIDER_ID,
    kind: 'playlists',
    name: 'SoundCloud',

    matchesUrl: (url: string): boolean =>
      SOUNDCLOUD_PLAYLIST_URL_REGEX.test(url),

    fetchPlaylistByUrl: async (url: string): Promise<Playlist> => {
      const scPlaylist = await resolve<SoundcloudPlaylist>(fetch, url);
      const tracks = await hydratePlaylistTracks(fetch, scPlaylist);

      api.Logger.info(
        `Fetched SoundCloud playlist "${scPlaylist.title}" with ${tracks.length} tracks`,
      );

      return mapPlaylistToPlaylist(scPlaylist, tracks);
    },
  };
};
