import type { PlainObject } from "@pawover/kit-types";

declare global {
  namespace AMapUI {
    interface LibPlugins {
      "lib/$": PlainObject;
      "lib/utils": AMapUI.Utils;
    }
    interface UIPlugins {
      "control/BasicControl": PlainObject;
      "geo/DistrictCluster": PlainObject;
      "geo/DistrictExplorer": PlainObject;
      "misc/MarkerList": PlainObject;
      "misc/MobiCityPicker": PlainObject;
      "misc/PathSimplifier": typeof AMapUI.PathSimplifier;
      "misc/PoiPicker": PlainObject;
      "misc/PointSimplifier": typeof AMapUI.PointSimplifier;
      "misc/PointSimplifr": PlainObject;
      "misc/PositionPicker": PlainObject;
      "overlay/AwesomeMarker": PlainObject;
      "overlay/SimpleInfoWindow": PlainObject;
      "overlay/SimpleMarker": PlainObject;
      "overlay/SvgMarker": PlainObject;
    }

    /** UI 组件列表 */
    const uiMods: (keyof Omit<UIPlugins, "lib/$">)[];
    /** AMapUI API 版本号 */
    const version: string;
    /** 协议类型 */
    const docProtocol: "http:" | "https:";
    /**
   * 加载 AMapUI UI 模块
   *
   * @template P extends keyof UIPlugins
   * @param {P[]} plugin AMapUI UI 模块名
   * @param {?(...args: UIPlugins[P][]) => void} [callback] 回调函数
   */
    function loadUI<P extends keyof UIPlugins> (plugin: P[], callback?: (...args: UIPlugins[P][]) => void): void;
    /**
   * 加载 AMapUI 模块
   *
   * @template {`ui/${keyof UIPlugins}` | keyof LibPlugins} P
   * @param {P[]} plugin 模块名
   * @param {?(...args: (UIPlugins & LibPlugins)[Replace<P, 'ui/', ''>][]) => void} [callback] 回调函数
   * @param {?unknown} [Options] 配置参数
   */
    function load<P extends `ui/${keyof UIPlugins}` | keyof LibPlugins> (
      plugin: P[],
      callback?: (...args: (UIPlugins & LibPlugins)[Replace<P, "ui/", "">][]) => void,
      Options?: unknown,
    ): void;
  }

}

export {};

