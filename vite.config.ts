import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages publica este projeto em /projeto-petshop/.
export default defineConfig({
  base: '/projeto-petshop/',
  plugins: [react(), tailwindcss()],
})
