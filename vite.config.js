import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Prompt App',
        short_name: 'Prompt',
        description: 'Prompt AI for sending emails',
        theme_color: '#8936FF',
        background_color: '#2EC6FE',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'any',
        dir: 'auto',
        lang: 'en-GB',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'icon512_maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'icon512_rounded.png',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Additional Workbox options if needed
      },
    }),
  ],
});
