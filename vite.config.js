import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    watch: { ignored: ['**/*.glb'] },
    // serve index.html for /studio/* so the studio router works
    historyApiFallback: true,
  },
})
