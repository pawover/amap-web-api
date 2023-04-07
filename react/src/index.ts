export * from './api-loader';
export * from './amap-api';
export * from './amapUI-api';
export * from './loca-api';

declare global {
  type List<A = unknown> = ReadonlyArray<A>;
  type Length<L extends List> = L['length'];
  type Tail<L extends List> = L extends readonly [] ? L : L extends readonly [unknown?, ...infer LTail] ? LTail : L;
  type Last<L extends List> = L[Length<Tail<L>>];
  type Cast<A1, A2> = A1 extends A2 ? A1 : A2;
  type Pop<L extends List> = L extends readonly [...infer LBody, unknown] | readonly [...infer LBody, unknown?]
    ? LBody
    : L;
  type __Split<S extends string, D extends string, T extends string[] = []> = S extends `${infer BS}${D}${infer AS}`
    ? __Split<AS, D, [...T, BS]>
    : [...T, S];
  type _Split<S extends string, D extends string = ''> = D extends '' ? Pop<__Split<S, D>> : __Split<S, D>;
  type Split<S extends string, D extends string = ''> = _Split<S, D> extends infer X ? Cast<X, string[]> : never;

  /** AMap 地图上下文对象 */
  interface MapContext {
    /** 高德地图的核心类，JS API 加载完后挂载至全局对象中 */
    AMap?: typeof AMap | undefined;
    /** 地图实例 */
    map?: AMap.Map | undefined;
    /** 地图容器 */
    container?: HTMLDivElement | null;
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

  /** AMapUI 插件 */
  namespace AMapUIRecord {
    let plugin: {
      [K in keyof AMapUI.PluginMaps as Capitalize<Last<Split<string & K, '/'>>>]?: AMapUI.PluginMaps[K];
    };
  }
}
