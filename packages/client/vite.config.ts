import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
dotenv.config();

const IS_DEV = process.env.BUILD_MODE === 'development';
const OUT_DIR = 'dist';

let outputNamesOptions;
if (IS_DEV) {
  outputNamesOptions = {
    entryFileNames: 'assets/[name].js',
    chunkFileNames: 'assets/[name].js',
    assetFileNames: 'assets/[name].[ext]',
  };
}
console.log(outputNamesOptions);

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    outDir: OUT_DIR,
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      images: path.resolve(__dirname, 'src/images/'),
      fonts: path.resolve(__dirname, 'src/vendor/fonts/'),
    },
  },
});
