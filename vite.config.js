import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';
const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: [],
  manifest: {
    name: 'Map-app',
    short_name: 'map-app',
    description: 'Map App',
    icons: [],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
