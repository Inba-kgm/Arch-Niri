import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import {
  CLIENT_ID_REGEX,
  SNDCDN_SCRIPT_URL_REGEX,
  SOUNDCLOUD_URL,
} from './config';

let cachedClientId: string | null = null;

export const getClientId = async (
  fetchFn: FetchFunction,
  forceRefresh = false,
): Promise<string> => {
  if (cachedClientId && !forceRefresh) {
    return cachedClientId;
  }

  const homepageResponse = await fetchFn(SOUNDCLOUD_URL);
  if (!homepageResponse.ok) {
    throw new Error(
      `Failed to fetch SoundCloud homepage: ${homepageResponse.status}`,
    );
  }
  const html = await homepageResponse.text();

  const scriptUrls = html.match(SNDCDN_SCRIPT_URL_REGEX);
  if (!scriptUrls) {
    throw new Error('No sndcdn script URLs found on SoundCloud homepage');
  }

  const reversedScriptUrls = [...scriptUrls].reverse();
  for (const scriptUrl of reversedScriptUrls) {
    const scriptResponse = await fetchFn(scriptUrl);
    if (!scriptResponse.ok) {
      continue;
    }
    const scriptBody = await scriptResponse.text();
    const match = scriptBody.match(CLIENT_ID_REGEX);
    if (match?.[1]) {
      cachedClientId = match[1];
      return match[1];
    }
  }

  throw new Error('Could not extract client_id from SoundCloud JS bundles');
};

export const clearCachedClientId = (): void => {
  cachedClientId = null;
};
