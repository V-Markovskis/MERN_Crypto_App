/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_KEY: string;
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
