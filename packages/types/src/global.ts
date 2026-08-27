declare global {
  interface Window {
    AMap?: typeof AMap;
    AMapUI?: typeof AMapUI;
    Loca?: typeof Loca;
    _AMapSecurityConfig: {
      securityJsCode: string | undefined;
      serviceHost: `http${string}://${string}/_AMapService` | undefined;
    };
  }
}

/** 颜色 */
export type Color = string;
