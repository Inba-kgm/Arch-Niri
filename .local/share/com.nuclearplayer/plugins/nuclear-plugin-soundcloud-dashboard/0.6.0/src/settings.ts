export const SETTINGS = {
  PROFILE_URL: 'profileUrl',
  OAUTH_TOKEN: 'oauthToken',
  TRACK_SOURCE: 'trackSource',
  PLAYLIST_SOURCE: 'playlistSource',
  SPLIT_TITLES: 'splitTitles',
} as const;

export type PlaylistSource = 'recommended' | 'mine';

export type TrackSource =
  | 'likes'
  | 'uploads'
  | 'reposts'
  | 'feed'
  | 'history';

/** Sources that only exist behind an authenticated `/me`. */
export const AUTHENTICATED_SOURCES: TrackSource[] = ['feed', 'history'];

export const SETTINGS_CATEGORY = 'SoundCloud Dashboard';

export const settingsDefinitions = [
  {
    id: SETTINGS.PROFILE_URL,
    title: 'Your SoundCloud profile',
    description:
      'Paste your profile URL, e.g. https://soundcloud.com/yourname. ' +
      'The dashboard then shows your tracks, the artists you follow and your ' +
      'playlists. Leave empty to show global charts instead. Ignored when a ' +
      'token is set below — the account is then taken from the token.',
    category: SETTINGS_CATEGORY,
    kind: 'string' as const,
    default: '',
    widget: { type: 'text' as const },
    format: 'url' as const,
  },
  {
    id: SETTINGS.OAUTH_TOKEN,
    title: 'OAuth token (optional)',
    description:
      'Unlocks your private data: listening feed, play history, hidden likes ' +
      'and private playlists. SoundCloud issues no API credentials any more, ' +
      'so the only way in is the token your browser already holds: open ' +
      'soundcloud.com while logged in, DevTools (F12) -> Application -> ' +
      'Cookies -> https://soundcloud.com -> copy the value of oauth_token. ' +
      'It is stored in plain text in settings.json and stops working when you ' +
      'log out of that browser session. Leave empty to stay anonymous.',
    category: SETTINGS_CATEGORY,
    kind: 'string' as const,
    default: '',
    widget: { type: 'password' as const },
    format: 'token' as const,
  },
  {
    id: SETTINGS.TRACK_SOURCE,
    title: 'Which of your tracks to show',
    description:
      'Feed and play history need the token above. Falls back to the next ' +
      'available source if the chosen one is empty or unavailable.',
    category: SETTINGS_CATEGORY,
    kind: 'enum' as const,
    default: 'likes',
    options: [
      { value: 'likes', label: 'Tracks you liked' },
      { value: 'uploads', label: 'Tracks you uploaded' },
      { value: 'reposts', label: 'Tracks you reposted' },
      { value: 'feed', label: 'Your listening feed (needs token)' },
      { value: 'history', label: 'Recently played (needs token)' },
    ],
  },
  {
    id: SETTINGS.PLAYLIST_SOURCE,
    title: 'Which playlists to show',
    description:
      "Recommended mirrors SoundCloud's own home page — More of what you " +
      'like, Albums for you, Mixed for you, Curated by SoundCloud. With a ' +
      'token these are personalised to your account; without one they are ' +
      "SoundCloud's generic editorial selections.",
    category: SETTINGS_CATEGORY,
    kind: 'enum' as const,
    default: 'recommended',
    options: [
      { value: 'recommended', label: 'Recommended for you' },
      { value: 'mine', label: 'Your own and liked playlists' },
    ],
  },
  {
    id: SETTINGS.SPLIT_TITLES,
    title: 'Split "Artist – Title" from SoundCloud titles',
    description:
      'On SoundCloud the Artist column is whoever uploaded the file, and the ' +
      'real performer is usually buried in the title. With this on, ' +
      '"Тбили & Жека Кто ТАМ – Не Любит" becomes artist "Тбили & Жека Кто ' +
      'ТАМ" and title "Не Любит". Titles with no separator are left alone.',
    category: SETTINGS_CATEGORY,
    kind: 'boolean' as const,
    default: true,
    widget: { type: 'toggle' as const },
  },
];
