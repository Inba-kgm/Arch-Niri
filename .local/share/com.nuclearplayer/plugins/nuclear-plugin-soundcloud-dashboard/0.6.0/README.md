# SoundCloud Dashboard for Nuclear

Adds a dashboard provider backed by SoundCloud's internal v2 API. Companion to
[`nuclear-plugin-soundcloud`](https://github.com/NuclearPlayer/nuclear-plugin-soundcloud),
which provides the metadata and streaming sides — this plugin only fills the
home screen, and can build it out of your own account.

All settings live in `Preferences → General → SoundCloud Dashboard`.

## Installing

Not in the plugin registry yet, so install it as a dev plugin:

```
git clone https://github.com/dasim427/nuclear-plugin-soundcloud-dashboard.git
```

In Nuclear go to `Preferences → Plugins → Installed → Add Plugin` and pick the
cloned folder. There is no build step and no `npm install` — Nuclear compiles
the TypeScript itself, and the only dependency, `@nuclearplayer/plugin-sdk`, is
imported for types alone.

Install `nuclear-plugin-soundcloud` from the store too: this plugin leans on it
for metadata and playback, and points its cards at it.

## Modes

| Mode | Configured with | What you get |
| --- | --- | --- |
| Global | nothing | trending charts and SoundCloud's editorial selections |
| Public profile | **Your SoundCloud profile** | that account's public likes, follows and playlists |
| Authenticated | **OAuth token** | the same, plus private content, your feed and play history |

The token wins over the profile URL — it identifies the account by itself.

## Sections

| Capability | Global | Personal |
| --- | --- | --- |
| `topTracks` | `/charts?kind=trending`, falling back to `/featured_tracks/top/all-music` | your likes, uploads, reposts, feed or play history |
| `topArtists` | authors of the trending chart, ranked by charting tracks then best score | `/users/{id}/followings` |
| `topArtists` (cont.) | | topped up with the artists behind the listened tracks |
| `editorialPlaylists` | `/mixed-selections` | `/mixed-selections` (personalised) or your own + liked playlists |

**Which playlists to show** chooses between the two. `/mixed-selections` is the
endpoint behind SoundCloud's own home page: called anonymously it returns the
generic editorial rows, called with a token it returns that account's
personalised ones — More of what you like, Recently Played, Albums for you,
Mixed for <you>, Made for you, Discover with Stations, Curated by SoundCloud.

Those rows arrive flattened into one list, because a `DashboardProvider` has no
way to declare extra named sections — the five capabilities are fixed by the
host.

**Which of your tracks to show** picks the preferred track source. If it is
empty or unavailable the remaining sources are tried in turn, so a profile with
no likes still shows its uploads.

`topAlbums` and `newReleases` are deliberately not declared: SoundCloud has no
album entity and no new-releases endpoint.

## Opening a recommended playlist

The plugin also registers a `playlists` provider, `soundcloud-system-playlists`,
purely so the recommendation cards can be opened.

SoundCloud's generated playlists (kind `system-playlist`) live at URLs like
`soundcloud.com/discover/sets/personalized-tracks::user:id` and only resolve for
the account they belong to. `nuclear-plugin-soundcloud` matches every
`soundcloud.com/*/sets/*` URL with an unanchored regex, so it grabbed those
clicks and resolved them anonymously — `404 for resolve`. The host picks the
first provider whose `matchesUrl` returns true and never falls through to
another one, so being second in the list is fatal.

The fix is to address generated playlists by URN instead: their `source.url` is
`soundcloud:system-playlists:…`, which the other plugin's regex cannot match and
this provider claims. It then fetches `/system-playlists/{urn}` with the token
and hydrates the track stubs via `/tracks?ids=…`, preserving SoundCloud's order.

Ordinary playlists keep their normal permalink and are still handled by the main
plugin.

## Authentication

SoundCloud closed public API registration years ago, so there is no OAuth flow
to offer. Two consequences:

1. The `client_id` is scraped from SoundCloud's public JS bundles, the same way
   `nuclear-plugin-soundcloud` does it, and refreshed on 401/403.
2. Reaching your private data means reusing the token your browser already
   holds. Log in on soundcloud.com, open DevTools → Application → Cookies →
   `https://soundcloud.com`, copy `oauth_token`, paste it into the setting.

Handling of that token:

- It is sent as `Authorization: OAuth <token>`, and **only to
  `api-v2.soundcloud.com`**. The `client_id` scrape talks to `soundcloud.com`
  and the `sndcdn.com` CDN; those requests deliberately carry no credential.
- It is validated once per session against `/me`. A rejected token logs a
  warning and the session **drops back to anonymous fetching** — without that,
  a stale token would 401 every endpoint including the public charts and blank
  the dashboard.
- Nuclear stores settings in plain text in `settings.json`. Treat the token as a
  password: anything that can read that file can act as your SoundCloud account
  until the token is invalidated.
- It dies when you log out of the browser session it came from. Symptom is the
  `token rejected` warning in the log; the fix is copying a fresh cookie.

## Notes

SoundCloud retired `charts?kind=top` — it answers 404 — hence the fallback on
`fetchTopTracks`.

`metadataProviderId` points at `soundcloud`, so clicking through a card opens
the page served by the main SoundCloud plugin.

## License

AGPL-3.0-only
