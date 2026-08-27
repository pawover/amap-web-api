declare global {
  /** 描述函数类型 */
  type Fn = (...args: any[]) => any;

  /** RGB */
  type RGB = `rgb(${string},${string},${string})`;
  /** RGBA */
  type RGBA = `rgba(${string},${string},${string},${number})`;
  /** 十六进制 RGB 色 */
  type RGB_HEX = `#${string}${string}${string}${string}${string}${string}`;
  /** 十六进制 RGBA 色 */
  type RGBA_HEX = `#${string}${string}${string}${string}${string}${string}${string}${string}`;
  /** COLOR */
  type COLOR = string;

  type Replace<S extends string, F extends string, T extends string> = S extends `${infer Left}${F}${infer Right}`
    ? `${Left}${T}${Right}`
    : S;

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

export type AMapWebTypes = true;

