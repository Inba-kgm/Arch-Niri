import type {
  NuclearPluginAPI,
  Stream,
  StreamCandidate,
  StreamingProvider,
} from '@nuclearplayer/plugin-sdk';

import { getTrack, searchTracks } from './api';
import { STREAMING_PROVIDER_ID, STREAMING_SEARCH_LIMIT } from './config';
import { createSoundcloudFetch } from './fetch';
import { mapTrackToStreamCandidate } from './mappers';
import { resolveStreamForTrack } from './stream';

export const createStreamingProvider = (
  api: NuclearPluginAPI,
): StreamingProvider => {
  const fetch = createSoundcloudFetch(api.Http.fetch);

  return {
    id: STREAMING_PROVIDER_ID,
    kind: 'streaming',
    name: 'SoundCloud',

    searchForTrack: async (
      artist: string,
      title: string,
    ): Promise<StreamCandidate[]> => {
      const query = `${artist} ${title}`;
      const result = await searchTracks(fetch, query, STREAMING_SEARCH_LIMIT);
      return result.collection.map(mapTrackToStreamCandidate);
    },

    getStreamUrl: async (candidateId: string): Promise<Stream> => {
      const trackId = Number(candidateId);
      if (Number.isNaN(trackId)) {
        throw new Error(`Invalid SoundCloud track ID: ${candidateId}`);
      }

      const track = await getTrack(fetch, trackId);
      const streamInfo = await resolveStreamForTrack(fetch, track);

      api.Logger.debug(
        `Resolved HLS stream for "${track.title}" by ${track.user.username}`,
      );

      return {
        url: streamInfo.url,
        protocol: 'hls',
        mimeType: streamInfo.mimeType,
        bitrateKbps: streamInfo.bitrateKbps,
        durationMs: streamInfo.durationMs,
        source: {
          provider: STREAMING_PROVIDER_ID,
          id: candidateId,
          url: track.permalink_url,
        },
      };
    },
  };
};
