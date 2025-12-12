import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isPluginMode = mode === 'plugin';

  return {
    plugins: [
      react(),
      dts({ insertTypesEntry: true }),
    ],
    optimizeDeps: {
      exclude: ['react-fs-router-dom'],  // Skip pre-bundling for your lib
    },
    resolve: {
      preserveSymlinks: true,  // Sometimes helps with link-like setups
    },
    build: {
      lib: {
        entry: isPluginMode
          ? resolve(__dirname, 'src/vite-plugin.ts')
          : resolve(__dirname, 'src/index.ts'),
        name: isPluginMode ? 'ReactFsRouterPlugin' : 'ReactFsRouterDom',
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
        formats: isPluginMode ? ['es', 'cjs'] : ['es', 'umd'],  // Browser-friendly for main lib if needed
      },
      ssr: isPluginMode,  // True for plugin (Node target), false for main lib (browser)
      target: isPluginMode ? 'node16' : 'esnext',  // Node version for plugin, browser for lib
      minify: isPluginMode ? false : 'esbuild',  // Optional: Disable minify for plugin to ease debugging
      rollupOptions: {
        external: [
          'react', 'react-dom', 'react-router-dom', 'fast-glob',
          ...(isPluginMode ? [/^node:.*/, 'os', 'path', 'fs', 'util', 'fast-glob'] : []),  // Externalize Node stuff only for plugin
          'virtual:react-fs-router-dom/routes',  // As before
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
          },
        },
      },
    },
  };
});
