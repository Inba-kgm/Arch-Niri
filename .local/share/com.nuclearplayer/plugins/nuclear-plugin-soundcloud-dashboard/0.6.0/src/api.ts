import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { getClientId } from './client-id';
import { ALL_MUSIC_GENRE, SOUNDCLOUD_API_V2 } from './config';
import type {
  SoundcloudChartEntry,
  SoundcloudChartResponse,
  SoundcloudCollection,
  SoundcloudLike,
  SoundcloudPlaylistLike,
  SoundcloudPlaylistRef,
  SoundcloudPlayHistoryItem,
  SoundcloudRepost,
  SoundcloudSelection,
  SoundcloudStreamItem,
  SoundcloudSelectionsResponse,
  SoundcloudSystemPlaylist,
  SoundcloudTrack,
  SoundcloudUser,
} from './types';

const apiRequest = async <T>(
  fetchFn: FetchFunction,
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> => {
  const request = (clientId: string) => {
    const searchParams = new URLSearchParams({
      ...params,
      client_id: clientId,
    });
    return fetchFn(
      `${SOUNDCLOUD_API_V2}/${endpoint}?${searchParams.toString()}`,
    );
  };

  const response = await request(await getClientId(fetchFn));

  if (response.status === 401 || response.status === 403) {
    const retryResponse = await request(await getClientId(fetchFn, true));
    if (!retryResponse.ok) {
      throw new Error(
        `SoundCloud API error: ${retryResponse.status} for ${endpoint}`,
      );
    }
    return retryResponse.json();
  }

  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status} for ${endpoint}`);
  }
  return response.json();
};

const collectionOf = async <T>(
  fetchFn: FetchFunction,
  endpoint: string,
  limit: number,
): Promise<T[]> => {
  const result = await apiRequest<SoundcloudCollection<T>>(fetchFn, endpoint, {
    limit: String(limit),
  });
  return result.collection ?? [];
};

// ---------------------------------------------------------------- global

export const getTrendingChart = async (
  fetchFn: FetchFunction,
  limit: number,
): Promise<SoundcloudChartEntry[]> => {
  const chart = await apiRequest<SoundcloudChartResponse>(fetchFn, 'charts', {
    kind: 'trending',
    genre: ALL_MUSIC_GENRE,
    limit: String(limit),
  });
  return (chart.collection ?? []).filter((entry) => Boolean(entry?.track));
};

/**
 * Fallback for fetchTopTracks. SoundCloud has already retired `charts?kind=top`
 * (it answers 404), so the trending chart is not guaranteed to stay either.
 */
export const getFeaturedTracks = (
  fetchFn: FetchFunction,
  limit: number,
): Promise<SoundcloudTrack[]> =>
  collectionOf(fetchFn, 'featured_tracks/top/all-music', limit);

export const getMixedSelections = async (
  fetchFn: FetchFunction,
  limit: number,
): Promise<SoundcloudSelection[]> => {
  const selections = await apiRequest<SoundcloudSelectionsResponse>(
    fetchFn,
    'mixed-selections',
    { limit: String(limit) },
  );
  return selections.collection ?? [];
};

// -------------------------------------------------------------- personal

export const resolveUser = (
  fetchFn: FetchFunction,
  profileUrl: string,
): Promise<SoundcloudUser> =>
  apiRequest<SoundcloudUser>(fetchFn, 'resolve', { url: profileUrl });

export const getLikedTracks = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudTrack[]> => {
  const likes = await collectionOf<SoundcloudLike>(
    fetchFn,
    `users/${userId}/track_likes`,
    limit,
  );
  return likes.map((like) => like.track).filter(Boolean);
};

export const getUploadedTracks = (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudTrack[]> =>
  collectionOf(fetchFn, `users/${userId}/tracks`, limit);

export const getRepostedTracks = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudTrack[]> => {
  const reposts = await collectionOf<SoundcloudRepost>(
    fetchFn,
    `stream/users/${userId}/reposts`,
    limit,
  );
  return reposts
    .map((repost) => repost.track)
    .filter((track): track is SoundcloudTrack => Boolean(track));
};

export const getFollowings = (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudUser[]> =>
  collectionOf(fetchFn, `users/${userId}/followings`, limit);

export const getOwnPlaylists = (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudPlaylistRef[]> =>
  collectionOf(fetchFn, `users/${userId}/playlists`, limit);

// ---------------------------------------------------- authenticated (token)

export const getSystemPlaylist = (
  fetchFn: FetchFunction,
  urn: string,
): Promise<SoundcloudSystemPlaylist> =>
  apiRequest<SoundcloudSystemPlaylist>(
    fetchFn,
    `system-playlists/${encodeURIComponent(urn)}`,
  );

/** Turns track stubs into full tracks. Ids are batched to keep URLs sane. */
export const getTracks = (
  fetchFn: FetchFunction,
  ids: number[],
): Promise<SoundcloudTrack[]> =>
  apiRequest<SoundcloudTrack[]>(fetchFn, 'tracks', { ids: ids.join(',') });

/** Identifies the account behind the OAuth token. 401 when the token is dead. */
export const getMe = (fetchFn: FetchFunction): Promise<SoundcloudUser> =>
  apiRequest<SoundcloudUser>(fetchFn, 'me');

/** The personalised listening feed. Mixes tracks, playlists and reposts. */
export const getFeedTracks = async (
  fetchFn: FetchFunction,
  limit: number,
): Promise<SoundcloudTrack[]> => {
  const feed = await collectionOf<SoundcloudStreamItem>(
    fetchFn,
    'stream',
    limit,
  );
  return feed
    .map((item) => item.track)
    .filter((track): track is SoundcloudTrack => Boolean(track));
};

export const getPlayHistory = async (
  fetchFn: FetchFunction,
  limit: number,
): Promise<SoundcloudTrack[]> => {
  const history = await collectionOf<SoundcloudPlayHistoryItem>(
    fetchFn,
    'me/play-history/tracks',
    limit,
  );
  return history
    .map((item) => item.track)
    .filter((track): track is SoundcloudTrack => Boolean(track));
};

export const getLikedPlaylists = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudPlaylistRef[]> => {
  const likes = await collectionOf<SoundcloudPlaylistLike>(
    fetchFn,
    `users/${userId}/playlist_likes`,
    limit,
  );
  return likes.map((like) => like.playlist).filter(Boolean);
};
