import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
const build=   {
    lib: {
      entry: 'src/index.jsx', // Example entry point
      formats: ['cjs', 'es'], // Example formats
    },
    rollupOptions: {
        
    },
  };

export default defineConfig({
    root: './',
    base: './',
    plugins: [react()],
});