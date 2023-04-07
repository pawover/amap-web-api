declare namespace AMap {
  namespace ControlBar {
    interface Options extends Control.Options {
      /**
       * 是否显示倾斜、旋转按钮
       *
       * @default true
       */
      showControlButton?: boolean;
    }
  }

  /**
   * 地图控件 - 控制条
   * - 组合了旋转、倾斜、复位在内的地图控件
   *
   * @class ControlBar
   * @extends {Control} 地图控件基类
   */
  class ControlBar extends Control {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?ControlBar.Options} [options] 构造参数
     */
    public constructor(options?: ControlBar.Options);
  }
}
