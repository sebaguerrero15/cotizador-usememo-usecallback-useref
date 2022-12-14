import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://sebaguerrero15.github.io/cotizador-usememo-usecallback-useref/"
})
