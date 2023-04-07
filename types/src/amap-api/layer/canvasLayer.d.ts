declare namespace AMap {
  namespace CanvasLayer {
    interface Options extends MediaLayer.Options {
      /** Canvas DOM 对象 */
      canvas?: HTMLCanvasElement;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - Canvas
   * - 将一个 Canvas 作为图层添加在地图上，Canvas 图层会随缩放级别而自适应缩放
   *
   * @class CanvasLayer
   * @extends {MediaLayer<CanvasLayer.Options, HTMLCanvasElement>} 抽象类 - 媒体图层
   * @implements {GetSet.Bound} 覆盖范围
   */
  class CanvasLayer extends MediaLayer<CanvasLayer.Options, HTMLCanvasElement> implements GetSet.Bound {
    public getBounds: () => Bounds | undefined;
    public setBounds: (bounds: BoundsLike, immediately?: boolean, avoid?: [number, number, number, number]) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?CanvasLayer.Options} [options] 构造参数
     */
    public constructor(options?: CanvasLayer.Options);

    /** 获取图层构造参数 */
    public getLayerConfig(): CanvasLayer.Options;
    /** 获取图层配置参数 */
    public getSourceConfig(): CanvasLayer.Options;
    /**
     * 获取图层配置参数
     * - 相比 `getLayerConfig` 更完整
     */
    public getOptions(): CanvasLayer.Options;

    /** 设置显示的 Canvas DOM 对象 */
    public setCanvas(canvas: HTMLCanvasElement): void;
    /** 当 canvas 的内容发生改变是用于刷新图层 */
    public reFresh(): void;
  }
}
