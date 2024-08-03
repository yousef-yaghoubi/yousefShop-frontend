import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
   plugins: [react()],
    server: {
        proxy: {
          '/api': {
            target: 'https://yousefshopapi.liara.run',
            changeOrigin: true,
            secure: false,
          } 
        }
      }
  };
});
