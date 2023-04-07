declare namespace AMap {
  /**
   * 工具 - 鼠标工具
   * - 通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能
   *
   * @class MouseTool
   */
  class MouseTool extends Event<ToolEventList> {
    /** 所属地图实例 */
    public _map: Map;
    /** 仅 AMap Web API 2.0 */
    public overlays: {
      circle: Circle[];
      marker: Marker[];
      measureArea: Polygon[];
      polygon: Polygon[];
      polyline: Polyline[];
      rectangle: Rectangle[];
    };

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Map} map 地图实例
     */
    public constructor(map: Map);

    /**
     * 关闭当前鼠标操作
     *
     * @public
     * @param {?boolean} [isClear] `true`: 关闭鼠标操作的同时清除地图上绘制的所有覆盖物对象；`false`: 保留所绘制的覆盖物对象
     * @default false
     */
    public close(isClear?: boolean): void;
    /**
     * 开启鼠标画点标注模式
     * - 鼠标在地图上单击绘制点标注
     *
     * @public
     * @param {?Partial<Marker.Options>} options 标注样式设置
     */
    public marker(options?: Partial<Marker.Options>): void;
    /**
     * 开启鼠标画折线模式
     * - 鼠标在地图上点击绘制折线，鼠标左键双击或右键单击结束绘制
     *
     * @public
     * @param {?Partial<Polyline.Options>} options 折线样式设置
     */
    public polyline(options?: Partial<Polyline.Options>): void;
    /**
     * 开启鼠标画多边形模式
     * - 鼠标在地图上单击开始绘制多边形，鼠标左键双击或右键单击结束当前多边形的绘制
     *
     * @public
     * @param {?Partial<Polygon.Options>} options 多边形样式设置
     */
    public polygon(options?: Partial<Polygon.Options>): void;
    /**
     * 开启鼠标画矩形模式
     * - 鼠标在地图上拉框即可绘制相应的矩形
     *
     * @public
     * @param {?Partial<Rectangle.Options>} options 矩形样式设置
     */
    public rectangle(options?: Partial<Rectangle.Options>): void;
    /**
     * 开启鼠标画圆模式
     * - 鼠标在地图上拖动绘制相应的圆形
     *
     * @public
     * @param {?Partial<Circle.Options>} options 圆形样式设置
     */
    public circle(options?: Partial<Circle.Options>): void;
    /**
     * 开启距离量测模式
     * - 鼠标在地图上单击绘制量测节点，并计算显示两两节点之间的距离，鼠标左键双击或右键单击结束当前量测操作
     * - 不能同时使用 rule 方法和 RangTool 插件进行距离量测
     *
     * @public
     * @param options 量测线样式设置
     */
    public rule(options?: {
      lineOptions?: Partial<Polygon.Options>;
      startMarkerOptions?: Marker.Options;
      midMarkerOptions?: Marker.Options;
      endMarkerOptions?: Marker.Options;
    }): void;
    /**
     * 开启面积量测模式
     * - 鼠标在地图上单击绘制量测区域，鼠标左键双击或右键单击结束当前量测操作，并显示本次量测结果
     *
     * @public
     * @param {?Partial<Polygon.Options>} [options] 量测面样式设置
     */
    public measureArea(options?: Partial<Polygon.Options>): void;
    /**
     * 开启鼠标拉框放大模式
     * - 鼠标可在地图上拉框放大地图
     *
     * @public
     * @param {?Partial<Polygon.Options>} options 矩形框样式设置
     */
    public rectZoomIn(options?: Partial<Polygon.Options>): void;
    /**
     * 开启鼠标拉框缩小模式
     * - 鼠标可在地图上拉框缩小地图
     *
     * @public
     * @param {?Partial<Polygon.Options>} options 矩形框样式设置
     */
    public rectZoomOut(options?: Partial<Polygon.Options>): void;
  }
}
