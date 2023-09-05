declare namespace AMap {
  namespace Rectangle {
    /** 矩形样式配置参数 */
    interface Options extends Overlay.Options, Overlay.PlaneGeometryOptions, Overlay.LineGeometryOptions {
      /**
       * 矩形的范围
       */
      bounds: Bounds;
      /**
       * 设置曲线是否离地绘制
       * - 等于 `0` 时贴地绘制
       * - 大于 `0` 时离地绘制，此时曲线高度等于 `height` 值加曲线起点高程值，可以通过 `getPolylineHeight` 获取当前曲线高度值
       * - AMap Web API 2.x 新增属性，目前只适用于 2.x 版本
       *
       * @default 0.0
       */
      height?: number;
    }
    interface Events extends EventsCommonProps<Rectangle>, EventsDragProps<Rectangle> {}
  }

  /**
   * 矢量图形 - 矩形
   *
   * @class Rectangle
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Center} 中心点
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<Rectangle.Options>} 属性配置
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class Rectangle
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Center,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<Rectangle.Options>,
      Accessor.ZIndex
  {
    public getBounds: Required<Accessor.Bounds>['getBounds'];
    public setBounds: Required<Accessor.Bounds>['setBounds'];

    public getCenter: Required<Accessor.MapCenter>['getCenter'];

    public getCursor: Required<Accessor.Cursor>['getCursor'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getOptions: Required<Accessor.Options<Rectangle.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<Rectangle.Options>>['setOptions'];

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: Required<Accessor.ZIndex>['getzIndex'];
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: Required<Accessor.ZIndex>['setzIndex'];

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Rectangle.Options} options 构造参数
     */
    public constructor(options?: Rectangle.Options);

    /** 判断坐标是否在覆盖范围内 */
    public contains(point: LngLatLike): boolean;
    /** 获取原点坐标 */
    public getDeltaCoord(): Vector;
    /** 返回 GeoJSON 形式的数据 */
    public toGeometry(): GeoJSON | undefined;
    /**
     * 返回 GeoJSON 形式的数据
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public toGeoJSON(): GeoJSON | undefined;
    /**
     * 获取圆的面积
     * @unit 平方米
     * @unitSymbol ㎡
     */
    public getArea(): number;

    /**
     * 获取矩形路径
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getPath(): ControlPoint[];
    /**
     * 设置矩形路径
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public setPath(path?: LngLatLike[] | LngLatLike[][]): void;
  }
}
