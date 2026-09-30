export const DASHBOARD_PROVIDER_ID = 'soundcloud-dashboard';
export const DASHBOARD_PROVIDER_NAME = 'SoundCloud';

export const PLAYLIST_PROVIDER_ID = 'soundcloud-system-playlists';
export const PLAYLIST_PROVIDER_NAME = 'SoundCloud recommendations';

/**
 * System playlists are addressed by URN rather than by their web URL on
 * purpose. nuclear-plugin-soundcloud claims every `soundcloud.com/*​/sets/*`
 * URL — including `/discover/sets/personalized-tracks::user:id` — and resolves
 * it anonymously, which 404s because these playlists are private to the
 * account. The host picks the first provider whose `matchesUrl` returns true
 * and never retries, so the only way to be reached is an address the other
 * plugin cannot match.
 */
export const SYSTEM_PLAYLIST_URN_REGEX = /^soundcloud:system-playlists:/;
export const TRACK_BATCH_SIZE = 50;

// The metadata provider shipped by nuclear-plugin-soundcloud. Dashboard entities
// point at it so that clicking a card opens the right artist/album page.
export const METADATA_PROVIDER_ID = 'soundcloud';

export const SOUNDCLOUD_URL = 'https://soundcloud.com';
export const SOUNDCLOUD_API_V2 = 'https://api-v2.soundcloud.com';
export const CLIENT_ID_REGEX = /[{,]client_id:"(\w+)"/;
export const SNDCDN_SCRIPT_URL_REGEX =
  /https?:\/\/[^\s"]*sndcdn\.com[^\s"]*\.js/g;
export const PROFILE_URL_REGEX =
  /^https?:\/\/(www\.|m\.)?soundcloud\.com\/[\w-]+\/?$/;

export const ARTWORK_LARGE_SUFFIX = '-t500x500';
export const ARTWORK_THUMBNAIL_SUFFIX = '-t200x200';

export const ALL_MUSIC_GENRE = 'soundcloud:genres:all-music';
export const TRENDING_CHART_LIMIT = 50;
export const FEATURED_TRACKS_LIMIT = 50;
export const SELECTIONS_LIMIT = 10;
export const EDITORIAL_PLAYLISTS_LIMIT = 24;
export const TOP_ARTISTS_LIMIT = 20;

export const PROFILE_TRACKS_LIMIT = 50;
export const PROFILE_ARTISTS_LIMIT = 24;
export const PROFILE_PLAYLISTS_LIMIT = 24;
