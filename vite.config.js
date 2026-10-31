import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Hỗ trợ mở trực tiếp file dist/index.html không cần web server
  server: {
    port: 3000,
    open: false
  }
});
