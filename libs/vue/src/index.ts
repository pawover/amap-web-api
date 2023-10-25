/// <reference types="amap-web-types" />

export * from './amap-api';

declare global {
  /** AMap 地图上下文对象 */
  interface MapContext {
    /** Map 实例 */
    map?: AMap.Map | undefined;
  }

  /** Loca 容器上下文对象 */
  interface LocaContext extends MapContext {
    /** Loca 实例 */
    locaContainer?: Loca.Container | undefined;
  }
}
