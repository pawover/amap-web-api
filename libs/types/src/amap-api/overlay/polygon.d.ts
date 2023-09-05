declare namespace AMap {
  namespace Polygon {
    interface Options extends Overlay.Options, Overlay.PlaneGeometryOptions, Overlay.LineGeometryOptions {
      /** 多边形轮廓线的节点坐标数组
       * - 支持 单个普通多边形 LngLatLike[]，单个带孔多边形 LngLatLike[][]，多个带孔多边形 LngLatLike[][][]
       * - 当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，数组元素为多边形轮廓线的节点坐标数组, “环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理
       */
      path: LngLatLike[] | LngLatLike[][] | LngLatLike[][][];
      /**
       * 设置曲线是否离地绘制
       * - 等于 `0` 时贴地绘制
       * - 大于 `0` 时离地绘制，此时曲线高度等于 `height` 值加曲线起点高程值，可以通过 `getPolylineHeight` 获取当前曲线高度值
       * - AMap Web API 2.x 新增属性，目前只适用于 2.x 版本
       *
       * @default 0.0
       */
      height?: number;
      /**
       * 控制显示属性
       */
      options?: Pick<AMap.Polygon.Options, 'options' | 'map'>;
    }
    interface Events extends EventsCommonProps<Polygon>, EventsDragProps<Polygon> {}
  }

  /**
   * 矢量图形 - 多边形
   *
   * @class Polygon
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<Polygon.Options>} 属性配置
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class Polygon
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<Polygon.Options>,
      Accessor.ZIndex
  {
    public getBounds: Required<Accessor.Bounds>['getBounds'];

    public getCursor: Required<Accessor.Cursor>['getCursor'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getOptions: Required<Accessor.Options<Polygon.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<Polygon.Options>>['setOptions'];

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: Required<Accessor.ZIndex>['getzIndex'];
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: Required<Accessor.ZIndex>['setzIndex'];

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Polygon.Options} options 构造参数
     */
    public constructor(options?: Polygon.Options);

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
    /** 获取多边形的面积
     *
     * @unit 平方米
     * @unitSymbol ㎡
     */
    public getArea(): number;

    /** 获取离地高度 */
    public getExtrusionHeight(): number;
    /** 设置离地高度 */
    public setExtrusionHeight(height: number): void;

    /** 获取多边形轮廓线节点数组 */
    public getPath(): PointLike[] | PointLike[][];
    /** 设置多边形轮廓线节点数组，当为“环”多边形时，path 为二维数组，数组元素为多边形轮廓线的节点坐标数组 */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
