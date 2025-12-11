/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  dts({
    // Generate .d.ts files
    insertTypesEntry: true,
    // Include all files from src
    include: ['src/**/*'],
    // Exclude test files
    exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    // Output directory
    outDir: 'dist',
    // Generate source maps for types
    rollupTypes: true,
    // Emit declaration files
    staticImport: true,
    // Log level
    logLevel: 'error',
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['**/*.test.ts'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactFsRouterDom',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-router-dom': 'ReactRouterDOM',
        },
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        exports: 'named',
      },
    },
    // Generate source maps
    sourcemap: true,
    // Target modern browsers
    target: 'esnext',
    // Minify
    minify: false,
  },
})
