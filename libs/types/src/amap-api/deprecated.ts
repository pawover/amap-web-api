declare namespace AMap {
  /**
   * 控制点
   * - 描述地图上的一个位置
   *
   * @class ControlPoint
   * @deprecated AMap Web API 2.x 中已废弃，请使用 `LngLat` 替代
   */
  class ControlPoint {
    public constructor(...args: any[]);

    public Q: number;
    public R: number;
    public lng: number;
    public lat: number;

    /** 获取经度值 */
    public getLng(): number;

    /** 获取纬度值 */
    public getLat(): number;

    /**
     * 返回与另一个经纬度相加后的经纬度
     *
     * @public
     * @param {LngLatLike} another 另一个经纬度坐标
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 相加后的经纬度
     */
    public add(another: LngLatLike, noFix?: boolean): LngLat;
    /** 判断经纬度坐标和另一个经纬度是否相等 */
    public equals(another: LngLatLike): boolean;
    /**
     * 计算当前经纬度距离另一个 [位置] 或者 [路径] 的实际距离
     * - 当参数为位置时，计算与位置的距离，当参数为路径时，计算与路径的最小距离
     *
     * @public
     * @param {(LngLatLike | LngLatLike[])} p 位置或路径信息
     * @returns {number} 实际距离，单位：米
     */
    public distance(p: LngLatLike | LngLatLike[]): number;
    /**
     * 将经纬度缩小 n 倍后返回
     *
     * @public
     * @param {number} n 缩小倍数
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 缩小后的LngLat对象
     */
    public divideBy(n: number, noFix?: boolean): LngLat;
    /**
     * 将经纬度放大 n 倍后返回
     *
     * @public
     * @param {number} n 放大倍数
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 放大后的经纬度
     */
    public multiplyBy(n: number, noFix?: boolean): LngLat;
    /**
     * 返回从当前经纬度向东移动 E 米，向北移动 N 米后的坐标位置
     *
     * @public
     * @param {number} E 经度方向移动，向东为正
     * @param {number} N 维度方向移动，向北为正
     * @returns {LngLat}
     */
    public offset(E: number, N: number): LngLat;
    /**
     * 返回与另一个经纬度相减后的经纬度
     *
     * @public
     * @param {LngLatLike} another 另一个经纬度坐标
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 相减后的经纬度
     */
    public subtract(another: LngLatLike, noFix?: boolean): LngLat;
  }

  /**
   * 控制线
   * - 描述地图上的一个路径
   *
   * @deprecated AMap Web API 2.x 中已废弃，请使用 `LngLat` 组成的数组替代
   */
  interface ControlPath {
    Q: number;
    R: number;
    lng: number;
    lat: number;
    controlPoints: ControlPoint[];
  }
}
