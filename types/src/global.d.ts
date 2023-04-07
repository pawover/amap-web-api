interface Window {
  AMap: typeof AMap;
  Loca: typeof Loca;
  AMapUI: typeof AMapUI;
  _AMapSecurityConfig: {
    securityJsCode: string | undefined;
    serviceHost: `http://${string}/_AMapService` | `https://${string}/_AMapService` | undefined;
  };
}
