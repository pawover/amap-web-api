declare namespace AMap {
  namespace WMS {
    interface Options extends TileLayer.Options {
      /** wms 服务的 url 地址，如：'https://ahocevar.com/geoserver/wms' */
      url: string;
      /** 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为 `false` */
      blend?: boolean;
      /**
       * OGC 标准的 WMS 地图服务的 GetMap 接口的参数
       * @deprecated AMap Web API 2.0 中已废弃
       */
      param?: {
        VERSION?: string;
        LAYERS?: string;
        STYLES?: string;
        FORMAT?: string;
        TRANSPARENT?: string;
      };
    }
  }

  /**
   * 用于加载 OGC 标准的 WMS 地图服务的一种图层类
   * - 仅支持 EPSG3857 坐标系统的 WMS 图层
   * - 查看 [WMS 的 OGC标准](https://www.ogc.org/standards/wms)
   *
   * @class WMS
   * @extends {TileLayer} 基础图层
   */
  class WMS extends TileLayer<WMS.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {WMS.Options} options 构造参数
     */
    public constructor(options: WMS.Options);

    /**
     * 获取 OGC 标准的接口的参数，包括 VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT 等
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getParams(): unknown;
    /**
     * 设置 OGC 标准的接口的参数，包括 VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT 等
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setParams(params: unknown): void;

    /**
     * 获取服务的 url 地址
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getUrl(): string;
    /**
     * 设置服务的 url 地址
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setUrl(url: string): void;
  }
}
