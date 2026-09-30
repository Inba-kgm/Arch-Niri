import type {
  ArtistRef,
  ArtistSocialStats,
  ArtworkSet,
  Playlist,
  PlaylistRef,
  StreamCandidate,
  Track,
  TrackRef,
} from '@nuclearplayer/plugin-sdk';

import {
  ARTWORK_LARGE_SUFFIX,
  ARTWORK_THUMBNAIL_SUFFIX,
  METADATA_PROVIDER_ID,
  PLAYLIST_PROVIDER_ID,
  STREAMING_PROVIDER_ID,
} from './config';
import type {
  SoundcloudPlaylist,
  SoundcloudTrack,
  SoundcloudUser,
} from './types';

const makeSource = (
  providerId: string,
  entity: { permalink_url: string; id: number },
) => ({
  provider: providerId,
  id: String(entity.id),
  url: entity.permalink_url,
});

const resizeArtworkUrl = (artworkUrl: string, suffix: string): string =>
  artworkUrl.replace(/-large(?=\.\w+$)/, suffix);

const makeTrackArtworkSet = (
  artworkUrl: string | null,
  fallbackUrl: string,
): ArtworkSet | undefined => {
  const url = artworkUrl ?? fallbackUrl;
  if (!url) {
    return undefined;
  }
  return {
    items: [
      {
        url: resizeArtworkUrl(url, ARTWORK_LARGE_SUFFIX),
        width: 500,
        height: 500,
        purpose: 'cover',
      },
      {
        url: resizeArtworkUrl(url, ARTWORK_THUMBNAIL_SUFFIX),
        width: 200,
        height: 200,
        purpose: 'thumbnail',
      },
    ],
  };
};

const makeAvatarArtworkSet = (avatarUrl: string): ArtworkSet | undefined => {
  if (!avatarUrl) {
    return undefined;
  }
  return {
    items: [
      {
        url: resizeArtworkUrl(avatarUrl, ARTWORK_LARGE_SUFFIX),
        width: 500,
        height: 500,
        purpose: 'avatar',
      },
      {
        url: resizeArtworkUrl(avatarUrl, ARTWORK_THUMBNAIL_SUFFIX),
        width: 200,
        height: 200,
        purpose: 'thumbnail',
      },
    ],
  };
};

const parseQuotedTagList = (tagList: string): string[] | undefined => {
  const tags = tagList
    .match(/"[^"]+"|[^\s"]+/g)
    ?.map((tag) => tag.replace(/"/g, '').trim())
    .filter(Boolean);
  return tags && tags.length > 0 ? tags : undefined;
};

export const mapTrackToTrack = (track: SoundcloudTrack): Track => {
  const artistName = track.publisher_metadata?.artist ?? track.user.username;
  return {
    title: track.title,
    artists: [
      {
        name: artistName,
        roles: [],
        source: makeSource(METADATA_PROVIDER_ID, track.user),
      },
    ],
    album: track.publisher_metadata?.album_title
      ? {
          title: track.publisher_metadata.album_title,
          source: makeSource(METADATA_PROVIDER_ID, track),
        }
      : undefined,
    durationMs: track.full_duration,
    artwork: makeTrackArtworkSet(track.artwork_url, track.user.avatar_url),
    tags: parseQuotedTagList(track.tag_list),
    source: makeSource(METADATA_PROVIDER_ID, track),
  };
};

export const mapUserToArtistRef = (user: SoundcloudUser): ArtistRef => ({
  name: user.username,
  artwork: makeAvatarArtworkSet(user.avatar_url),
  source: makeSource(METADATA_PROVIDER_ID, user),
});

export const mapUserToArtistSocialStats = (
  user: SoundcloudUser,
): ArtistSocialStats => ({
  name: user.username,
  artwork: makeAvatarArtworkSet(user.avatar_url),
  city: user.city ?? undefined,
  country: user.country_code ?? undefined,
  followersCount: user.followers_count,
  followingsCount: user.followings_count,
  trackCount: user.track_count,
  playlistCount: user.playlist_count,
  source: makeSource(METADATA_PROVIDER_ID, user),
});

export const mapPlaylistToPlaylistRef = (
  playlist: SoundcloudPlaylist,
): PlaylistRef => ({
  id: String(playlist.id),
  name: playlist.title,
  artwork: makeTrackArtworkSet(playlist.artwork_url, playlist.user.avatar_url),
  source: makeSource(METADATA_PROVIDER_ID, playlist),
});

export const mapTrackToTrackRef = (track: SoundcloudTrack): TrackRef => ({
  title: track.title,
  artists: [
    {
      name: track.publisher_metadata?.artist ?? track.user.username,
      artwork: makeAvatarArtworkSet(track.user.avatar_url),
      source: makeSource(METADATA_PROVIDER_ID, track.user),
    },
  ],
  artwork: makeTrackArtworkSet(track.artwork_url, track.user.avatar_url),
  source: makeSource(METADATA_PROVIDER_ID, track),
});

export const mapTrackToStreamCandidate = (
  track: SoundcloudTrack,
): StreamCandidate => ({
  id: String(track.id),
  title: track.title,
  durationMs: track.full_duration,
  thumbnail: track.artwork_url
    ? resizeArtworkUrl(track.artwork_url, ARTWORK_THUMBNAIL_SUFFIX)
    : track.user.avatar_url
      ? resizeArtworkUrl(track.user.avatar_url, ARTWORK_THUMBNAIL_SUFFIX)
      : undefined,
  failed: false,
  source: makeSource(STREAMING_PROVIDER_ID, track),
});

export const mapPlaylistToPlaylist = (
  playlist: SoundcloudPlaylist,
  tracks: SoundcloudTrack[],
): Playlist => ({
  id: String(playlist.id),
  name: playlist.title,
  description: playlist.description ?? undefined,
  artwork: makeTrackArtworkSet(playlist.artwork_url, playlist.user.avatar_url),
  createdAtIso: new Date(playlist.created_at).toISOString(),
  lastModifiedIso: new Date(playlist.last_modified).toISOString(),
  isReadOnly: true,
  origin: makeSource(PLAYLIST_PROVIDER_ID, playlist),
  items: tracks.map((track) => ({
    id: String(track.id),
    track: mapTrackToTrack(track),
    addedAtIso: new Date(playlist.created_at).toISOString(),
  })),
});
