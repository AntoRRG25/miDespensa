/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // añade aquí tus VITE_ variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}