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
       * - AMap Web API 2.0 新增属性，目前只适用于 2.0 版本
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
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Center} 中心点
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<Rectangle.Options>} 属性配置
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class Rectangle
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Center,
      GetSet.Cursor,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Options<Rectangle.Options>,
      GetSet.ZIndex
  {
    public getBounds: () => Bounds | undefined;
    public setBounds: (bounds: BoundsLike, immediately?: boolean, avoid?: [number, number, number, number]) => void;

    public getCenter: () => LngLat;
    public setCenter: undefined;

    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    public getOptions: () => Rectangle.Options;
    public setOptions: (options: Rectangle.Options) => void;

    /** @deprecated AMap Web API 2.0 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.0 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Rectangle.Options} options 构造参数
     */
    public constructor(options: Rectangle.Options);

    /** 判断坐标是否在覆盖范围内 */
    public contains(point: LngLatLike): boolean;
    /** 获取原点坐标 */
    public getDeltaCoord(): Vector;
    /** 返回 GeoJSON 形式的数据 */
    public toGeometry(): GeoJSON | undefined;
    /**
     * 返回 GeoJSON 形式的数据
     * @deprecated AMap Web API 2.0 中已废弃
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
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getPath(): ControlPoint[];
    /**
     * 设置矩形路径
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setPath(path?: LngLatLike[] | LngLatLike[][]): void;
  }
}
