// ../client/vite.config.ts
import react from "file:///C:/Users/vitas/Desktop/dev/among-us/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/vitas/Desktop/dev/among-us/node_modules/dotenv/lib/main.js";
import path from "path";
import { rollup } from "file:///C:/Users/vitas/Desktop/dev/among-us/node_modules/rollup/dist/es/rollup.js";
import rollupPluginTypescript from "file:///C:/Users/vitas/Desktop/dev/among-us/node_modules/rollup-plugin-typescript/dist/rollup-plugin-typescript.cjs.js";
import { defineConfig } from "file:///C:/Users/vitas/Desktop/dev/among-us/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\vitas\\Desktop\\dev\\among-us\\packages\\client";
dotenv.config();
var IS_DEV = process.env.BUILD_MODE === "development";
var OUT_DIR = "dist";
var outputNamesOptions;
if (IS_DEV) {
  outputNamesOptions = {
    entryFileNames: "assets/[name].js",
    chunkFileNames: "assets/[name].js",
    assetFileNames: "assets/[name].[ext]"
  };
}
console.log(outputNamesOptions);
var CompileTsServiceWorker = () => ({
  name: "compile-typescript-service-worker",
  async writeBundle() {
    const inputOptions = {
      input: "src/service-worker/worker/service-worker.ts",
      plugins: [rollupPluginTypescript()]
    };
    const outputOptions = {
      file: `${OUT_DIR}/service-worker.js`,
      format: "es"
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  }
});
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  },
  plugins: [react(), CompileTsServiceWorker()],
  build: {
    outDir: OUT_DIR,
    cssMinify: false,
    rollupOptions: {
      output: {
        ...outputNamesOptions
      }
    }
  },
  ssr: {
    format: "cjs",
    target: "node"
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src/"),
      images: path.resolve(__vite_injected_original_dirname, "src/images/"),
      fonts: path.resolve(__vite_injected_original_dirname, "src/vendor/fonts/")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdml0YXNcXFxcRGVza3RvcFxcXFxkZXZcXFxcYW1vbmctdXNcXFxccGFja2FnZXNcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2aXRhc1xcXFxEZXNrdG9wXFxcXGRldlxcXFxhbW9uZy11c1xcXFxwYWNrYWdlc1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3ZpdGFzL0Rlc2t0b3AvZGV2L2Ftb25nLXVzL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IElucHV0T3B0aW9ucywgT3V0cHV0T3B0aW9ucywgcm9sbHVwIH0gZnJvbSAncm9sbHVwJztcbmltcG9ydCByb2xsdXBQbHVnaW5UeXBlc2NyaXB0IGZyb20gJ3JvbGx1cC1wbHVnaW4tdHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgSVNfREVWID0gcHJvY2Vzcy5lbnYuQlVJTERfTU9ERSA9PT0gJ2RldmVsb3BtZW50JztcbmNvbnN0IE9VVF9ESVIgPSAnZGlzdCc7XG5cbmxldCBvdXRwdXROYW1lc09wdGlvbnM7XG5pZiAoSVNfREVWKSB7XG4gIG91dHB1dE5hbWVzT3B0aW9ucyA9IHtcbiAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uanMnLFxuICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5qcycsXG4gICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLltleHRdJyxcbiAgfTtcbn1cbmNvbnNvbGUubG9nKG91dHB1dE5hbWVzT3B0aW9ucyk7XG5cbmNvbnN0IENvbXBpbGVUc1NlcnZpY2VXb3JrZXIgPSAoKSA9PiAoe1xuICBuYW1lOiAnY29tcGlsZS10eXBlc2NyaXB0LXNlcnZpY2Utd29ya2VyJyxcbiAgYXN5bmMgd3JpdGVCdW5kbGUoKSB7XG4gICAgY29uc3QgaW5wdXRPcHRpb25zOiBJbnB1dE9wdGlvbnMgPSB7XG4gICAgICBpbnB1dDogJ3NyYy9zZXJ2aWNlLXdvcmtlci93b3JrZXIvc2VydmljZS13b3JrZXIudHMnLFxuICAgICAgcGx1Z2luczogW3JvbGx1cFBsdWdpblR5cGVzY3JpcHQoKV0sXG4gICAgfTtcbiAgICBjb25zdCBvdXRwdXRPcHRpb25zOiBPdXRwdXRPcHRpb25zID0ge1xuICAgICAgZmlsZTogYCR7T1VUX0RJUn0vc2VydmljZS13b3JrZXIuanNgLFxuICAgICAgZm9ybWF0OiAnZXMnLFxuICAgIH07XG4gICAgY29uc3QgYnVuZGxlID0gYXdhaXQgcm9sbHVwKGlucHV0T3B0aW9ucyk7XG4gICAgYXdhaXQgYnVuZGxlLndyaXRlKG91dHB1dE9wdGlvbnMpO1xuICAgIGF3YWl0IGJ1bmRsZS5jbG9zZSgpO1xuICB9LFxufSk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQgfHwgMzAwMSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIENvbXBpbGVUc1NlcnZpY2VXb3JrZXIoKV0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBPVVRfRElSLFxuICAgIGNzc01pbmlmeTogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC4uLm91dHB1dE5hbWVzT3B0aW9ucyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc3NyOiB7XG4gICAgZm9ybWF0OiAnY2pzJyxcbiAgICB0YXJnZXQ6ICdub2RlJyxcbiAgfSxcbiAgbGVnYWN5OiB7XG4gICAgYnVpbGRTc3JDanNFeHRlcm5hbEhldXJpc3RpY3M6IHRydWUsXG4gIH0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvJyksXG4gICAgICBpbWFnZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW1hZ2VzLycpLFxuICAgICAgZm9udHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdmVuZG9yL2ZvbnRzLycpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlYsT0FBTyxXQUFXO0FBQzdXLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsU0FBc0MsY0FBYztBQUNwRCxPQUFPLDRCQUE0QjtBQUNuQyxTQUFTLG9CQUFvQjtBQUw3QixJQUFNLG1DQUFtQztBQU16QyxPQUFPLE9BQU87QUFFZCxJQUFNLFNBQVMsUUFBUSxJQUFJLGVBQWU7QUFDMUMsSUFBTSxVQUFVO0FBRWhCLElBQUk7QUFDSixJQUFJLFFBQVE7QUFDVix1QkFBcUI7QUFBQSxJQUNuQixnQkFBZ0I7QUFBQSxJQUNoQixnQkFBZ0I7QUFBQSxJQUNoQixnQkFBZ0I7QUFBQSxFQUNsQjtBQUNGO0FBQ0EsUUFBUSxJQUFJLGtCQUFrQjtBQUU5QixJQUFNLHlCQUF5QixPQUFPO0FBQUEsRUFDcEMsTUFBTTtBQUFBLEVBQ04sTUFBTSxjQUFjO0FBQ2xCLFVBQU0sZUFBNkI7QUFBQSxNQUNqQyxPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsdUJBQXVCLENBQUM7QUFBQSxJQUNwQztBQUNBLFVBQU0sZ0JBQStCO0FBQUEsTUFDbkMsTUFBTSxHQUFHO0FBQUEsTUFDVCxRQUFRO0FBQUEsSUFDVjtBQUNBLFVBQU0sU0FBUyxNQUFNLE9BQU8sWUFBWTtBQUN4QyxVQUFNLE9BQU8sTUFBTSxhQUFhO0FBQ2hDLFVBQU0sT0FBTyxNQUFNO0FBQUEsRUFDckI7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU0sT0FBTyxRQUFRLElBQUksV0FBVyxLQUFLO0FBQUEsRUFDM0M7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGlCQUFpQixRQUFRLElBQUksZUFBZTtBQUFBLEVBQzlDO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLHVCQUF1QixDQUFDO0FBQUEsRUFDM0MsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sR0FBRztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLCtCQUErQjtBQUFBLEVBQ2pDO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE1BQU07QUFBQSxNQUNuQyxRQUFRLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDN0MsT0FBTyxLQUFLLFFBQVEsa0NBQVcsbUJBQW1CO0FBQUEsSUFDcEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
