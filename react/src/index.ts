export * from './api-loader';
export * from './amap-api';
export * from './amapUI-api';
export * from './loca-api';

declare global {
  /** AMap 地图上下文对象 */
  interface MapContext {
    /** 高德地图的核心类，JS API 加载完后挂载至全局对象中 */
    AMap?: typeof AMap | undefined;
    /** 地图实例 */
    map?: AMap.Map | undefined;
    /** 地图容器 */
    container?: HTMLDivElement | undefined;
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
