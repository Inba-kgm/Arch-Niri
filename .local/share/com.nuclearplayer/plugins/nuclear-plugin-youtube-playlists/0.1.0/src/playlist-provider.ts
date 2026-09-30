import type { NuclearPluginAPI, PlaylistProvider } from '@nuclearplayer/plugin-sdk';

import { PROVIDER_ID, PROVIDER_NAME } from './config';
import { mapYtdlpPlaylist } from './mappers';

const isYoutubePlaylistUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    const isYoutube =
      hostname === 'youtu.be' ||
      hostname.endsWith('youtube.com');

    return isYoutube && parsed.searchParams.has('list');
  } catch {
    return false;
  }
};

export const createPlaylistProvider = (
  api: NuclearPluginAPI,
): PlaylistProvider => ({
  id: PROVIDER_ID,
  kind: 'playlists',
  name: PROVIDER_NAME,
  matchesUrl: isYoutubePlaylistUrl,
  async fetchPlaylistByUrl(url: string) {
    const info = await api.Ytdlp.getPlaylist(url);
    return mapYtdlpPlaylist(info, url);
  },
});
