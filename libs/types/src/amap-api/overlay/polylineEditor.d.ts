declare namespace AMap {
  namespace PolylineEditor {
    interface Options {
      /** 新建对象构造参数 */
      createOptions?: Polyline.Options;
      /** 编辑对象样式 */
      editOptions?: Polyline.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 顶点样式 */
      controlPoint?: Partial<CircleMarker.Options>;
      /** 中间点样式 */
      midControlPoint?: Partial<CircleMarker.Options>;
    }
    interface Events extends EventsEditorProps<Polyline> {}
  }

  /**
   * 矢量图形编辑器 - 折线
   *
   * @class PolylineEditor
   * @extends {Event<EditorEventList>} 类 - 地图事件
   */
  class PolylineEditor extends Event<EditorEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {Polyline} polyline 折线实例
     * @param {?PolylineEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, polyline: Polyline, options?: PolylineEditor.Options);

    /** 要显示编辑器的地图实例 */
    public _map: Map | null;
    /** 编辑器的编辑状态 */
    public _editing: boolean;
    /** 编辑器的属性配置 */
    public _customStyle: Polyline.Options;
    /** 编辑器的默认样式 */
    public _defaultStyle: PolylineEditor.Options['editOptions'];
    /** 当前正在编辑的折线 */
    public _poly: Polyline;

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;
    /** 销毁编辑器 */
    public destroy(): void;

    /** 获取编辑对象 */
    public getTarget(): Polyline | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: Polyline | undefined): void;
  }
}
