declare namespace AMap {
  namespace Scale {
    interface Options extends Control.Options {}
  }

  /**
   * 地图控件 - 比例尺
   * - 位于地图右下角，用户可控制其显示与隐藏
   *
   * @class Scale
   * @extends {Control} 地图控件基类
   */
  class Scale extends Control {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Scale.Options} [options] 构造参数
     */
    public constructor(options?: Scale.Options);
  }
}
