import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactMarkdownTableTS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      // Regexes so subpaths like react/jsx-runtime stay external too
      external: [/^react($|\/)/, /^react-dom($|\/)/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    // tsc writes declarations to dist first; the clean script empties it before each build
    emptyOutDir: false,
    // public/ holds README screenshots, which don't belong in the npm package
    copyPublicDir: false
  }
})
