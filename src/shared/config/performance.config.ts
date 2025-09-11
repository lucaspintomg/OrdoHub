// OrdoHub - Performance e Bundle Configuration
// Configurações de análise e otimização de bundle

import type { PluginOption } from 'vite'

// Configuração de análise de bundle
export const bundleAnalyzer: PluginOption = {
  name: 'bundle-analyzer',
  generateBundle(_options, bundle) {
    // Análise de tamanho de chunks
    const chunks = Object.keys(bundle).map(key => {
      const chunk = bundle[key]
      if (chunk && chunk.type === 'chunk') {
        return {
          name: chunk.fileName,
          size: chunk.code?.length || 0,
          modules: Object.keys(chunk.modules || {}).length
        }
      }
      return null
    }).filter(Boolean)

    // Log de estatísticas
    console.log('\n📊 Bundle Analysis:')
    console.table(chunks)

    // Aviso para chunks grandes
    chunks.forEach(chunk => {
      if (chunk && chunk.size > 500000) { // 500KB
        console.warn(`⚠️  Large chunk detected: ${chunk.name} (${(chunk.size / 1024).toFixed(2)}KB)`)
      }
    })
  }
}

// Configuração de performance budget
export const performanceBudget = {
  // Limites de tamanho
  maxAssetSize: 500000, // 500KB
  maxEntrypointSize: 1000000, // 1MB
  
  // Avisos para recursos grandes
  assetFilter: (assetFilename: string) => {
    return !/\.map$/.test(assetFilename)
  },
  
  // Hints de performance
  hints: 'warning' as const,
  
  // Configurações específicas do OrdoHub
  budgets: [
    {
      type: 'initial',
      maximumWarning: '1mb',
      maximumError: '2mb'
    },
    {
      type: 'anyComponentStyle',
      maximumWarning: '50kb',
      maximumError: '100kb'
    },
    {
      type: 'any',
      maximumWarning: '500kb',
      maximumError: '1mb'
    }
  ]
}

// Configuração de code splitting otimizada
export const codeSplitting = {
  // Vendor libraries
  vendor: {
    test: /[\\/]node_modules[\\/]/,
    name: 'vendors',
    chunks: 'all' as const,
    priority: 10,
    reuseExistingChunk: true
  },
  
  // React ecosystem
  react: {
    test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
    name: 'react-vendor',
    chunks: 'all' as const,
    priority: 20
  },
  
  // UI Libraries
  ui: {
    test: /[\\/]node_modules[\\/](@headlessui|@heroicons|framer-motion)[\\/]/,
    name: 'ui-vendor',
    chunks: 'all' as const,
    priority: 15
  },
  
  // State management
  state: {
    test: /[\\/]node_modules[\\/](zustand|@tanstack\/react-query)[\\/]/,
    name: 'state-vendor',
    chunks: 'all' as const,
    priority: 15
  },
  
  // Form libraries
  forms: {
    test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
    name: 'forms-vendor',
    chunks: 'all' as const,
    priority: 15
  },
  
  // Utilities
  utils: {
    test: /[\\/]node_modules[\\/](clsx|tailwind-merge|date-fns|lodash-es)[\\/]/,
    name: 'utils-vendor',
    chunks: 'all' as const,
    priority: 15
  },
  
  // Charts and visualization
  charts: {
    test: /[\\/]node_modules[\\/](recharts|d3|chart\.js)[\\/]/,
    name: 'charts-vendor',
    chunks: 'all' as const,
    priority: 15
  },
  
  // Common modules (página/módulo específico)
  common: {
    name: 'common',
    minChunks: 2,
    chunks: 'all' as const,
    priority: 5,
    reuseExistingChunk: true
  }
}

// Configuração de preload/prefetch
export const resourceHints = {
  // Critical resources to preload
  preload: [
    // Fontes críticas
    { rel: 'preload', href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
    // CSS crítico
    { rel: 'preload', href: '/assets/css/critical.css', as: 'style' },
    // JavaScript crítico
    { rel: 'preload', href: '/assets/js/main.js', as: 'script' }
  ],
  
  // Resources to prefetch
  prefetch: [
    // Rotas principais
    { rel: 'prefetch', href: '/dashboard' },
    { rel: 'prefetch', href: '/tasks' },
    { rel: 'prefetch', href: '/calendar' },
    { rel: 'prefetch', href: '/shopping' },
    // Recursos não críticos
    { rel: 'prefetch', href: '/assets/js/charts.js' },
    { rel: 'prefetch', href: '/assets/js/forms.js' }
  ],
  
  // DNS prefetch para domínios externos
  dnsPrefetch: [
    'https://api.ordohub.com',
    'https://cdn.ordohub.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
}

// Configuração de compressão
export const compression = {
  // Gzip
  gzip: {
    algorithm: 'gzip',
    ext: '.gz',
    threshold: 1024, // 1KB
    deleteOriginFile: false
  },
  
  // Brotli (melhor compressão)
  brotli: {
    algorithm: 'brotliCompress',
    ext: '.br',
    threshold: 1024,
    deleteOriginFile: false,
    params: {
      // Parâmetro de qualidade Brotli
      14: 11 // BROTLI_PARAM_QUALITY
    }
  }
}

// Configuração de lazy loading
export const lazyLoading = {
  // Componentes para lazy loading
  components: [
    'ChartComponent',
    'CalendarView',
    'FileUploader',
    'ImageGallery',
    'AdvancedSettings',
    'ReportsPage',
    'AnalyticsChart'
  ],
  
  // Rotas para lazy loading
  routes: [
    '/admin',
    '/reports',
    '/analytics',
    '/settings/advanced',
    '/help',
    '/about'
  ],
  
  // Configuração de loading
  loading: {
    delay: 200, // ms
    timeout: 10000, // 10s
    errorComponent: 'ErrorBoundary',
    loadingComponent: 'LoadingSpinner'
  }
}

// Métricas de performance
export const performanceMetrics = {
  // Core Web Vitals targets
  targets: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    FCP: 1800, // First Contentful Paint (ms)
    TTI: 3800  // Time to Interactive (ms)
  },
  
  // Monitoring
  monitoring: {
    enabled: true,
    reportInterval: 30000, // 30s
    sampleRate: 0.1 // 10% dos usuários
  }
}

export default {
  bundleAnalyzer,
  performanceBudget,
  codeSplitting,
  resourceHints,
  compression,
  lazyLoading,
  performanceMetrics
}
