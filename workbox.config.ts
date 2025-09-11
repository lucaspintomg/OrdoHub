// OrdoHub - Workbox Configuration
// Configurações avançadas para Service Worker e PWA

import { GenerateSWOptions } from 'workbox-build'

export const workboxConfig: GenerateSWOptions = {
  // Arquivos para precache
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,svg,gif,webp,woff,woff2,ttf,eot,ico}'
  ],
  
  // Arquivo de saída do service worker
  swDest: 'dist/sw.js',
  
  // Limpeza de caches antigos
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  
  // Estratégias de cache personalizadas
  runtimeCaching: [
    // Cache da API principal
    {
      urlPattern: /^https:\/\/api\.ordohub\.com\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ordohub-api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60 // 5 minutos
        },
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
    
    // Cache de imagens
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
    },
    
    // Cache de fontes
    {
      urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'ordohub-fonts-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 ano
        }
      }
    },
    
    // Cache de recursos estáticos
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'ordohub-static-cache'
      }
    },
    
    // Cache de documentos HTML
    {
      urlPattern: /\.(?:html)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ordohub-pages-cache',
        networkTimeoutSeconds: 3
      }
    },
    
    // Cache específico para dados de usuário
    {
      urlPattern: /^https:\/\/api\.ordohub\.com\/users\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ordohub-user-cache',
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 15 * 60 // 15 minutos
        }
      }
    },
    
    // Cache para tarefas (sincronização offline)
    {
      urlPattern: /^https:\/\/api\.ordohub\.com\/tasks.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ordohub-tasks-cache',
        networkTimeoutSeconds: 8,
        backgroundSync: {
          name: 'ordohub-tasks-sync',
          options: {
            maxRetentionTime: 48 * 60 // 48 horas
          }
        },
        broadcastUpdate: {
          channelName: 'ordohub-updates',
          options: {
            headersToCheck: ['content-length', 'etag', 'last-modified']
          }
        }
      }
    },
    
    // Cache para listas de compras
    {
      urlPattern: /^https:\/\/api\.ordohub\.com\/shopping.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ordohub-shopping-cache',
        networkTimeoutSeconds: 8,
        backgroundSync: {
          name: 'ordohub-shopping-sync'
        }
      }
    },
    
    // CDN de recursos externos
    {
      urlPattern: /^https:\/\/cdn\.ordohub\.com\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'ordohub-cdn-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 dias
        }
      }
    },
    
    // Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 ano
        }
      }
    }
  ],
  
  // Navegação offline
  navigateFallback: '/offline.html',
  navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
  
  // Configurações de build
  mode: 'production',
  sourcemap: false,
  
  // Ignorar arquivos específicos
  dontCacheBustURLsMatching: /\.\w{8}\./,
  
  // Tamanho máximo de arquivo para precache
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  
  // Configurações de desenvolvimento
  inlineWorkboxRuntime: true,
  
  // Manifesto personalizado
  manifestTransforms: [
    (manifestEntries) => {
      const manifest = manifestEntries.map((entry) => {
        if (entry.url.endsWith('.html')) {
          entry.url = entry.url.replace(/\.html$/, '')
        }
        return entry
      })
      return { manifest }
    }
  ]
}

export default workboxConfig
