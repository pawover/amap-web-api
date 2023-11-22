declare namespace AMap {
  /**
   * AMap Web API - 基础类 - 像素点
   * - 描述地图上的一个像素点
   * - 像素点由 `x` 和 `y` 两个分量组成，通常用来描述地图的容器坐标、地理像素坐标 (平面像素坐标)、点标记和信息窗体的的锚点等
   *
   * @example
   * ```js
      const offset = new AMap.Pixel(-15, -30);
   * ```
   */
  class Pixel {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {number} x 横坐标
     * @param {number} y 纵坐标
     * @param {?boolean} [round] 是否将结果通过四舍五入取整，默认 `false`
     */
    public constructor(x: number, y: number, round?: boolean);

    /** 类标识 */
    public className: "AMap.Pixel";
    /** 像素横坐标 */
    public x: number;
    /** 像素纵坐标 */
    public y: number;

    /** 获取像素横坐标 */
    public getX(): number;
    /** 获取像素纵坐标 */
    public getY(): number;

    /** 判断和另一个像素点是否相等 */
    public equals(pixel: Pixel): boolean;
    /** 计算像素点相对于容器原点坐标 `[0, 0]` 的角度，当像素点位于容器原点时，返回 null */
    public direction(): number | null;
    /** 将像素点四舍五入取整后返回 */
    public round(): Pixel;
    /**
     * 返回与另一个像素点相减后的像素点
     *
     * @public
     * @param {Pixel} another 另一个像素点
     * @param {?boolean} [round] 是否将结果通过四舍五入取整，默认 `false`
     * @returns {Pixel} 相减后的像素点
     */
    public subtract(another: Pixel, round?: boolean): Pixel;
    /**
     * 将像素点放大 n 倍后返回
     *
     * @public
     * @param {number} n 放大倍数
     * @param {?boolean} [round] 是否将结果通过四舍五入取整，默认 `false`
     * @returns {Pixel} 放大后的经纬度
     */
    public multiplyBy(n: number, round?: boolean): Pixel;
    /** 将 像素点 以格式如 `[x, y]` 的 数组 形式返回 */
    public toArray(): [number, number];
    /** 将 像素点 以格式如 `[x, y]` 的 JSON 形式返回 */
    public toJSON(): number[];
    /** 将 像素点 以格式如 `x,y` 的 字符串 形式返回 */
    public toString(): string;
  }
}
