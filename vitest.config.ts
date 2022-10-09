import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteConfig,
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
