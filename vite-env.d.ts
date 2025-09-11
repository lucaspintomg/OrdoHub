/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Vite Environment Variables
interface ImportMetaEnv {
  // Servidor
  readonly VITE_PORT: string
  readonly VITE_HMR_PORT: string
  readonly VITE_PREVIEW_PORT: string
  
  // API
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_WEBSOCKET_URL: string
  
  // App
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: string
  
  // Features
  readonly VITE_FEATURE_PWA: string
  readonly VITE_FEATURE_ANALYTICS: string
  readonly VITE_FEATURE_NOTIFICATIONS: string
  readonly VITE_FEATURE_OFFLINE_MODE: string
  readonly VITE_FEATURE_REAL_TIME: string
  
  // Auth
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_AUTH_CLIENT_ID: string
  readonly VITE_AUTH_AUDIENCE: string
  
  // Integrations
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  
  // OrdoHub specific
  readonly ORDOHUB_FAMILY_MAX_MEMBERS: string
  readonly ORDOHUB_HOUSEHOLD_MAX_ROOMS: string
  readonly ORDOHUB_TASK_MAX_ASSIGNEES: string
  readonly ORDOHUB_FILE_UPLOAD_TYPES: string
  readonly ORDOHUB_SESSION_TIMEOUT: string
  readonly ORDOHUB_AUTO_SAVE_INTERVAL: string
  
  // Debug
  readonly VITE_DEBUG_MODE: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_SHOW_DEV_TOOLS: string
  readonly VITE_MOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global constants injected by Vite
declare const __DEV__: boolean
declare const __PROD__: boolean
declare const __TEST__: boolean
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string

// PWA Types
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export {}
