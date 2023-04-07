declare namespace AMap {
  namespace LayerGroup {
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 群组
   */
  class LayerGroup extends Layer<Layer.Options, OverlayEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Layers[]} options 构造参数
     */
    public constructor(options: Layers[]);

    /** 添加单个图层到集合中，不支持添加重复的图层 */
    public addLayer(layer: Layers): this;
    /** 添加图层数组到集合中，不支持添加重复的图层 */
    public addLayers(layers: Layers[]): this;
    /** 获取当前集合中所有的图层 */
    public getLayers(): Layers[];
    /** 返回当前集合中符合条件的图层 */
    public getLayer(fn: (this: null, item: Layers, index: number, layers: Layers[]) => boolean): Layers | null;
    /** 判断传入的图层实例是否在集合中 */
    public hasLayer(layer: Layers | ((this: null, item: Layers, index: number, layers: Layers[]) => boolean)): boolean;
    /** 从集合中删除传入的图层实例 */
    public removeLayer(layer: Layers): this;
    /** 从集合中删除传入的图层实例数组 */
    public removeLayers(layers: Layers[]): this;
    /** 清空集合 */
    public clearLayers(): this;
    /**
     * 对集合中的图层做迭代操作
     *
     * @public
     * @template C = L
     * @param {(this: C, layers: Layers, index: number, list: Layers[]) => void} iterator 迭代回调
     * @param {?C} [context] 执行上下文
     */
    public eachLayer<C = Layers>(
      iterator: (this: C, layer: Layers, index: number, list: Layers[]) => void,
      context?: C,
    ): void;
  }
}
