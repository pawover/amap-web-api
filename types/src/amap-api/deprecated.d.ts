declare namespace AMap {
  /**
   * 控制点
   * - 描述地图上的一个位置
   *
   * @deprecated AMap Web API 2.0 中已废弃，请使用 `LngLat` 替代
   */
  interface ControlPoint {
    Q: number;
    R: number;
    lng: number;
    lat: number;
  }
  /**
   * 控制线
   * - 描述地图上的一个路径
   *
   * @deprecated AMap Web API 2.0 中已废弃，请使用 `LngLat` 组成的数组替代
   */
  interface ControlPath {
    Q: number;
    R: number;
    lng: number;
    lat: number;
    controlPoints: ControlPoint[];
  }
}
