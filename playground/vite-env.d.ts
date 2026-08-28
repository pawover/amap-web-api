/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMAP_AKEY?: string;
  readonly VITE_AMAP_SKEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
