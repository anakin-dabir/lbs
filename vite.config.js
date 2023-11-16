import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';
const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['/vite.svg', '/huh.mp3', '/won.mp3'],
  manifest: {
    name: 'lbs-app',
    short_name: 'lbs-pwa',
    description: 'lbs app in PWA',
    icons: [
      {
        src: '/vite.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
    // injectRegister: 'auto',
    // registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    // workbox: {
    //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    // },
    // srcDir: "public",
    filename: 'service-worker.js',
    strategies: 'injectManifest',
    injectRegister: false,
    manifest: false,
    injectManifest: {
      injectionPoint: null,
    },
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
