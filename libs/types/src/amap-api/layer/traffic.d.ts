declare namespace AMap {
  namespace Traffic {
    interface Options extends TileLayer.Options {
      /**
       * 是否自动更新数据
       *
       * @default true
       */
      autoRefresh?: boolean;
      /**
       * 自动更新数据的间隔毫秒数
       *
       * @unit 毫秒
       * @unitSymbol ms
       * @default 180
       */
      interval?: number;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - 实时交通
   *
   * @class Traffic
   * @extends {TileLayer<Traffic.Options>} 基础图层
   */
  class Traffic extends TileLayer<Traffic.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Traffic.Options} [options] 构造参数
     */
    public constructor(options?: Traffic.Options);

    /**
     * 停止自动更新数据
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public stopFresh(): void;
  }
}
