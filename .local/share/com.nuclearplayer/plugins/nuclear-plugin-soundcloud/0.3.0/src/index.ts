import type {
  NuclearPlugin,
  NuclearPluginAPI,
} from '@nuclearplayer/plugin-sdk';

import { clearCachedClientId } from './client-id';
import {
  METADATA_PROVIDER_ID,
  PLAYLIST_PROVIDER_ID,
  STREAMING_PROVIDER_ID,
} from './config';
import { createMetadataProvider } from './metadata-provider';
import { createPlaylistProvider } from './playlist-provider';
import { createStreamingProvider } from './streaming-provider';

const plugin: NuclearPlugin = {
  onEnable(api: NuclearPluginAPI) {
    api.Providers.register(createMetadataProvider(api));
    api.Providers.register(createStreamingProvider(api));
    api.Providers.register(createPlaylistProvider(api));
  },

  onDisable(api: NuclearPluginAPI) {
    api.Providers.unregister(METADATA_PROVIDER_ID);
    api.Providers.unregister(STREAMING_PROVIDER_ID);
    api.Providers.unregister(PLAYLIST_PROVIDER_ID);
    clearCachedClientId();
  },
};

export default plugin;
