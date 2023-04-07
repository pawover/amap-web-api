declare namespace Loca {
  namespace GeoJSONSource {
    interface Options {
      /**
       * `GeoJSON` 数据源对象
       */
      data?: GeoJSON;
      /**
       * 数据源的链接地址
       * - 一般为接口地址，返回的数据必须是 `GeoJSON` 格式
       *
       * @default '''
       */
      url?: string;
    }
  }

  class GeoJSONSource {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?GeoJSONSource.Options} [options] 构造参数
     */
    public constructor(options?: GeoJSONSource.Options);

    /** 销毁数据源对象 */
    public destroy(): void;
  }
}
