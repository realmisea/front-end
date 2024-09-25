import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
        alias: [
            { find: '@components', replacement: '/src/components' },
            { find: '@apis', replacement: '/src/apis' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@assets', replacement: '/src/assets' }
        ]
    }
})
