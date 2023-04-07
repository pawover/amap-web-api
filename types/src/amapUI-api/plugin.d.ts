declare namespace AMapUI {
  /** 高德地图 AMapUI API 组件类型 */
  interface PluginMaps {
    'lib/$': unknown;
    'ui/control/BasicControl': unknown;
    'ui/geo/DistrictCluster': unknown;
    'ui/geo/DistrictExplorer': unknown;
    'ui/misc/MarkerList': unknown;
    'ui/misc/MobiCityPicker': unknown;
    'ui/misc/PathSimplifier': typeof AMapUI.PathSimplifier;
    'ui/misc/PoiPicker': unknown;
    'ui/misc/PointSimplifier': typeof AMapUI.PointSimplifier;
    'ui/misc/PointSimplifr': unknown;
    'ui/misc/PositionPicker': unknown;
    'ui/overlay/AwesomeMarker': unknown;
    'ui/overlay/SimpleInfoWindow': unknown;
    'ui/overlay/SimpleMarker': unknown;
    'ui/overlay/SvgMarker': unknown;
  }
  /** UI 组件列表 */
  const uiMods: (keyof PluginMaps)[];
  /** AMapUI API 版本号 */
  const version: string;
  /** 协议类型 */
  const docProtocol: 'http:' | 'https:';
  /**
   * 加载 UI 组件
   *
   * @template P extends keyof Plugin
   * @param {P[]} plugin UI 组件名
   * @param {?(...args: PluginMaps[P][]) => void} [callback] 回调函数
   */
  function loadUI<P extends keyof PluginMaps>(plugin: P[], callback?: (...args: PluginMaps[P][]) => void): void;
  /**
   * 加载 UI 组件
   *
   * @template P extends keyof Plugin
   * @param {P[]} plugin UI 组件名
   * @param {?(...args: PluginMaps[P][]) => void} [callback] 回调函数
   * @param {?unknown} [Options] 配置参数
   */
  function load<P extends keyof PluginMaps>(
    plugin: P[],
    callback?: (...args: PluginMaps[P][]) => void,
    Options?: unknown,
  ): void;
}
