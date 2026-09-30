import type {
  NuclearPlugin,
  NuclearPluginAPI,
} from '@nuclearplayer/plugin-sdk';

import { clearCachedClientId } from './client-id';
import { DASHBOARD_PROVIDER_ID, PLAYLIST_PROVIDER_ID } from './config';
import { createDashboardProvider } from './dashboard-provider';
import { createSoundcloudFetch } from './fetch';
import { createPlaylistProvider } from './playlist-provider';
import { clearProfileCache } from './profile';
import {
  SETTINGS,
  settingsDefinitions,
  type PlaylistSource,
  type TrackSource,
} from './settings';

const plugin: NuclearPlugin = {
  async onEnable(api: NuclearPluginAPI) {
    await api.Settings.register(settingsDefinitions);

    const fetch = createSoundcloudFetch(api.Http.fetch);

    api.Providers.register(
      createPlaylistProvider({
        fetch,
        log: api.Logger,
        getOAuthToken: () => api.Settings.get<string>(SETTINGS.OAUTH_TOKEN),
        getSplitTitles: () => api.Settings.get<boolean>(SETTINGS.SPLIT_TITLES),
      }),
    );

    api.Providers.register(
      createDashboardProvider({
        fetch,
        log: api.Logger,
        getProfileUrl: () => api.Settings.get<string>(SETTINGS.PROFILE_URL),
        getOAuthToken: () => api.Settings.get<string>(SETTINGS.OAUTH_TOKEN),
        getTrackSource: () =>
          api.Settings.get<TrackSource>(SETTINGS.TRACK_SOURCE),
        getPlaylistSource: () =>
          api.Settings.get<PlaylistSource>(SETTINGS.PLAYLIST_SOURCE),
        getSplitTitles: () => api.Settings.get<boolean>(SETTINGS.SPLIT_TITLES),
      }),
    );
  },

  onDisable(api: NuclearPluginAPI) {
    api.Providers.unregister(DASHBOARD_PROVIDER_ID);
    api.Providers.unregister(PLAYLIST_PROVIDER_ID);
    clearCachedClientId();
    clearProfileCache();
  },
};

export default plugin;
