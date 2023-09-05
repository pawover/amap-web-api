declare namespace AMap {
  namespace TileLayer {
    interface Options extends Layer.Options {
      /**
       * 数据支持的缩放级别范围
       *
       * @default [2,30]
       */
      dataZooms?: [number, number];
      /**
       * 切片取图地址
       * - 如：'https://abc{0,1,2,3}.amap.com/tile?x=[x]&y=[y]&z=[z]'
       * - [x]、[y]、[z] 分别替代切片的xyz。
       */
      tileUrl?: `http://${string}` | `https://${string}`;
      /**
       * 切片大小，取值：
       * - `256`: 表示切片大小为 `256 * 256`
       * - `128`: 表示切片大小为 `128 * 128`
       * - `64`: 表示切片大小为 `64 * 64`
       *
       * @default 256
       */
      tileSize?: number;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 基础图层
   * - 即基础瓦片图层、基础切片图层、普通二维图层
   *
   * @class TileLayer
   * @template O extends Layer.Options = TileLayer.Options
   * @extends {Layer<O>} 抽象类 - 图层
   */
  class TileLayer<O extends Layer.Options = TileLayer.Options> extends Layer<O> {
    /** 图层 - 卫星图像 */
    private static Satellite: typeof Satellite;
    /** 图层 - 实时交通 */
    private static Traffic: typeof Traffic;
    /** 图层 - 路网 */
    private static RoadNet: typeof RoadNet;
    /** 图层 - 灵活切片 */
    private static Flexible: typeof Flexible;
    /** 用于加载 OGC 标准的 WMS 地图服务的一种图层类 */
    private static WMS: typeof WMS;
    /** 用于加载 OGC 标准的 WMTS 地图服务的一种图层类 */
    private static WMTS: typeof WMTS;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?TileLayer.Options} [options] 构造参数
     */
    public constructor(options?: TileLayer.Options);

    /** 获取切片取图地址 */
    public getTileUrl(): `http://${string}` | `https://${string}`;
    /** 设置切片取图地址 */
    public setTileUrl(tileUrl: `http://${string}` | `https://${string}`): void;
  }
}
