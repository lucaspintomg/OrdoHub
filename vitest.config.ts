/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      // Configuração específica para testes
      tsDecorators: true,
    }),
  ],

  // TypeScript específico para testes
  esbuild: {
    target: 'es2022',
    jsx: 'automatic',
    jsxImportSource: 'react',
  },

  // Path aliases sincronizados com vite.config.ts
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/app': resolve(__dirname, './src/app'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/modules': resolve(__dirname, './src/modules'),
      '@/entities': resolve(__dirname, './src/entities'),
      '@/shared': resolve(__dirname, './src/shared'),
      '@/infrastructure': resolve(__dirname, './src/infrastructure'),
      '@/components': resolve(__dirname, './src/shared/ui/components'),
      '@/ui': resolve(__dirname, './src/shared/ui'),
      '@/hooks': resolve(__dirname, './src/shared/hooks'),
      '@/utils': resolve(__dirname, './src/shared/utils'),
      '@/lib': resolve(__dirname, './src/shared/lib'),
      '@/types': resolve(__dirname, './src/shared/types'),
      '@/constants': resolve(__dirname, './src/shared/constants'),
      '@/config': resolve(__dirname, './src/shared/config'),
      '@/api': resolve(__dirname, './src/shared/api'),
      '@/assets': resolve(__dirname, './src/shared/assets'),
      '@/store': resolve(__dirname, './src/app/store'),
      '@/providers': resolve(__dirname, './src/app/providers'),
      '@/styles': resolve(__dirname, './src/shared/ui/styles'),
    },
  },

  // Configuração do Vitest
  test: {
    // Environment
    environment: 'jsdom',

    // Setup files
    setupFiles: [
      './src/shared/config/test/setup.ts',
      './src/shared/config/test/mocks.ts',
    ],

    // Globals
    globals: true,

    // Include/Exclude patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],

    exclude: [
      'node_modules',
      'dist',
      'build',
      '.next',
      'coverage',
      '**/*.d.ts',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],

    // Test timeout
    testTimeout: 20000,
    hookTimeout: 10000,

    // Retry configuration
    retry: 2, // Retry failed tests up to 2 times

    // Pool options
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },

    // Reporter configuration
    reporters: ['verbose', 'json', 'html'],

    // Output options
    outputFile: {
      json: './coverage/test-results.json',
      html: './coverage/test-results.html',
    },

    // Coverage configuration
    coverage: {
      // Provider
      provider: 'v8',

      // Include patterns
      include: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,ts,jsx,tsx}',
        '!src/**/*.test.{js,ts,jsx,tsx}',
        '!src/**/*.spec.{js,ts,jsx,tsx}',
      ],

      // Exclude patterns
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        'coverage/',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.d.ts',
        'src/**/*.config.{js,ts}',
        'src/**/*.stories.{js,ts,jsx,tsx}',
        'src/shared/config/test/**',
        'src/shared/assets/**',
        'src/**/__mocks__/**',
        'src/**/__fixtures__/**',
        'src/**/__tests__/**',
        'src/**/mocks/**',
        'src/**/fixtures/**',
      ],

      // Thresholds
      thresholds: {
        global: {
          branches: 75,
          functions: 75,
          lines: 80,
          statements: 80,
        },
        // Thresholds específicos por arquivo/diretório
        'src/shared/utils/**': {
          branches: 90,
          functions: 90,
          lines: 95,
          statements: 95,
        },
        'src/shared/hooks/**': {
          branches: 85,
          functions: 85,
          lines: 90,
          statements: 90,
        },
      },

      // Reports
      reporter: [
        'text',
        'text-summary',
        'html',
        'lcov',
        'json',
        'json-summary',
        'clover',
      ],

      // Output directory
      reportsDirectory: './coverage',

      // Clean coverage on each run
      clean: true,

      // All files flag
      all: true,

      // Skip full coverage
      skipFull: false,

      // Watermarks
      watermarks: {
        statements: [75, 90],
        functions: [75, 90],
        branches: [75, 90],
        lines: [75, 90],
      },
    },

    // Watch configuration
    watch: true,

    // Mock configuration
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,

    // Snapshot configuration
    snapshotFormat: {
      printBasicPrototype: false,
      escapeString: true,
    },

    // Environment variables for tests
    env: {
      NODE_ENV: 'test',
      VITE_APP_NAME: 'OrdoHub Test',
      VITE_APP_ENVIRONMENT: 'test',
    },

    // CSS handling
    css: {
      modules: {
        classNameStrategy: 'stable',
      },
    },

    // Benchmark configuration
    benchmark: {
      include: ['**/*.{bench,benchmark}.{js,ts,jsx,tsx}'],
      exclude: ['node_modules', 'dist'],
      reporters: ['default'],
    },

    // Isolate tests
    isolate: true,

    // Pass with no tests
    passWithNoTests: true,

    // Silent console in tests (set to false for debugging)
    silent: false,

    // Update snapshots
    update: false,

    // Bail configuration
    bail: 0, // Continue running tests even if some fail
  },
})
