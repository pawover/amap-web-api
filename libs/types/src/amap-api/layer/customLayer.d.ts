declare namespace AMap {
  namespace CustomLayer {
    interface Options extends Layer.Options {
      /**
       * 是否主动渲染
       *
       * @default false
       */
      alwaysRender?: boolean;
      /**
       * 自定义 canvas 绘制函数
       * - 初始化完成时候，开发者需要给该图层设定 render 方法，该方法需要实现图层的绘制，API 会在合适的时机自动调用该方法
       */
      render?: Fn;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - 自定义
   *
   * @class CustomLayer
   * @extends {Layer<CustomLayer.Options>} 抽象类 - 媒体图层
   */
  class CustomLayer extends Layer<CustomLayer.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {HTMLCanvasElement} canvas 容器
     * @param {?CustomLayer.Options} [options] 构造参数
     */
    public constructor(canvas: HTMLCanvasElement, options?: CustomLayer.Options);
  }
}
