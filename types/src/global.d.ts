/** 索引类型 */
declare type Key = string | number | symbol;
/** 索引对象类型 */
declare type Recordable<K extends Key = Key, T = unknown> = Record<K, T>;

/** RGB */
declare type RGB = `rgb(${string},${string},${string})`;
/** RGBA */
declare type RGBA = `rgba(${string},${string},${string},${number})`;
/** 十六进制 RGB 色 */
declare type RGB_HEX = `#${string}${string}${string}${string}${string}${string}`;
/** 十六进制 RGBA 色 */
declare type RGBA_HEX = `#${string}${string}${string}${string}${string}${string}${string}${string}`;
/** COLOR */
declare type COLOR = RGB | RGBA | RGB_HEX | RGBA_HEX;

interface Window {
  AMap: typeof AMap;
  Loca: typeof Loca;
  AMapUI: typeof AMapUI;
  _AMapSecurityConfig: {
    securityJsCode: string | undefined;
    serviceHost: `http://${string}/_AMapService` | `https://${string}/_AMapService` | undefined;
  };
}
