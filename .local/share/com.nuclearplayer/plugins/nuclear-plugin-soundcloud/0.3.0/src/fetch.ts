import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { SOUNDCLOUD_URL } from './config';

const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export const createSoundcloudFetch =
  (baseFetch: FetchFunction): FetchFunction =>
  (input, init) =>
    baseFetch(input, {
      ...init,
      headers: {
        'User-Agent': BROWSER_USER_AGENT,
        Origin: SOUNDCLOUD_URL,
        Referer: `${SOUNDCLOUD_URL}/`,
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        ...init?.headers,
      },
    });
