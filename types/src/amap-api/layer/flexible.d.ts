declare namespace AMap {
  namespace Flexible {
    interface Options extends TileLayer.Options {
      /**
       * 缓存瓦片数量
       */
      cacheSize?: Number;
      /**
       * 由开发者实现，由API自动调用，xyz分别为切片横向纵向编号和层级，切片大小 256
       * - 假设每次创建的贴片为A(支持img或者canvas)，当创建或者获取成功时请回调success(A)，不需要显示或者失败时请回调fail()
       */
      createTile?: (x: number, y: number, z: number, success: () => void, fail: () => void) => void;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 灵活切片
   * - 通过构造时传入 `createTile` 字段可指定每一个切片的内容
   *
   * @class Flexible
   * @extends {TileLayer<Flexible.Options>} 基础图层
   */
  class Flexible extends TileLayer<Flexible.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Flexible.Options} [options] 构造参数
     */
    public constructor(options?: Flexible.Options);
  }
}
