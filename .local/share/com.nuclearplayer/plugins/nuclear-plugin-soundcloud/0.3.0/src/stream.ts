import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { getStreamUrl } from './api';
import type { SoundcloudTrack, SoundcloudTranscoding } from './types';

export type ResolvedStream = {
  url: string;
  durationMs: number;
  mimeType: string;
  bitrateKbps: number;
};

const BITRATE_BY_PRESET: Record<string, number> = {
  mp3_0_0: 128,
  mp3_0_1: 64,
  mp3_1_0: 128,
  opus_0_0: 64,
};

const estimateBitrate = (transcoding: SoundcloudTranscoding): number => {
  if (transcoding.preset in BITRATE_BY_PRESET) {
    return BITRATE_BY_PRESET[transcoding.preset];
  }

  if (transcoding.format.mime_type.includes('audio/mp4')) {
    return transcoding.quality === 'hq' ? 256 : 160;
  }

  return 128;
};

const findHlsTranscoding = (
  transcodings: SoundcloudTranscoding[],
): SoundcloudTranscoding | undefined => {
  const hlsAac = transcodings.find(
    (transcoding) =>
      transcoding.format.protocol === 'hls' &&
      transcoding.format.mime_type.includes('audio/mp4'),
  );

  if (hlsAac) {
    return hlsAac;
  }

  return transcodings.find(
    (transcoding) => transcoding.format.protocol === 'hls',
  );
};

export const resolveStreamForTrack = async (
  fetchFn: FetchFunction,
  track: SoundcloudTrack,
): Promise<ResolvedStream> => {
  const transcoding = findHlsTranscoding(track.media.transcodings);
  if (!transcoding) {
    throw new Error(
      `No HLS transcoding found for track: ${track.permalink_url}`,
    );
  }

  const hlsUrl = await getStreamUrl(fetchFn, transcoding.url);
  return {
    url: hlsUrl,
    durationMs: track.full_duration,
    mimeType: transcoding.format.mime_type,
    bitrateKbps: estimateBitrate(transcoding),
  };
};
