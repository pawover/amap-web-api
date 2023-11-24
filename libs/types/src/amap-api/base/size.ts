declare namespace AMap {
  /**
   * AMap Web API - 基础类 - 像素尺寸
   * - 像素尺寸由 `width` 和 `height` 两个分量构成，通常用来描述具有一定大小的对象，比如地图的尺寸，图标的尺寸等
   *
   * @example
   * ```js
      const size = new AMap.Size(40, 50)
   * ```
   */
  class Size {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {number} width 宽度
     * @param {number} height 高度
     * @param {?boolean} [round] 是否将结果通过四舍五入取整，默认 `false`
     */
    public constructor(width: number, height: number, round?: boolean);

    /** 类标识 */
    public className: "AMap.Size";
    /** 像素宽度 */
    public width: number;
    /** 像素高度 */
    public height: number;

    /** 获取像素宽度 */
    public getWidth(): number;
    /** 获取像素高度 */
    public getHeight(): number;
    /** 将 像素尺寸 以格式如 `[width, height]` 的 数组 形式返回 */
    public toArray(): [number, number];
    /** 将 像素尺寸 以格式如 `width,height` 的 字符串 形式返回 */
    public toString(): string;
  }
}
