export type SoundcloudUser = {
  id: number;
  username: string;
  permalink: string;
  permalink_url: string;
  avatar_url: string;
  description: string | null;
  city: string | null;
  country_code: string | null;
  followers_count: number;
  followings_count: number;
  track_count: number;
  playlist_count: number;
  full_name: string;
  kind: string;
  uri: string;
  urn: string;
};

export type SoundcloudTranscoding = {
  url: string;
  preset: string;
  duration: number;
  snipped: boolean;
  format: {
    protocol: string;
    mime_type: string;
  };
  quality: string;
};

export type SoundcloudTrack = {
  id: number;
  title: string;
  permalink: string;
  permalink_url: string;
  description: string | null;
  duration: number;
  full_duration: number;
  artwork_url: string | null;
  genre: string | null;
  tag_list: string;
  streamable: boolean;
  downloadable: boolean;
  user: SoundcloudUser;
  user_id: number;
  created_at: string;
  release_date: string | null;
  display_date: string;
  likes_count: number;
  playback_count: number;
  media: {
    transcodings: SoundcloudTranscoding[];
  };
  publisher_metadata?: {
    artist?: string;
    album_title?: string;
  };
  kind: string;
  uri: string;
  urn: string;
};

export type SoundcloudSearchResult<T> = {
  collection: T[];
  total_results: number;
  next_href: string | null;
};

export type SoundcloudStreamResponse = {
  url: string;
};

export type SoundcloudTrackStub = {
  id: number;
};

export type SoundcloudPlaylist = {
  id: number;
  title: string;
  description: string | null;
  permalink_url: string;
  artwork_url: string | null;
  track_count: number;
  user: SoundcloudUser;
  kind: string;
  created_at: string;
  last_modified: string;
  tracks: (SoundcloudTrack | SoundcloudTrackStub)[];
};
