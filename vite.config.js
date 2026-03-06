import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site base path.
  // If you publish under a different repo name, change this to "/<repo-name>/".
  base: '/prompt-engineering-portal/',
})
