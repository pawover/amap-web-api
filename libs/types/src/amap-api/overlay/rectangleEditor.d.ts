declare namespace AMap {
  namespace RectangleEditor {
    interface Options {
      /** 新建对象构造参数 */
      createOptions?: Rectangle.Options;
      /** 编辑对象样式 */
      editOptions?: Rectangle.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 西南点样式 */
      southWestPoint?: Marker.Options;
      /** 东北点样式 */
      northEastPoint?: Marker.Options;
    }
    interface Events extends EventsEditorProps<Rectangle> {}
  }

  /**
   * 矢量图形编辑器 - 矩形
   *
   * @class RectangleEditor
   * @extends {Event<EditorEventList>} 类 - 地图事件
   */
  class RectangleEditor extends Event<EditorEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {Rectangle} rectangle 矩形实例
     * @param {?RectangleEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, rectangle: Rectangle, options?: RectangleEditor.Options);

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;
    /** 销毁编辑器 */
    public destroy(): void;

    /** 获取编辑对象 */
    public getTarget(): Rectangle | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: Rectangle | undefined): void;
  }
}
