export type SoundcloudUser = {
  id: number;
  username: string;
  permalink_url: string;
  avatar_url: string;
  kind: string;
};

export type SoundcloudTrack = {
  id: number;
  title: string;
  permalink_url: string;
  duration: number;
  full_duration: number;
  artwork_url: string | null;
  genre: string | null;
  tag_list: string;
  user: SoundcloudUser;
  publisher_metadata?: {
    artist?: string;
    album_title?: string;
  };
  kind: string;
};

/**
 * Playlists as they appear in listings: no `tracks` array, just a stub.
 *
 * `/mixed-selections` mixes two flavours. Real playlists have a numeric id and
 * `artwork_url`; SoundCloud's generated ones (kind `system-playlist`, e.g.
 * "Related tracks: …") have a URN string for an id, a null `artwork_url` and
 * put their cover in `calculated_artwork_url` instead.
 */
export type SoundcloudPlaylistRef = {
  id: number | string;
  title: string;
  permalink_url: string;
  artwork_url: string | null;
  calculated_artwork_url?: string | null;
  track_count: number | null;
  user: SoundcloudUser;
  kind: string;
};

export type SoundcloudCollection<T> = {
  collection: T[];
  next_href: string | null;
};

export type SoundcloudChartEntry = {
  track: SoundcloudTrack;
  score: number;
};

export type SoundcloudChartResponse = {
  genre: string;
  kind: string;
  last_updated: string;
  collection: SoundcloudChartEntry[];
};

export type SoundcloudSelection = {
  urn: string;
  title: string;
  items: SoundcloudCollection<SoundcloudPlaylistRef>;
};

export type SoundcloudSelectionsResponse =
  SoundcloudCollection<SoundcloudSelection>;

/** `/users/{id}/track_likes` wraps each track in a like envelope. */
export type SoundcloudLike = {
  created_at: string;
  kind: string;
  track: SoundcloudTrack;
};

/** `/stream/users/{id}/reposts` mixes track and playlist reposts. */
export type SoundcloudRepost = {
  type: string;
  created_at: string;
  track?: SoundcloudTrack;
  playlist?: SoundcloudPlaylistRef;
};

/** Tracks inside a system playlist arrive as `{id, kind, policy, …}` stubs. */
export type SoundcloudTrackStub = { id: number };

/** `/system-playlists/{urn}`. Has no created_at/last_modified at all. */
export type SoundcloudSystemPlaylist = {
  id: string;
  urn: string;
  title: string;
  description: string | null;
  short_title?: string | null;
  artwork_url: string | null;
  calculated_artwork_url?: string | null;
  permalink_url: string;
  user: SoundcloudUser;
  kind: string;
  tracks: (SoundcloudTrack | SoundcloudTrackStub)[];
};

/** `/stream` (authenticated) mixes own posts, reposts and playlists. */
export type SoundcloudStreamItem = {
  type: string;
  created_at: string;
  track?: SoundcloudTrack;
  playlist?: SoundcloudPlaylistRef;
};

/** `/me/play-history/tracks` (authenticated). */
export type SoundcloudPlayHistoryItem = {
  played_at: number;
  track_id: number;
  track?: SoundcloudTrack;
};

/** `/users/{id}/playlist_likes` wraps each playlist in a like envelope. */
export type SoundcloudPlaylistLike = {
  created_at: string;
  kind: string;
  playlist: SoundcloudPlaylistRef;
};
