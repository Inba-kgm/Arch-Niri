import type {
  ArtistRef,
  ArtistSocialStats,
  MetadataProvider,
  NuclearPluginAPI,
  PlaylistRef,
  SearchParams,
  Track,
  TrackRef,
} from '@nuclearplayer/plugin-sdk';

import {
  getRelatedUsers,
  getUser,
  getUserPlaylists,
  getUserTracks,
  searchTracks,
  searchUsers,
} from './api';
import {
  DEFAULT_SEARCH_LIMIT,
  METADATA_PROVIDER_ID,
  STREAMING_PROVIDER_ID,
} from './config';
import { createSoundcloudFetch } from './fetch';
import {
  mapPlaylistToPlaylistRef,
  mapTrackToTrack,
  mapTrackToTrackRef,
  mapUserToArtistRef,
  mapUserToArtistSocialStats,
} from './mappers';

const ARTIST_TOP_TRACKS_LIMIT = 10;
const ARTIST_PLAYLISTS_LIMIT = 10;
const RELATED_ARTISTS_LIMIT = 10;

export const createMetadataProvider = (
  api: NuclearPluginAPI,
): MetadataProvider => {
  const fetch = createSoundcloudFetch(api.Http.fetch);

  return {
    id: METADATA_PROVIDER_ID,
    kind: 'metadata',
    name: 'SoundCloud',
    streamingProviderId: STREAMING_PROVIDER_ID,
    searchCapabilities: ['artists', 'tracks'],
    artistMetadataCapabilities: [
      'artistSocialStats',
      'artistTopTracks',
      'artistPlaylists',
      'artistRelatedArtists',
    ],

    searchArtists: async (
      params: Omit<SearchParams, 'types'>,
    ): Promise<ArtistRef[]> => {
      const result = await searchUsers(
        fetch,
        params.query,
        params.limit ?? DEFAULT_SEARCH_LIMIT,
      );
      return result.collection.map(mapUserToArtistRef);
    },

    searchTracks: async (
      params: Omit<SearchParams, 'types'>,
    ): Promise<Track[]> => {
      const result = await searchTracks(
        fetch,
        params.query,
        params.limit ?? DEFAULT_SEARCH_LIMIT,
      );
      return result.collection.map(mapTrackToTrack);
    },

    fetchArtistSocialStats: async (
      artistId: string,
    ): Promise<ArtistSocialStats> => {
      const userId = Number(artistId);
      const user = await getUser(fetch, userId);
      return mapUserToArtistSocialStats(user);
    },

    fetchArtistTopTracks: async (artistId: string): Promise<TrackRef[]> => {
      const userId = Number(artistId);
      const result = await getUserTracks(
        fetch,
        userId,
        ARTIST_TOP_TRACKS_LIMIT,
      );
      return result.collection.map(mapTrackToTrackRef);
    },

    fetchArtistPlaylists: async (artistId: string): Promise<PlaylistRef[]> => {
      const userId = Number(artistId);
      const result = await getUserPlaylists(
        fetch,
        userId,
        ARTIST_PLAYLISTS_LIMIT,
      );
      return result.collection.map(mapPlaylistToPlaylistRef);
    },

    fetchArtistRelatedArtists: async (
      artistId: string,
    ): Promise<ArtistRef[]> => {
      const userId = Number(artistId);
      const result = await getRelatedUsers(
        fetch,
        userId,
        RELATED_ARTISTS_LIMIT,
      );
      return result.collection.map(mapUserToArtistRef);
    },
  };
};
