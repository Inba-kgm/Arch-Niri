import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { getClientId } from './client-id';
import { SOUNDCLOUD_API_V2 } from './config';
import type {
  SoundcloudPlaylist,
  SoundcloudSearchResult,
  SoundcloudStreamResponse,
  SoundcloudTrack,
  SoundcloudUser,
} from './types';

const apiRequest = async <T>(
  fetchFn: FetchFunction,
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> => {
  const clientId = await getClientId(fetchFn);
  const searchParams = new URLSearchParams({
    ...params,
    client_id: clientId,
  });
  const url = `${SOUNDCLOUD_API_V2}/${endpoint}?${searchParams.toString()}`;
  const response = await fetchFn(url);

  if (response.status === 401 || response.status === 403) {
    const refreshedClientId = await getClientId(fetchFn, true);
    const retryParams = new URLSearchParams({
      ...params,
      client_id: refreshedClientId,
    });
    const retryUrl = `${SOUNDCLOUD_API_V2}/${endpoint}?${retryParams.toString()}`;
    const retryResponse = await fetchFn(retryUrl);
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

export const searchTracks = async (
  fetchFn: FetchFunction,
  query: string,
  limit: number,
): Promise<SoundcloudSearchResult<SoundcloudTrack>> =>
  apiRequest(fetchFn, 'search/tracks', {
    q: query,
    limit: String(limit),
  });

export const searchUsers = async (
  fetchFn: FetchFunction,
  query: string,
  limit: number,
): Promise<SoundcloudSearchResult<SoundcloudUser>> =>
  apiRequest(fetchFn, 'search/users', {
    q: query,
    limit: String(limit),
  });

export const getTrack = async (
  fetchFn: FetchFunction,
  trackId: number,
): Promise<SoundcloudTrack> => apiRequest(fetchFn, `tracks/${trackId}`);

export const getUser = async (
  fetchFn: FetchFunction,
  userId: number,
): Promise<SoundcloudUser> => apiRequest(fetchFn, `users/${userId}`);

export const getUserTracks = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudSearchResult<SoundcloudTrack>> =>
  apiRequest(fetchFn, `users/${userId}/tracks`, {
    limit: String(limit),
  });

export const getRelatedUsers = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudSearchResult<SoundcloudUser>> =>
  apiRequest(fetchFn, `users/${userId}/relatedartists`, {
    limit: String(limit),
  });

export const getStreamUrl = async (
  fetchFn: FetchFunction,
  transcodingUrl: string,
): Promise<string> => {
  const clientId = await getClientId(fetchFn);
  const parsedUrl = new URL(transcodingUrl);
  parsedUrl.searchParams.set('client_id', clientId);
  const response = await fetchFn(parsedUrl.toString());

  if (response.status === 401 || response.status === 403) {
    const refreshedClientId = await getClientId(fetchFn, true);
    parsedUrl.searchParams.set('client_id', refreshedClientId);
    const retryResponse = await fetchFn(parsedUrl.toString());
    if (!retryResponse.ok) {
      throw new Error(`Failed to resolve stream URL: ${retryResponse.status}`);
    }
    const data: SoundcloudStreamResponse = await retryResponse.json();
    return data.url;
  }

  if (!response.ok) {
    throw new Error(`Failed to resolve stream URL: ${response.status}`);
  }
  const data: SoundcloudStreamResponse = await response.json();
  return data.url;
};

export const getUserPlaylists = async (
  fetchFn: FetchFunction,
  userId: number,
  limit: number,
): Promise<SoundcloudSearchResult<SoundcloudPlaylist>> =>
  apiRequest(fetchFn, `users/${userId}/playlists`, {
    limit: String(limit),
  });

export const resolve = async <T>(
  fetchFn: FetchFunction,
  url: string,
): Promise<T> => apiRequest(fetchFn, 'resolve', { url });

export const getTracks = async (
  fetchFn: FetchFunction,
  ids: number[],
): Promise<SoundcloudTrack[]> =>
  apiRequest(fetchFn, 'tracks', { ids: ids.join(',') });
