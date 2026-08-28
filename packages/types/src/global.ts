declare global {
  interface Window {
    AMap?: typeof AMap;
    AMapUI?: typeof AMapUI;
    Loca?: typeof Loca;
    _AMapSecurityConfig: {
      securityJsCode: string | undefined;
      serviceHost: `http${string}://${string}/_AMapService` | undefined;
    };
    ___onAPILoaded?: (err?: string) => void;
  }
}

/** 颜色 */
export type Color = string;
