// 加载 AMap / AMapUI / Loca 全局类型声明（amap-web-types 是纯 declare global 包，需显式 import 触发 .d.ts 加载）
import "amap-web-types";

export * from "./loader";

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
