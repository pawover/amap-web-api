declare namespace AMap {
  /** AMap Web API 1.x 版本号 */
  const v: string;
  /** AMap Web API 2.x 版本号 */
  const version: string;
  /** DOM */
  const DOM: string;
  /** @deprecated AMap Web API 2.x 中已废弃 */
  const CANVAS: string;

  /** 创建默认底图图层 */
  function createDefaultLayer(): NebulaLayer | TileLayer;

  /** 坐标转换方法 */
  namespace ConvertFrom {
    type Type = 'gps' | 'baidu' | 'mapbar';
    type SearchStatus = 'complete' | 'error';
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 高德坐标集合 */
      locations: PointLike[];
    }
  }

  /**
   * 坐标转换
   * - 将其他地图服务商的坐标批量转换成高德地图经纬度坐标
   * - 最多支持 40 对坐标
   *
   * @param {(LngLatLike | LngLatLike[])} lnglat 需要转换的坐标
   * @param {(ConvertFrom.Type | null)} type 服务商
   * @param {((status: ConvertFrom.SearchStatus, result: string | ConvertFrom.Result) => void)} callback 转换完成的回调函数
   */
  function convertFrom(
    lnglat: LngLatLike | LngLatLike[],
    type: ConvertFrom.Type | null,
    callback: (status: ConvertFrom.SearchStatus, result: string | ConvertFrom.Result) => void,
  ): void;

  /** 埋点方法 */
  namespace BuryPoint {
    /** 添加埋点 */
    const add: Fn;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    const addOptions: Fn;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    const ya: Fn;
  }
}
