import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    
    // Optimize for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          lucide: ['lucide-react']
        }
      }
    },
    
    // Ensure compatibility
    target: 'es2015',
    minify: 'terser',
    
    // Asset handling
    assetsInlineLimit: 4096
  },
  
  // Development server
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components'),
      '@data': resolve(__dirname, './data'),
      '@styles': resolve(__dirname, './styles')
    }
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  },
  
  // GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/streaming-platform/' : '/',
  
  // Ensure proper handling of assets
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp']
})