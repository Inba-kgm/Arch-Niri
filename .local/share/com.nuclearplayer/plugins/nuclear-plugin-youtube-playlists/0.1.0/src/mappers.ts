import type {
  ArtworkSet,
  Playlist,
  PlaylistItem,
  Track,
  YtdlpPlaylistEntry,
  YtdlpPlaylistInfo,
  YtdlpThumbnail,
} from '@nuclearplayer/plugin-sdk';

const PROVIDER = 'youtube';

const youtubeSource = (id: string) => ({
  provider: PROVIDER,
  id,
  url: `https://www.youtube.com/watch?v=${id}`,
});

const TITLE_SEPARATORS = [' - ', ' – ', ' — '];

const parseArtistAndTitle = (
  videoTitle: string,
  channel: string,
): { artist: string; title: string } => {
  for (const separator of TITLE_SEPARATORS) {
    const index = videoTitle.indexOf(separator);
    if (index > 0) {
      return {
        artist: videoTitle.slice(0, index).trim(),
        title: videoTitle.slice(index + separator.length).trim(),
      };
    }
  }

  return { artist: channel, title: videoTitle };
};

const toArtworkSet = (thumbnails: YtdlpThumbnail[]): ArtworkSet | undefined =>
  thumbnails.length > 0
    ? {
        items: thumbnails.map((thumb) => ({
          url: thumb.url,
          width: thumb.width ?? undefined,
          height: thumb.height ?? undefined,
          purpose: 'thumbnail' as const,
        })),
      }
    : undefined;

const mapEntry = (entry: YtdlpPlaylistEntry): PlaylistItem => {
  const { artist, title } = parseArtistAndTitle(entry.title, entry.channel!);

  const track: Track = {
    title,
    artists: [{ name: artist, roles: ['main'] }],
    durationMs: entry.duration != null ? entry.duration * 1000 : undefined,
    artwork: toArtworkSet(entry.thumbnails),
    source: youtubeSource(entry.id),
  };

  return {
    id: entry.id,
    addedAtIso: new Date().toISOString(),
    track,
  };
};

export const mapYtdlpPlaylist = (
  info: YtdlpPlaylistInfo,
  sourceUrl: string,
): Playlist => {
  const now = new Date().toISOString();

  return {
    id: `youtube-${info.id}`,
    name: info.title,
    createdAtIso: now,
    lastModifiedIso: now,
    origin: {
      provider: PROVIDER,
      id: info.id,
      url: sourceUrl,
    },
    isReadOnly: true,
    items: info.entries.filter((entry) => entry.channel !== null).map(mapEntry),
  };
};
