declare namespace AMap {
  /**
   * AMap Web API - 基础类 - 经纬度矩形边界
   *
   * @example
   * ```js
   *  const southWest = new AMap.LngLat(110, 20);
      const northEast = new AMap.LngLat(120, 30);
      const bounds = new AMap.Bounds(southWest, northEast);
   * ```
   */
  class Bounds {
    public static from(bounds: Bounds[]): Bounds;
    public static fromPolyline(originPath?: LngLatLike[]): Bounds | undefined;
    public static fromMultiPolyline(originPath?: LngLatLike[][]): Bounds | undefined;
    public static fromPolygon(originPath?: LngLatLike[] | LngLatLike[][]): Bounds | undefined;
    public static fromMultiPolygon(originPath?: LngLatLike[][][]): Bounds | undefined;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {LngLatLike} southWest 西南角经纬度
     * @param {LngLatLike} northEast 东北角经纬度值
     */
    public constructor(southWest: LngLatLike, northEast: LngLatLike);

    /** 类标识 */
    public className: "AMap.Bounds";
    /** 西南角经纬度 */
    public northEast: PointLike;
    /** 东北角经纬度 */
    public southWest: PointLike;

    /** 判断坐标是否在覆盖范围内 */
    public contains(lnglat: LngLatLike): boolean;
    /** 复制当前 Bounds */
    public clone(): Bounds;
    /** 扩展另一个 Bounds 对象，将坐标最大值应用于返回的新 Bounds */
    public extend(bounds: BoundsLike): Bounds;
    /** 获取当前 Bounds 的中心点经纬度坐标 */
    public getCenter(): PointLike;
    /** 获取当前 Bounds 跨越的经度值 */
    public getWidth(): number;
    /** 获取当前 Bounds 跨越的纬度值 */
    public getHeight(): number;
    /** 获取东北角坐标 */
    public getNorthEast(): PointLike;
    /** 获取西北角坐标 */
    public getNorthWest(): PointLike;
    /** 获取东南角坐标 */
    public getSouthEast(): PointLike;
    /** 获取西南角坐标 */
    public getSouthWest(): PointLike;
    /** 是否与另一个 Bounds 对象相交 */
    public intersects(bounds: BoundsLike): boolean;
    /** 将当前 Bounds 与另一个 Bounds 合并 (会改变另一个 Bounds ) */
    public union(bounds: BoundsLike): Bounds;
    /** 将 矩形范围 以格式如 `[lng, lat, lng, lat]` 的 JSON 形式返回 */
    public toJSON(): number[];
    /** 将 矩形范围 以格式如 `lng,lat;lng,lat` 的 字符串 形式返回 */
    public toString(): string;
  }
}
