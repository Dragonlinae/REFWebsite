import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        search: resolve('courses/search/index.html'),
        profile: resolve('courses/profile/index.html'),
      },
      output: {
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.length > 0 && assetInfo.names[0].endsWith('.css')) {
            return 'static/css/[name]-[hash][extname]'
          }
          return 'static/media/[name]-[hash][extname]'
        },
      },
    },
    // copy files in /public to /dist/static instead of /dist
    // but still keep default build directory as /dist
    assetsDir: 'static',
  },
})
