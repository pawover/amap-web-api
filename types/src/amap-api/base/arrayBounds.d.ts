declare namespace AMap {
  /**
   * AMap Web API - 基础类 - 经纬度路径边界
   *
   * @deprecated AMap Web API 2.x 中已废弃
   */
  class ArrayBounds {
    /** 扩展另一个 Bounds 对象，将坐标最大值应用于返回的新 Bounds */
    public static extend(bounds: BoundsLike): Bounds;
    /** 扩展另一个 Bounds 对象，将坐标最大值应用于 Bounds */
    public static include(bounds: BoundsLike): void;
    /** 类标识 */
    public readonly CLASS_NAME: 'AMap.ArrayBounds';

    public Td: any[];
    /** 经纬度路径 */
    public path: LngLatLike[];
    /** 经纬度路径范围 */
    public bounds: BoundsLike[];

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {BoundsLike[]} bounds 路径边界范围
     */
    public constructor(bounds: BoundsLike[]);

    /** 判断坐标是否在覆盖范围内 */
    public contains(lnglat: LngLatLike): boolean;
  }
}
