declare namespace AMap {
  namespace BezierCurveEditor {
    interface Options {
      /** 新建对象构造参数 */
      createOptions?: Polyline.Options;
      /** 编辑对象样式 */
      editOptions?: Polyline.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 顶点样式 */
      controlPoint?: Partial<CircleMarker.Options>;
      /** 中间点样式 */
      midControlPoint?: Partial<CircleMarker.Options>;
      /** 贝塞尔控制点样式 */
      bezierControlPoint?: Marker.Options;
      /** 贝塞尔控制线样式 */
      bezierControlLine?: Partial<Polyline.Options>;
    }
    interface Events extends EventsEditorProps<BezierCurve> {}
  }

  /**
   * 矢量图形编辑器 - 贝塞尔曲线
   *
   * @class BezierCurveEditor
   * @extends {Event<EditorEventList>} 类 - 地图事件
   */
  class BezierCurveEditor extends Event<EditorEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {BezierCurve} bezierCurve 贝塞尔曲线实例
     * @param {?BezierCurveEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, bezierCurve: BezierCurve, options?: BezierCurveEditor.Options);

    /** 编辑器的构造参数 */
    public opts: BezierCurveEditor.Options;

    /** 获取控制点构造参数 */
    public getMarkerOptions(): Marker.Options;

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;
    /** 销毁编辑器 */
    public destroy(): void;

    /** 获取编辑对象 */
    public getTarget(): BezierCurve | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: BezierCurve | undefined): void;
  }
}
