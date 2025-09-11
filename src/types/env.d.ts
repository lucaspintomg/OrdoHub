// Environment Variables Type Declarations

declare global {
  const __DEV__: boolean
  const __PROD__: boolean
  const __APP_VERSION__: string
}

// Node.js Environment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    VITE_APP_TITLE: string
    VITE_APP_VERSION: string
    VITE_API_URL: string
    VITE_API_TIMEOUT: string
    VITE_WEBSOCKET_URL: string
    VITE_ENABLE_ANALYTICS: string
    VITE_SENTRY_DSN: string
    VITE_APP_ENV: 'development' | 'staging' | 'production'
  }
}

export {}
