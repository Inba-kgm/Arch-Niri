'use strict';

// src/core/ytScraper.ts
function parseDuration(text) {
  if (!text) return 0;
  const parts = text.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}
function decodeHexEscapes(str) {
  return str.replace(
    /\\x([0-9a-f]{2})/gi,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  ).replace(/\\\//g, "/").replace(/\\\\/g, "\\");
}
function parseMobileYoutubeSearchHtml(html, limit = 10) {
  const match = html.match(/var ytInitialData = '(.+?)';/);
  if (!match || !match[1]) {
    throw new Error("No mobile ytInitialData found in HTML");
  }
  let json;
  try {
    const jsonStr = decodeHexEscapes(match[1]);
    json = JSON.parse(jsonStr);
  } catch {
    try {
      json = JSON.parse(match[1]);
    } catch {
      throw new Error("Failed to decode mobile ytInitialData");
    }
  }
  const contents = json.contents?.sectionListRenderer?.contents;
  if (!contents) {
    throw new Error("Invalid mobile ytInitialData structure");
  }
  let videos = [];
  for (const section of contents) {
    if (section.itemSectionRenderer?.contents) {
      const found = section.itemSectionRenderer.contents.filter((c) => c.videoWithContextRenderer).map((c) => c.videoWithContextRenderer);
      videos = videos.concat(found);
    }
  }
  return videos.slice(0, limit).map((v) => {
    const thumbs = v.thumbnail?.thumbnails || [];
    const thumbnail = thumbs.length > 0 ? thumbs[thumbs.length - 1].url : null;
    const durationStr = v.lengthText?.runs?.[0]?.text || "";
    return {
      id: v.videoId,
      title: v.headline?.runs?.[0]?.text || "Unknown",
      duration: parseDuration(durationStr),
      thumbnail,
      channel: v.shortBylineText?.runs?.[0]?.text || "Unknown"
    };
  });
}
async function scrapeMobileYoutube(http, query, limit = 10) {
  console.log(`[Core:Scraper] Starting YouTube Mobile scrape for: "${query}"`);
  const res = await http.fetch(
    `https://m.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Accept-Language": "en-US,en;q=0.9"
      }
    }
  );
  if (res.status !== 200) {
    throw new Error(`YouTube Mobile returned status ${res.status}`);
  }
  const html = typeof res.body === "string" ? res.body : "";
  const results = parseMobileYoutubeSearchHtml(html, limit);
  console.log(`[Core:Scraper] Mobile scrape parsed ${results.length} videos`);
  return results;
}
function parseYoutubeSearchHtml(html, limit = 10) {
  let jsonStr = null;
  const patterns = [
    /var ytInitialData = (\{.+?\});<\/script>/,
    /ytInitialData\s*=\s*(\{.+?\});\s*(?:var|<\/script>)/,
    /window\["ytInitialData"\]\s*=\s*(\{.+?\});/,
    /ytInitialData\s*=\s*(\{.+?\});/
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      try {
        JSON.parse(match[1]);
        jsonStr = match[1];
        break;
      } catch {
      }
    }
  }
  if (!jsonStr) {
    throw new Error("No ytInitialData found in HTML");
  }
  const json = JSON.parse(jsonStr);
  const contents = json.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents;
  if (!contents) {
    throw new Error("Invalid ytInitialData structure");
  }
  let videos = [];
  for (const section of contents) {
    if (section.itemSectionRenderer?.contents) {
      const found = section.itemSectionRenderer.contents.filter((c) => c.videoRenderer).map((c) => c.videoRenderer);
      videos = videos.concat(found);
    }
  }
  return videos.slice(0, limit).map((v) => {
    const thumbs = v.thumbnail?.thumbnails || [];
    const thumbnail = thumbs.length > 0 ? thumbs[thumbs.length - 1].url : null;
    const durationStr = v.lengthText?.simpleText || "";
    return {
      id: v.videoId,
      title: v.title?.runs?.[0]?.text || "Unknown",
      duration: parseDuration(durationStr),
      thumbnail,
      channel: v.ownerText?.runs?.[0]?.text || "Unknown"
    };
  });
}
async function scrapeYoutube(http, query, limit = 10, fallbackFn) {
  try {
    const mobileResults = await scrapeMobileYoutube(http, query, limit);
    if (mobileResults.length > 0) {
      return mobileResults;
    }
    console.warn("[Core:Scraper] Mobile scrape returned 0 results, falling back to desktop");
  } catch (error) {
    console.warn("[Core:Scraper] Mobile scrape failed:", error);
  }
  try {
    console.log(`[Core:Scraper] Trying desktop scrape for: "${query}"`);
    const res = await http.fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });
    if (res.status !== 200) {
      console.warn(`[Core:Scraper] Desktop YouTube returned status ${res.status}`);
    }
    const html = typeof res.body === "string" ? res.body : "";
    const results = parseYoutubeSearchHtml(html, limit);
    if (results.length > 0) {
      console.log(`[Core:Scraper] Desktop scrape parsed ${results.length} videos`);
      return results;
    }
    console.warn("[Core:Scraper] Desktop scrape returned 0 results");
  } catch (error) {
    console.error("[Core:Scraper] Desktop scrape failed:", error);
  }
  if (fallbackFn) {
    console.log("[Core:Scraper] Using external fallback function...");
    return fallbackFn(query, limit);
  }
  throw new Error("All YouTube scrape tiers failed");
}

// src/index.ts
var PROVIDER_ID = "nucleartube";
var PROVIDER_NAME = "NuclearTube";
var STREAMING_ID = `${PROVIDER_ID}-streaming`;
var PLAYLIST_ID = `${PROVIDER_ID}-playlist`;
var METADATA_ID = `${PROVIDER_ID}-metadata`;
function sdkToInternal(info) {
  return {
    streamUrl: info.stream_url,
    duration: info.duration,
    title: info.title,
    container: info.container,
    codec: info.codec
  };
}
function toStreamCandidate(id, title, duration, thumbnail) {
  return {
    id,
    title,
    durationMs: duration ? Math.round(duration * 1e3) : void 0,
    thumbnail: thumbnail ?? void 0,
    failed: false,
    source: { provider: STREAMING_ID, id }
  };
}
function toStream(url, info, sourceId) {
  const ext = info.container || "";
  const mimeType = ext.includes("m4a") || ext.includes("mp4") ? "audio/mp4" : ext.includes("webm") ? "audio/webm" : ext.includes("opus") ? "audio/ogg" : void 0;
  const chunkedUrl = url.includes("&range=") ? url : `${url}&range=0-99999999999`;
  return {
    url: chunkedUrl,
    protocol: "https",
    mimeType,
    codec: info.codec || void 0,
    container: info.container || void 0,
    durationMs: info.duration ? Math.round(info.duration * 1e3) : void 0,
    source: { provider: STREAMING_ID, id: sourceId }
  };
}
function createHttpAdapter(api) {
  return {
    fetch: async (url, init) => {
      const res = await api.Http.fetch(url, {
        headers: init?.headers,
        method: init?.method
      });
      const body = typeof res.body === "string" ? res.body : await res.text?.() || "";
      return {
        status: res.status,
        body,
        headers: res.headers
      };
    }
  };
}
async function scrapeYoutube2(api, query, limit) {
  const http = createHttpAdapter(api);
  return scrapeYoutube(http, query, limit, async (fallbackQuery, fallbackLimit) => {
    const results = await api.Ytdlp.search(fallbackQuery, fallbackLimit);
    return results.map((r) => ({
      id: r.id || r.videoId,
      title: r.title || "Unknown",
      duration: r.duration || null,
      thumbnail: r.thumbnail || null,
      channel: r.channel || r.author || null
    }));
  });
}
function isValidVideoId(id) {
  if (!id || typeof id !== "string") return false;
  return id.trim().length > 0 && !/\s/.test(id);
}
var plugin = {
  onLoad: async (_api) => {
    console.log(`[${PROVIDER_NAME}] Plugin loaded`);
  },
  onEnable: async (api) => {
    console.log(`[${PROVIDER_NAME}] Plugin enabled`);
    const streamingProvider = {
      id: STREAMING_ID,
      kind: "streaming",
      name: PROVIDER_NAME,
      searchForTrack: async (artist, title, album) => {
        const query = album ? `${artist} - ${title} - ${album}` : `${artist} - ${title}`;
        const results = await scrapeYoutube2(api, query, 10);
        return results.map(
          (r) => toStreamCandidate(r.id, r.title, r.duration, r.thumbnail)
        );
      },
      searchForTrackV2: async (track) => {
        const artist = track.artists?.[0]?.name || "";
        const title = track.title;
        const album = track.album?.title;
        const query = album ? `${artist} - ${title} - ${album}` : `${artist} - ${title}`;
        const results = await scrapeYoutube2(api, query, 10);
        return results.map(
          (r) => toStreamCandidate(r.id, r.title, r.duration, r.thumbnail)
        );
      },
      getStreamUrl: async (candidateId) => {
        if (!isValidVideoId(candidateId)) {
          throw new Error(`Invalid video ID format: ${candidateId}`);
        }
        const sdkInfo = await api.Ytdlp.getStream(candidateId);
        const info = sdkToInternal(sdkInfo);
        return toStream(info.streamUrl, info, candidateId);
      }
    };
    const playlistProvider = {
      id: PLAYLIST_ID,
      kind: "playlists",
      name: PROVIDER_NAME,
      matchesUrl: (url) => {
        return url.includes("youtube.com/") || url.includes("youtu.be/") || url.startsWith("ytsearch");
      },
      fetchPlaylistByUrl: async (url) => {
        const ytdlpPlaylist = await api.Ytdlp.getPlaylist(url);
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const playlist = {
          id: ytdlpPlaylist.id || btoa(encodeURIComponent(url)),
          name: ytdlpPlaylist.title || "Unknown Playlist",
          isReadOnly: true,
          createdAtIso: now,
          lastModifiedIso: now,
          items: ytdlpPlaylist.entries.map((entry) => {
            return {
              id: entry.id,
              addedAtIso: now,
              track: {
                title: entry.title,
                artists: entry.channel ? [{ name: entry.channel, roles: [] }] : [],
                durationMs: entry.duration ? Math.round(entry.duration * 1e3) : void 0,
                source: { provider: STREAMING_ID, id: entry.id },
                artwork: entry.thumbnails?.length ? {
                  items: entry.thumbnails.map((t) => ({
                    url: t.url,
                    width: t.width ?? void 0,
                    height: t.height ?? void 0,
                    purpose: "thumbnail"
                  }))
                } : void 0
              }
            };
          })
        };
        return playlist;
      }
    };
    const metadataProvider = {
      id: METADATA_ID,
      kind: "metadata",
      name: PROVIDER_NAME,
      searchCapabilities: ["tracks", "unified"],
      streamingProviderId: STREAMING_ID,
      search: async (params) => {
        const query = params.query;
        if (!query) return {};
        const results = await scrapeYoutube2(api, query, 20);
        return {
          tracks: results.map((r) => ({
            title: r.title,
            artists: r.channel ? [{ name: r.channel, roles: [] }] : [],
            durationMs: r.duration ? Math.round(r.duration * 1e3) : void 0,
            artwork: r.thumbnail ? { items: [{ url: r.thumbnail, purpose: "thumbnail" }] } : void 0,
            source: { provider: STREAMING_ID, id: r.id }
          }))
        };
      }
    };
    api.Providers.register(streamingProvider);
    api.Providers.register(playlistProvider);
    api.Providers.register(metadataProvider);
  },
  onDisable: async (api) => {
    console.log(`[${PROVIDER_NAME}] Plugin disabled`);
    api.Providers.unregister(STREAMING_ID);
    api.Providers.unregister(PLAYLIST_ID);
    api.Providers.unregister(METADATA_ID);
  },
  onUnload: async (api) => {
    console.log(`[${PROVIDER_NAME}] Plugin unloaded`);
    api.Providers.unregister(STREAMING_ID);
    api.Providers.unregister(PLAYLIST_ID);
    api.Providers.unregister(METADATA_ID);
  }
};
var src_default = plugin;

module.exports = src_default;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map