declare namespace AMap {
  namespace RoadNet {
    interface Options extends TileLayer.Options {}
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - 路网
   *
   * @class RoadNet
   * @extends {TileLayer<RoadNet.Options>} 基础图层
   */
  class RoadNet extends TileLayer<RoadNet.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?RoadNet.Options} [options] 构造参数
     */
    public constructor(options?: RoadNet.Options);
  }
}
