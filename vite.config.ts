import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rolldownOptions: {
      // Regexes so subpaths like react/jsx-runtime stay external too
      external: [/^react($|\/)/, /^react-dom($|\/)/]
    },
    // tsc writes declarations to dist first; the clean script empties it before each build
    emptyOutDir: false,
    // public/ holds README screenshots, which don't belong in the npm package
    copyPublicDir: false
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/stories/**', 'src/tests/**'],
      reporter: ['text', 'lcov', 'clover', 'json'],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95
      }
    }
  }
})
