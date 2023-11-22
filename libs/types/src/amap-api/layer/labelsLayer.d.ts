declare namespace AMap {
  namespace LabelsLayer {
    interface Options extends Layer.Options {
      /**
       * 标注层内的标注是否互相避让
       *
       * @default true
       */
      collision?: boolean;
      /**
       * 是否开启动画效果
       *
       * @default true
       * @deprecated AMap Web API 2.x 中已废弃
       */
      animation?: boolean;
      /**
       * 标注层内的标注是否允许其它标注层对它避让，开启该功能可实现地图标注对 `LabelMarker` 的避让
       *
       * @default false
       */
      allowCollision?: boolean;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - 文字
   *
   * @class LabelsLayer
   * @extends {Layer<LabelsLayer.Options>} 抽象类 - 图层
   */
  class LabelsLayer extends Layer<LabelsLayer.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {LabelsLayer.Options} options 构造参数
     */
    public constructor(options?: LabelsLayer.Options);

    /** 将 labelMarker 添加到标注层上 */
    public add(labelMarkers: LabelsLayer[]): void;
    /** 将 labelMarker 从标注层上移除 */
    public remove(labelMarkers: LabelsLayer | LabelsLayer[]): void;
    /** 清空标注层上的标注 */
    public clear(): void;
    /** 获取标注层内的所有标注对象 */
    public getAllOverlays<R extends OverlayType = OverlayType>(): R[];

    /** 获取标注层是否支持内部标注避让 */
    public getCollision(): boolean;
    /** 设置标注层是否支持内部标注避让 */
    public setCollision(collision: boolean): void;

    /** 获取标注层是否允许其它层标注避让 */
    public getAllowCollision(): boolean;
    /** 设置标注层是否允许其它层标注避让，开启该功能可实现地图标注对 LabelMarker 的避让，[相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/labelsmarker) */
    public setAllowCollision(allowCollision: boolean): void;
  }
}
