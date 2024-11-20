import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    // https: true,
    proxy: {
      '/api': {
        target: 'https://fierce-jerrilee-realmisea-3853df29.koyeb.app',
        changeOrigin: true,
        secure: false // HTTPS 사용
      }
    }
  },

  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' }
    ]
  }
});
