declare namespace AMap {
  namespace VectorLayer {
    interface Options extends Layer.Options {}
  }

  /**
   * 图层 - 矢量覆盖物
   * - 可添加/删除/查询矢量覆盖物的图层
   *
   * @class VectorLayer
   * @template VectorOverlay extends OverlayType
   * @extends {Layer<VectorLayer.Options>} 抽象类 - 图层
   */
  class VectorLayer extends Layer<VectorLayer.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?VectorLayer.Options} [options] 构造参数
     */
    public constructor(options?: VectorLayer.Options);

    /** 添加矢量覆盖物到集合中，不支持添加重复的覆盖物 */
    public add(vectors: OverlayType | OverlayType[]): void;
    /** 删除矢量覆盖物 */
    public remove(vectors: OverlayType | OverlayType[]): void;
    /** 清空矢量覆盖物 */
    public clear(): void;
    /** 判断图层中是否已存在矢量覆盖物 */
    public has(vector: OverlayType): boolean;
    /** 根据经纬度查询矢量覆盖物信息 */
    public query(geometry: LngLatLike): OverlayType | undefined;
    /** 获取所有覆盖物显示的范围 */
    public getBounds(): Bounds;
  }
}
