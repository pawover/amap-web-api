declare namespace AMap {
  namespace ToolBar {
    interface Options extends Control.Options {}
  }

  /**
   * 地图控件 - 缩放工具条
   * - 可支持方向导航、位置定位、视野级别缩放、视野级别选择等操作
   *
   * @class ToolBar
   * @extends {Control} 地图控件基类
   */
  class ToolBar extends Control {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?ToolBar.Options} [options] 构造参数
     */
    public constructor(options?: ToolBar.Options);
  }
}
