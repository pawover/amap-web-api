declare namespace AMap {
  namespace WMTS {
    interface Options extends WMS.Options {}
  }

  /**
   * 用于加载 OGC 标准的 WMTS 地图服务的一种图层类
   * - 仅支持 EPSG3857 坐标系统的 WMTS 图层
   * - 查看 [WMTS 的 OGC 标准](https://www.ogc.org/standards/wmts)
   *
   * @class WMTS
   * @extends {WMS} 用于加载 OGC 标准的 WMS 地图服务的一种图层类
   */
  class WMTS extends WMS {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {WMTS.Options} options 构造参数
     */
    public constructor(options: WMTS.Options);

    /** 获取图层构造参数 */
    public getLayerConfig(): WMTS.Options;
    /** 获取图层配置参数 */
    public getSourceConfig(): WMTS.Options;
    /** 获取图层配置参数 */
    public getOptions(): WMTS.Options;
  }
}
