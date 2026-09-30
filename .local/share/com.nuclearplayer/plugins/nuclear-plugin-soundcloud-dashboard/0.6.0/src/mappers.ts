import type {
  ArtistRef,
  ArtworkSet,
  Playlist,
  PlaylistRef,
  Track,
} from '@nuclearplayer/plugin-sdk';

import {
  ARTWORK_LARGE_SUFFIX,
  ARTWORK_THUMBNAIL_SUFFIX,
  METADATA_PROVIDER_ID,
  PLAYLIST_PROVIDER_ID,
} from './config';
import type {
  SoundcloudPlaylistRef,
  SoundcloudSystemPlaylist,
  SoundcloudTrack,
  SoundcloudUser,
} from './types';

const makeSource = (entity: {
  permalink_url: string;
  id: number | string;
}) => ({
  provider: METADATA_PROVIDER_ID,
  id: String(entity.id),
  url: entity.permalink_url,
});

const resizeArtworkUrl = (artworkUrl: string, suffix: string): string =>
  artworkUrl.replace(/-large(?=\.\w+$)/, suffix);

const makeArtworkSet = (
  artworkUrl: string | null,
  fallbackUrl: string,
  largePurpose: 'cover' | 'avatar',
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
        purpose: largePurpose,
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

const parseQuotedTagList = (tagList: string): string[] | undefined => {
  const tags = tagList
    ?.match(/"[^"]+"|[^\s"]+/g)
    ?.map((tag) => tag.replace(/"/g, '').trim())
    .filter(Boolean);
  return tags && tags.length > 0 ? tags : undefined;
};

/**
 * En dash, em dash, minus sign or hyphen, surrounded by whitespace. Requiring
 * the spaces keeps hyphenated words and things like "slowed+reverb" intact.
 */
const TITLE_SEPARATOR = /\s+[–—−-]\s+/;

/** Leading "4. " or "12) " left over from an album rip. */
const LEADING_TRACK_NUMBER = /^\d+\s*[.)]\s*/;

type Credit = { artist: string; title: string };

/**
 * SoundCloud has no artist field: the uploader owns the account and the real
 * performer, if anyone bothered, sits in the title as "Artist – Title".
 *
 * The title wins over `publisher_metadata.artist` whenever it has a separator.
 * That field sounds authoritative but on re-uploads it describes whoever put
 * the file up, not the performer — measured against a real listening history,
 * every case where the two disagreed had the title be the correct one
 * ("VSRAP" tagged on "Цинк Уродов — Я боюсь"). Without a separator there is
 * nothing to parse, and the tag is still better than the account name.
 */
const splitCredit = (track: SoundcloudTrack, enabled: boolean): Credit => {
  const title = track.title.trim();
  const fallback =
    track.publisher_metadata?.artist?.trim() || track.user.username;

  if (!enabled) {
    return { artist: fallback, title };
  }

  const match = TITLE_SEPARATOR.exec(title);
  if (!match || match.index === 0) {
    return { artist: fallback, title };
  }

  const artist = title
    .slice(0, match.index)
    .replace(LEADING_TRACK_NUMBER, '')
    .trim();
  const rest = title.slice(match.index + match[0].length).trim();

  if (!artist || !rest) {
    return { artist: fallback, title };
  }
  return { artist, title: rest };
};

export const mapTrack = (track: SoundcloudTrack, splitTitles = true): Track => {
  const credit = splitCredit(track, splitTitles);
  const isUploader = credit.artist === track.user.username;

  return {
  title: credit.title,
  artists: [
    {
      name: credit.artist,
      roles: [],
      // Only link through to the SoundCloud account when the name actually is
      // that account; a performer parsed out of the title is someone else.
      ...(isUploader ? { source: makeSource(track.user) } : {}),
    },
  ],
  album: track.publisher_metadata?.album_title
    ? {
        title: track.publisher_metadata.album_title,
        source: makeSource(track),
      }
    : undefined,
    durationMs: track.full_duration,
    artwork: makeArtworkSet(track.artwork_url, track.user.avatar_url, 'cover'),
    tags: parseQuotedTagList(track.tag_list),
    source: makeSource(track),
  };
};

export const mapUserToArtistRef = (user: SoundcloudUser): ArtistRef => ({
  name: user.username,
  artwork: makeArtworkSet(user.avatar_url, '', 'avatar'),
  source: makeSource(user),
});

export const mapPlaylistToRef = (
  playlist: SoundcloudPlaylistRef,
): PlaylistRef => {
  const isGenerated = playlist.kind === 'system-playlist';

  return {
    id: String(playlist.id),
    name: playlist.title,
    artwork: makeArtworkSet(
      // System playlists leave artwork_url null and put the cover here; without
      // this they would all fall back to SoundCloud's own generic avatar.
      playlist.artwork_url ?? playlist.calculated_artwork_url ?? null,
      playlist.user?.avatar_url ?? '',
      'cover',
    ),
    source: {
      provider: METADATA_PROVIDER_ID,
      id: String(playlist.id),
      // See SYSTEM_PLAYLIST_URN_REGEX: generated playlists are addressed by
      // their URN, so the main SoundCloud plugin cannot grab the click and
      // fail resolving them anonymously.
      url: isGenerated ? String(playlist.id) : playlist.permalink_url,
    },
  };
};

export const mapSystemPlaylistToPlaylist = (
  playlist: SoundcloudSystemPlaylist,
  tracks: SoundcloudTrack[],
  splitTitles = true,
): Playlist => {
  // These are generated on the fly and carry no timestamps of their own.
  const nowIso = new Date().toISOString();

  return {
    id: playlist.urn,
    name: playlist.title,
    description: playlist.description ?? undefined,
    artwork: makeArtworkSet(
      playlist.artwork_url ?? playlist.calculated_artwork_url ?? null,
      playlist.user?.avatar_url ?? '',
      'cover',
    ),
    createdAtIso: nowIso,
    lastModifiedIso: nowIso,
    isReadOnly: true,
    origin: {
      provider: PLAYLIST_PROVIDER_ID,
      id: playlist.urn,
      url: playlist.permalink_url,
    },
    items: tracks.map((track) => ({
      id: String(track.id),
      track: mapTrack(track, splitTitles),
      addedAtIso: nowIso,
    })),
  };
};
