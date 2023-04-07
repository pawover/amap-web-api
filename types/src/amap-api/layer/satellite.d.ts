declare namespace AMap {
  namespace Satellite {
    interface Options extends TileLayer.Options {}
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 卫星图像
   *
   * @class Satellite
   * @extends {TileLayer<Satellite.Options>} 基础图层
   */
  class Satellite extends TileLayer<Satellite.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Satellite.Options} [options] 构造参数
     */
    public constructor(options?: Satellite.Options);
  }
}
