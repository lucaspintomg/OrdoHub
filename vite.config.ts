import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      // React SWC Plugin - Performance Otimizada
      react({
        // Otimizações avançadas do SWC
        tsDecorators: true,
        devTarget: 'esnext',
        plugins: []
      }),

      // PWA Plugin Configurado
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.ordohub\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'ordohub-api-cache',
                networkTimeoutSeconds: 10,
                cacheableResponse: {
                  statuses: [0, 200]
                },
                backgroundSync: {
                  name: 'ordohub-api-sync',
                  options: {
                    maxRetentionTime: 24 * 60 // 24 horas
                  }
                }
              }
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'ordohub-images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dias
                }
              }
            }
          ]
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'OrdoHub - Hub Universal de Gestão Doméstica',
          short_name: 'OrdoHub',
          description: 'Organize sua casa, família e vida de forma colaborativa e inteligente',
          theme_color: '#3b82f6',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          categories: ['productivity', 'lifestyle', 'utilities'],
          screenshots: [
            {
              src: 'screenshot-wide.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide'
            },
            {
              src: 'screenshot-narrow.png',
              sizes: '720x1280',
              type: 'image/png',
              form_factor: 'narrow'
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      }),

      // Type Checker Plugin
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          dev: {
            logLevel: ['error']
          }
        },
        overlay: {
          initialIsOpen: false,
          position: 'br'
        },
        enableBuild: false
      })
    ],

    // CSS Otimizações
    css: {
      postcss: './postcss.config.js',
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/shared/ui/styles/variables.scss";`
        }
      }
    },

    // Path Aliases Simplificados
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/components': resolve(__dirname, './src/components'),
        '@/pages': resolve(__dirname, './src/pages'),
        '@/hooks': resolve(__dirname, './src/hooks'),
        '@/utils': resolve(__dirname, './src/utils'),
        '@/lib': resolve(__dirname, './src/lib'),
        '@/types': resolve(__dirname, './src/types'),
        '@/constants': resolve(__dirname, './src/constants'),
        '@/config': resolve(__dirname, './src/config'),
        '@/api': resolve(__dirname, './src/api'),
        '@/assets': resolve(__dirname, './src/assets'),
        '@/store': resolve(__dirname, './src/store'),
        '@/styles': resolve(__dirname, './src/styles'),
        '@/tests': resolve(__dirname, './src/tests'),
        '~': resolve(__dirname, './public'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },

    // Servidor de Desenvolvimento com Proxy
    server: {
      port: parseInt(env.VITE_PORT || '3000') || 3000,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
        port: parseInt(env.VITE_HMR_PORT || '24678') || 24678
      },
      // Proxy para desenvolvimento
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (_proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        },
        '/socket.io': {
          target: env.VITE_WEBSOCKET_URL || 'http://localhost:8000',
          changeOrigin: true,
          ws: true
        },
        '/uploads': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      },
      // Configurações de performance
      watch: {
        usePolling: false,
        interval: 100,
        ignored: ['**/node_modules/**', '**/.git/**']
      }
    },

    // Preview Server
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173') || 4173,
      host: true,
      open: true,
      cors: true
    },

    // Build Otimizações
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: command === 'build' ? 'hidden' : true,
      target: 'es2022',
      minify: 'esbuild',
      cssMinify: 'esbuild',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      // Rollup options otimizadas
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          // Manual Chunks para Bundle Splitting Otimizado
          manualChunks: {
            // Core Libraries
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'query': ['@tanstack/react-query'],
            'state': ['zustand'],
            
            // UI Libraries
            'ui-vendor': [
              '@headlessui/react',
              'framer-motion',
              'lucide-react'
            ],
            
            // Utilities
            'utils-vendor': [
              'date-fns',
              'clsx',
              'class-variance-authority',
              'tailwind-merge'
            ],
            
            // Backend
            'backend-vendor': [
              '@supabase/supabase-js'
            ],
            
            // Form & Validation
            'form-vendor': [
              'react-hook-form',
              'zod'
            ]
          },
          // File naming
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
            if (facadeModuleId && facadeModuleId.includes('node_modules')) {
              return 'assets/vendor/[name]-[hash].js'
            }
            return 'assets/js/[name]-[hash].js'
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || 'unknown'
            const info = name.split('.')
            const ext = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
              return `assets/media/[name]-[hash].${ext}`
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(name)) {
              return `assets/images/[name]-[hash].${ext}`
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
              return `assets/fonts/[name]-[hash].${ext}`
            }
            return `assets/[ext]/[name]-[hash].${ext}`
          }
        },
        // External dependencies (não incluir no bundle)
        external: mode === 'development' ? [] : [],
        // Plugin options
        plugins: []
      }
    },

    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'clsx'
      ],
      exclude: [
        '@swc/helpers',
        '@vite/client',
        '@vite/env'
      ],
      esbuildOptions: {
        target: 'es2022'
      }
    },

    // ESBuild configuration
    esbuild: {
      target: 'es2022',
      logOverride: { 
        'this-is-undefined-in-esm': 'silent',
        'ignored-bare-import': 'silent'
      },
      drop: command === 'build' ? ['console', 'debugger'] : [],
      minifyIdentifiers: command === 'build',
      minifySyntax: command === 'build',
      minifyWhitespace: command === 'build'
    },

    // Define global constants
    define: {
      __DEV__: JSON.stringify(mode === 'development'),
      __PROD__: JSON.stringify(mode === 'production'),
      __TEST__: JSON.stringify(mode === 'test'),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },

    // Environment variables
    envPrefix: ['VITE_', 'ORDOHUB_'],
    envDir: '.',

    // Worker configuration
    // JSON configuration
    json: {
      namedExports: true,
      stringify: false
    },

    // Asserts inline threshold
    assetsInclude: ['**/*.md']
  }
})
