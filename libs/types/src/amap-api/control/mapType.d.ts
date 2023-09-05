declare namespace AMap {
  namespace MapType {
    interface Options {
      /**
       * 初始化默认图层类型。`0`：默认底图，`1`：卫星图
       *
       * @default 0
       */
      defaultType?: 0 | 1;
      /**
       * 叠加实时交通图层
       *
       * @default false
       */
      showTraffic?: boolean;
      /**
       * 叠加路网图层
       *
       * @default false
       */
      showRoad?: boolean;
      /**
       * 位置
       */
      position?: { top?: string; right?: string; bottom?: string; left?: string };
    }
  }

  /**
   * 地图控件 - 地图类型切换
   * - 用户通过该插件进行地图切换
   *
   * @class MapType
   * @extends {Control} 地图控件基类
   */
  class MapType extends Control {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?MapType.Options} [options] 构造参数
     */
    public constructor(options?: MapType.Options);
  }
}
