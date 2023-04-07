declare namespace AMap {
  namespace MarkerShape {
    interface Options {
      /**
       * 可点击区域组成元素数组，存放图形的像素坐标等信息，该数组元素由 type 决定
       * - `circle` : 圆形，coords 格式为 `[x1, y1, r]`，x1，y1 为圆心像素坐标，r为圆半径
       * - `poly` : 多边形，coords 格式为 `[x1, y1, x2, y2 … xn, yn]`，各 x，y 表示多边形边界像素坐标
       * - `rect` : 矩形, coords 格式为 `[x1, y1, x2, y2]`，x1，y1 为矩形左上角像素坐标，x2，y2 为矩形右下角像素坐标
       * - MarkShape 的像素坐标是指相对于 marker 的左上角的像素坐标偏移量
       */
      coords?: number[];
      /**
       * 可点击区域类型，可选值：
       * - `circle` : 圆形
       * - `poly` : 多边形
       * - `rect` : 矩形
       */
      type?: 'circle' | 'poly' | 'rect';
    }
  }

  /**
   * 划定 Marker 的可点击区域范围
   * - 自定义区域和 Marker 重叠的部分，可以触发 Marker 的点击事件
   * - 在 IE浏览器 中图标透明区域默认为不触发事件，因此 MarkerShape 在 IE 中不起作用
   *
   * @deprecated AMap Web API 2.0 中已废弃
   * @class MarkerShape
   */
  class MarkerShape {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {MarkerShape.Options} options 构造参数
     */
    public constructor(options: MarkerShape.Options);
  }
}
