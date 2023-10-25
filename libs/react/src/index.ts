/// <reference types="amap-web-types" />

export * from './api-loader';
export * from './amap-api';
export * from './amapUI-api';
export * from './loca-api';

export type ChildNode = React.ReactNode;
export type ChildNodeRender = () => React.ReactNode;
export type ChildNodeType = ChildNode | ChildNodeRender;

declare global {
  /** AMap 地图上下文对象 */
  interface MapContext {
    /** Map 实例 */
    map?: AMap.Map | undefined;
  }

  /** Loca 容器上下文对象 */
  interface LocaContext extends MapContext {
    /** Loca 实例 */
    loca?: Loca.Container | undefined;
  }
}
