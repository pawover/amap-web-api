declare namespace Loca {
  namespace LabelsLayer {
    interface Options extends Layer.Options {
      /**
       * 是否避让标注
       *
       * @default true
       */
      collision?: boolean;
      /**
       * 是否允许其它标注层对标注避让
       * - 开启该功能可实现地图标注对 `LabelMarker` 的避让
       *
       * @default true
       */
      allowCollision?: boolean;
    }
    interface StyleOptions extends AMap.LabelMarker.Options {}
  }

  /**
   * 图层 - 标注
   *
   * @class LabelsLayer
   * @template {GeoJSON} [G=GeoJSON]
   * @extends {Layer<G, LabelsLayer.StyleOptions>} 抽象类 - 图层
   */
  class LabelsLayer<G extends GeoJSON = GeoJSON> extends Layer<G, LabelsLayer.StyleOptions> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?LabelsLayer.Options} [options] 构造参数
     */
    public constructor(options?: LabelsLayer.Options);

    /** 获取图层标注 */
    public getLabelsLayer(): AMap.LabelsLayer | null;
    /** 获取图层基础设置 */
    public getLayerOptions(): { opacity: number; zooms: [number, number]; visible: boolean; zIndex: number };
    /** 获取初始动画状态 */
    public getInitialAnimateState(): Recordable;
    /** 清除图层动画效果，恢复初始状态 */
    public clearAnimate(): void;

    /** 获取标注层是否支持内部标注避让 */
    public getCollision(): boolean;
    /** 设置标注层是否支持内部标注避让 */
    public setCollision(collision: boolean): void;

    /** 获取标注层是否允许其它层标注避让 */
    public getAllowCollision(): boolean;
    /** 设置标注层是否允许其它层标注避让 */
    public setAllowCollision(allowCollision: boolean): void;
  }
}
