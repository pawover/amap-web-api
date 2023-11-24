declare namespace AMap {
  namespace CircleEditor {
    interface Options {
      /** 新建对象构造参数 */
      createOptions?: Circle.Options;
      /** 编辑对象样式 */
      editOptions?: Circle.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 顶点样式 */
      controlPoint?: CircleMarker.Options;
      /** 中间点样式 */
      midControlPoint?: CircleMarker.Options;
      /** 移动点样式 */
      movePoint?: Marker.Options;
      /** 调整点样式 */
      resizePoint?: Marker.Options;
    }
    interface Events extends EventEditor<Circle> {}
  }

  /**
   * 矢量图形编辑器 - 圆形
   *
   * @class CircleEditor
   * @extends {Event<EditorEventType>} 类 - 地图事件
   */
  class CircleEditor extends Event<EditorEventType> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {Circle} circle 圆形实例
     * @param {?CircleEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, circle: Circle, options?: CircleEditor.Options);

    /** 编辑器的编辑状态 */
    public _editing: boolean;

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;
    /** 销毁编辑器 */
    public destroy(): void;

    /** 获取编辑对象 */
    public getTarget(): Circle | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: Circle | undefined): void;
  }
}
