declare namespace AMapUI {
  /** 高德地图 AMapUI API 组件类型 */
  interface PluginMaps {
    'lib/$': unknown;
    'control/BasicControl': unknown;
    'geo/DistrictCluster': unknown;
    'geo/DistrictExplorer': unknown;
    'misc/MarkerList': unknown;
    'misc/MobiCityPicker': unknown;
    'misc/PathSimplifier': typeof AMapUI.PathSimplifier;
    'misc/PoiPicker': unknown;
    'misc/PointSimplifier': typeof AMapUI.PointSimplifier;
    'misc/PointSimplifr': unknown;
    'misc/PositionPicker': unknown;
    'overlay/AwesomeMarker': unknown;
    'overlay/SimpleInfoWindow': unknown;
    'overlay/SimpleMarker': unknown;
    'overlay/SvgMarker': unknown;
  }
  /** UI 组件列表 */
  const uiMods: (keyof Omit<PluginMaps, 'lib/$'>)[];
  /** AMapUI API 版本号 */
  const version: string;
  /** 协议类型 */
  const docProtocol: 'http:' | 'https:';
  /**
   * 加载 AMapUI 组件
   *
   * @template P
   * @param {P[]} plugin AMapUI 组件名
   * @param {?(...args: PluginMaps[P][]) => void} [callback] 回调函数
   */
  function loadUI<P extends keyof Omit<PluginMaps, 'lib/$'>>(
    plugin: P[],
    callback?: (...args: PluginMaps[P][]) => void,
  ): void;
  /**
   * 加载 AMapUI 插件
   *
   * @template P extends keyof Plugin
   * @param {P[]} plugin UI 插件名
   * @param {?(...args: PluginMaps[P][]) => void} [callback] 回调函数
   * @param {?unknown} [Options] 配置参数
   */
  function load<P extends keyof PluginMaps>(
    plugin: P[],
    callback?: (...args: PluginMaps[P][]) => void,
    Options?: unknown,
  ): void;
}
