import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { getMe, resolveUser } from './api';
import { PROFILE_URL_REGEX } from './config';
import type { SoundcloudUser } from './types';

type Logger = { info(message: string): void; warn(message: string): void };

type ResolveParams = {
  /** Carries the OAuth token. Only usable once `/me` has confirmed it. */
  authFetch: FetchFunction;
  plainFetch: FetchFunction;
  token: string | undefined;
  profileUrl: string | undefined;
  log: Logger;
};

export type Session = {
  /** The fetch every later call must use — authorized only if the token works. */
  fetch: FetchFunction;
  user: SoundcloudUser | null;
  authenticated: boolean;
};

let cache: { key: string; user: SoundcloudUser | null; authenticated: boolean } | null =
  null;

const normalize = (url: string): string => url.trim().replace(/\/+$/, '');

/**
 * Works out whose dashboard to build. A token wins over a profile URL: it
 * identifies the account itself and unlocks that account's private content.
 *
 * A rejected token must not leak into the rest of the session — SoundCloud
 * answers 401 to *every* endpoint when the Authorization header is bad, even
 * the public charts, so a stale token would blank the dashboard entirely.
 * In that case the session drops back to anonymous fetching.
 */
export const resolveDashboardUser = async ({
  authFetch,
  plainFetch,
  token,
  profileUrl,
  log,
}: ResolveParams): Promise<Session> => {
  const trimmedToken = token?.trim() ?? '';
  const url = normalize(profileUrl ?? '');
  const key = `${trimmedToken ? `token:${trimmedToken.slice(-8)}` : 'anon'}|url:${url}`;

  const session = (
    user: SoundcloudUser | null,
    authenticated: boolean,
  ): Session => {
    cache = { key, user, authenticated };
    return {
      user,
      authenticated,
      fetch: authenticated ? authFetch : plainFetch,
    };
  };

  if (cache?.key === key) {
    return {
      user: cache.user,
      authenticated: cache.authenticated,
      fetch: cache.authenticated ? authFetch : plainFetch,
    };
  }

  if (trimmedToken) {
    try {
      const me = await getMe(authFetch);
      log.info(`authenticated as ${me.username}`);
      return session(me, true);
    } catch (error) {
      log.warn(
        `token rejected (${String(error)}) — it has probably expired, ` +
          'copy a fresh oauth_token cookie. Continuing anonymously.',
      );
    }
  }

  if (!url) {
    return session(null, false);
  }

  if (!PROFILE_URL_REGEX.test(url)) {
    log.warn(`not a SoundCloud profile URL: ${url}`);
    return session(null, false);
  }

  try {
    const user = await resolveUser(plainFetch, url);
    if (user?.kind !== 'user') {
      log.warn(`${url} did not resolve to a user`);
      return session(null, false);
    }
    return session(user, false);
  } catch (error) {
    log.warn(`could not resolve ${url}: ${String(error)}`);
    return session(null, false);
  }
};

export const clearProfileCache = (): void => {
  cache = null;
};
