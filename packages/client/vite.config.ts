import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { InputOptions, OutputOptions, rollup } from 'rollup';
import rollupPluginTypescript from 'rollup-plugin-typescript';
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

const CompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle() {
    const inputOptions: InputOptions = {
      input: 'src/service-worker/worker/service-worker.ts',
      plugins: [rollupPluginTypescript()],
    };
    const outputOptions: OutputOptions = {
      file: `${OUT_DIR}/service-worker.js`,
      format: 'es',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
      //https: true,
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    },
    plugins: [react(), CompileTsServiceWorker()],
    build: {
      outDir: OUT_DIR,
      cssMinify: mode === 'production',
      rollupOptions: {
        output: {
          ...outputNamesOptions,
        },
      },
    },
    ssr: {
      format: 'cjs',
      target: 'node',
    },
    legacy: {
      buildSsrCjsExternalHeuristics: true,
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
  };
});
