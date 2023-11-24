declare namespace AMap {
  /**
   * AMap Web API - 基础类 - 经纬度
   * - 描述地图上的一个位置
   * - 目前高德地图使用的是 GCJ-02 坐标，如果你采集的是 WGS84 坐标，请先进行坐标转换
   *
   * @example
   * ```js
      const lnglat = new AMap.LngLat(116, 39);
   * ```
   */
  class LngLat {
    public static from(point: LngLatLike): LngLat;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {number} lng 地理经度
     * @param {number} lat 地理纬度
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`; noFix 为 false 时传入 [190,30] ，会被自动修正为 [-170,30] , noFix 为 true 时不会自动修正，可以用来进行跨日期限的覆盖物绘制
     */
    public constructor(lng: number, lat: number, noFix?: boolean);

    /** 类标识 */
    public className: "AMap.LngLat";
    /** 地理经度 */
    public lng: number;
    /** 地理纬度 */
    public lat: number;
    /** 墨卡托坐标 */
    public pos: [number, number];
    public KL: number;
    public KT: number;

    /** 获取经度值 */
    public getLng(): number;
    /** 设置经度值 */
    public setLng(lng: number): void;

    /** 获取纬度值 */
    public getLat(): number;
    /** 设置纬度值 */
    public setLat(lat: number): void;

    /** 判断经纬度坐标和另一个经纬度是否相等 */
    public equals(another: LngLatLike): boolean;
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
     * 计算当前经纬度距离另一个 [位置] 或者 [路径] 的实际距离
     * - 当参数为位置时，计算与位置的距离，当参数为路径时，计算与路径的最小距离
     *
     * @public
     * @param {(LngLatLike | LngLatLike[])} p 位置或路径信息
     * @returns {number} 实际距离，单位：米
     */
    public distance(p: LngLatLike | LngLatLike[]): number;
    /**
     * 计算当前经纬度坐标与另一个经纬度坐标的实际距离
     *
     * @public
     * @param {LngLat} another 另一个经纬度坐标
     * @returns {number} 实际距离，单位：米
     */
    public distanceTo(another: LngLat): number;
    /**
     * 返回与另一个经纬度相加后的经纬度
     *
     * @public
     * @param {LngLatLike} another 另一个经纬度坐标
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 相加后的经纬度
     */
    public add(another: LngLatLike, noFix?: boolean): LngLat;
    /**
     * 返回与另一个经纬度相减后的经纬度
     *
     * @public
     * @param {LngLatLike} another 另一个经纬度坐标
     * @param {?boolean} [noFix] 是否禁止将结果修正到 [-180,180] 区间内，默认 `false`
     * @returns {LngLat} 相减后的经纬度
     */
    public subtract(another: LngLatLike, noFix?: boolean): LngLat;
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
    /** 将 经纬度 以格式如 `[lng, lat]` 的 数组 形式返回 */
    public toArray(): [number, number];
    /** 将 经纬度 以格式如 `[lng, lat]` 的 JSON 形式返回 */
    public toJSON(): number[];
    /** 将 经纬度 以格式如 `lng,lat` 的 字符串 形式返回 */
    public toString(): string;
  }
}
