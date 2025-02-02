import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 4c9e62d2d382cfb69e2413889fd8ae749bbe706f
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
<<<<<<< HEAD
>>>>>>> b707e38 (initial commit)
=======
>>>>>>> 4c9e62d2d382cfb69e2413889fd8ae749bbe706f
})