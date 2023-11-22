declare namespace AMap {
  namespace LayerGroup {
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
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
     * @param {LayerType[]} options 构造参数
     */
    public constructor(options?: LayerType[]);

    /** 添加单个图层到集合中，不支持添加重复的图层 */
    public addLayer(layer: LayerType): this;
    /** 添加图层数组到集合中，不支持添加重复的图层 */
    public addLayers(layers: LayerType[]): this;
    /** 获取当前集合中所有的图层 */
    public getLayers(): LayerType[];
    /** 返回当前集合中符合条件的图层 */
    public getLayer(fn: (this: null, item: LayerType, index: number, layers: LayerType[]) => boolean): LayerType | null;
    /** 判断传入的图层实例是否在集合中 */
    public hasLayer(
      layer: LayerType | ((this: null, item: LayerType, index: number, layers: LayerType[]) => boolean),
    ): boolean;
    /** 从集合中删除传入的图层实例 */
    public removeLayer(layer: LayerType): this;
    /** 从集合中删除传入的图层实例数组 */
    public removeLayers(layers: LayerType[]): this;
    /** 清空集合 */
    public clearLayers(): this;
    /**
     * 对集合中的图层做迭代操作
     *
     * @public
     * @template C = L
     * @param {(this: C, layers: LayerType, index: number, list: LayerType[]) => void} iterator 迭代回调
     * @param {?C} [context] 执行上下文
     */
    public eachLayer<C = LayerType>(
      iterator: (this: C, layer: LayerType, index: number, list: LayerType[]) => void,
      context?: C,
    ): void;
  }
}
