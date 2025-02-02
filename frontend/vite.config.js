import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
<<<<<<< HEAD
=======
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
>>>>>>> b707e38 (initial commit)
})