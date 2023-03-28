import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
dotenv.config();

const isDev = process.env.BUILD_MODE === 'development';
let outputNamesOptions;
if (isDev) {
  outputNamesOptions = {
    entryFileNames: 'assets/[name].js',
    chunkFileNames: 'assets/[name].js',
    assetFileNames: 'assets/[name].[ext]',
  };
}
console.log(outputNamesOptions);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    cssMinify: false,
    rollupOptions: {
      output: {
        ...outputNamesOptions,
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
