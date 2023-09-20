declare namespace AMap {
  namespace Circle {
    interface Options extends Overlay.Options, Overlay.PlaneGeometryOptions {
      /** 圆心位置 */
      center: LngLatLike;
      /**
       * 圆半径
       *
       * @unit 米
       * @unitSymbol m
       */
      radius?: number;
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
      options?: Pick<AMap.Circle.Options, 'options' | 'map'>;
    }
    interface Events extends EventsCommonProps<Circle>, EventsDragProps<Circle> {}
  }

  /**
   * 矢量图形 - 圆
   *
   * @class Circle
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Center} 中心点
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<Circle.Options>} 属性配置
   * @implements {Accessor.Radius} 半径
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class Circle
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Center,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<Circle.Options>,
      Accessor.Radius,
      Accessor.ZIndex
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Circle.Options} options 构造参数
     */
    public constructor(options?: Circle.Options);

    public className: 'Overlay.Circle';
    public type: 'AMap.Overlay';

    public getBounds: Required<Accessor.Bounds>['getBounds'];

    public getCenter: Required<Accessor.MapCenter>['getCenter'];
    public setCenter: Required<Accessor.MapCenter>['setCenter'];

    public getCursor: Required<Accessor.Cursor>['getCursor'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getRadius: Required<Accessor.Radius>['getRadius'];
    public setRadius: Required<Accessor.Radius>['setRadius'];

    public getOptions: Required<Accessor.Options<Circle.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<Circle.Options>>['setOptions'];

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: Required<Accessor.ZIndex>['getzIndex'];
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: Required<Accessor.ZIndex>['setzIndex'];

    /** 判断坐标是否在覆盖范围内 */
    public contains(point: LngLatLike): boolean;
    /** 获取原点坐标 */
    public getDeltaCoord(): Vector;
    /** 返回 GeoJSON 形式的数据 */
    public toGeometry(): GeoJSON | undefined;

    /**
     * 获取圆的面积
     * @unit 平方米
     * @unitSymbol ㎡
     */
    public getArea(): number;
    /** 设置圆中心点和半径 */
    public setCenterAndRadius(center: LngLatLike, radius: number): void;
    /**
     * 获取路径的节点数组
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getPath(): ControlPath[];
  }
}
