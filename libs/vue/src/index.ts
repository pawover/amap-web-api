/// <reference types="amap-web-types" />

export * from './amap-api';

declare global {
  /** AMap 地图上下文对象 */
  interface MapContext {
    /** 地图实例 */
    map?: AMap.Map | undefined;
  }

  /** Loca 容器上下文对象 */
  interface LocaContext {
    /** 地图实例 */
    map?: AMap.Map | undefined;
    /** Loca 数据可视化全局对象 */
    Loca?: typeof Loca | undefined;
    /** Loca 的核心控制实例 */
    locaContainer?: Loca.Container | undefined;
  }
}
