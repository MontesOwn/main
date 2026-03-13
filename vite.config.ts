import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        montvilla: resolve(__dirname, 'montvilla.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        booking: resolve(__dirname, 'booking.html'),
        beekeeping: resolve(__dirname, 'beekeeping.html'),
        chickens: resolve(__dirname, 'chickens.html'),
        garden: resolve(__dirname, 'garden.html'),
        maple: resolve(__dirname, 'maple.html')
      },
    },
  },
});