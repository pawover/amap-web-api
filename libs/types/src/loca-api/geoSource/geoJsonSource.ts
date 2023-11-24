declare namespace Loca {
  namespace GeoJSONSource {
    interface Options<G extends GeoJSON = GeoJSON> {
      /**
       * `GeoJSON` 数据源对象
       */
      data?: G | undefined;
      /**
       * 数据源的链接地址
       * - 一般为接口地址，返回的数据必须是 `GeoJSON` 格式
       */
      url?: string | undefined;
    }
  }

  class GeoJSONSource<G extends GeoJSON = GeoJSON> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?GeoJSONSource.Options<G>} [options] 构造参数
     */
    public constructor(options?: GeoJSONSource.Options<G>);

    /** 销毁数据源对象 */
    public destroy(): void;
  }
}
