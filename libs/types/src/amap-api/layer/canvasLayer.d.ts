declare namespace AMap {
  namespace CanvasLayer {
    interface Options extends MediaLayer.Options {
      /** Canvas DOM 对象 */
      canvas?: HTMLCanvasElement;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - Canvas
   * - 将一个 Canvas 作为图层添加在地图上，Canvas 图层会随缩放级别而自适应缩放
   *
   * @class CanvasLayer
   * @extends {MediaLayer<CanvasLayer.Options, HTMLCanvasElement>} 抽象类 - 媒体图层
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Options<CanvasLayer.Options>} 属性配置
   */
  class CanvasLayer
    extends MediaLayer<CanvasLayer.Options, HTMLCanvasElement>
    implements Accessor.Bounds, Accessor.Options<CanvasLayer.Options>
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?CanvasLayer.Options} [options] 构造参数
     */
    public constructor(options?: CanvasLayer.Options);

    public getBounds: Required<Accessor.Bounds>["getBounds"];
    public setBounds: Required<Accessor.Bounds>["setBounds"];

    /**
     * 获取图层配置参数
     * - 相比 `getLayerConfig` 更完整
     */
    public getOptions: Required<Accessor.Options<CanvasLayer.Options>>["getOptions"];

    /** 获取图层构造参数 */
    public getLayerConfig(): CanvasLayer.Options;
    /** 获取图层配置参数 */
    public getSourceConfig(): CanvasLayer.Options;

    /** 设置显示的 Canvas DOM 对象 */
    public setCanvas(canvas: HTMLCanvasElement): void;
    /** 当 canvas 的内容发生改变是用于刷新图层 */
    public reFresh(): void;
  }
}
