declare namespace AMap {
  namespace EllipseEditor {
    interface Options {
      /** 新建对象构造参数 */
      createOptions?: Ellipse.Options;
      /** 编辑对象样式 */
      editOptions?: Ellipse.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 移动点样式 */
      movePoint?: Marker.Options;
      /** X轴调整点样式 */
      resizeXPoint?: Marker.Options;
      /** Y轴调整点样式 */
      resizeYPoint?: Marker.Options;
    }
    interface Events extends EventsEditorProps<Ellipse> {}
  }

  /**
   * 矢量图形编辑器 - 椭圆形
   *
   * @class EllipseEditor
   * @extends {Event<EditorEventList>} 类 - 地图事件
   */
  class EllipseEditor extends Event<EditorEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {Ellipse} ellipse 椭圆形实例
     * @param {?EllipseEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, ellipse: Ellipse, options?: EllipseEditor.Options);

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;
    /** 销毁编辑器 */
    public destroy(): void;

    /** 获取编辑对象 */
    public getTarget(): Ellipse | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: Ellipse | undefined): void;
  }
}
