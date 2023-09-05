/** 索引键类型 */
type Key = string | number | symbol;
/** 索引对象类型 */
type Recordable<K extends Key = Key, T = unknown> = Record<K, T>;
/** 描述对象类型 */
interface Obj<T = any> {
  [key: Key]: T;
}
/** 描述函数类型 */
type Fn = (...args: any[]) => unknown;

/** RGB */
type RGB = `rgb(${string},${string},${string})`;
/** RGBA */
type RGBA = `rgba(${string},${string},${string},${number})`;
/** 十六进制 RGB 色 */
type RGB_HEX = `#${string}${string}${string}${string}${string}${string}`;
/** 十六进制 RGBA 色 */
type RGBA_HEX = `#${string}${string}${string}${string}${string}${string}${string}${string}`;
/** COLOR */
type COLOR = RGB | RGBA | RGB_HEX | RGBA_HEX;

interface Window {
  AMap: typeof AMap;
  Loca: typeof Loca;
  AMapUI: typeof AMapUI;
  _AMapSecurityConfig: {
    securityJsCode: string | undefined;
    serviceHost: `http${string}://${string}/_AMapService` | undefined;
  };
}
