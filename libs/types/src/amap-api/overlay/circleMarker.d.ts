declare namespace AMap {
  namespace CircleMarker {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions, Overlay.PlaneGeometryOptions {
      /**
       * 圆心位置
       */
      center: LngLatLike;
      /**
       * 圆半径
       *
       * @unit 像素
       * @unitSymbol px
       * @max `64`
       */
      radius?: number;
    }
    interface Events extends EventsCommonProps<CircleMarker>, EventsDragProps<CircleMarker> {}
  }

  /**
   * 标记 - 圆形
   *
   * @class CircleMarker
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Center} 中心点
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<CircleMarker.Options>} 属性配置
   * @implements {Accessor.Radius} 半径
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class CircleMarker
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Center,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<CircleMarker.Options>,
      Accessor.Radius,
      Accessor.ZIndex
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {CircleMarker.Options} options 构造参数
     */
    public constructor(options?: CircleMarker.Options);

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public CLASS_NAME: 'AMap.CircleMarker';
    public className: 'Overlay.CircleMarker';
    public type: 'AMap.Overlay';

    public getBounds: Required<Accessor.Bounds>['getBounds'];

    public getCenter: Required<Accessor.MapCenter>['getCenter'];
    public setCenter: Required<Accessor.MapCenter>['setCenter'];

    public getCursor: Required<Accessor.Cursor>['getCursor'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getOptions: Required<Accessor.Options<CircleMarker.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<CircleMarker.Options>>['setOptions'];

    public getRadius: Required<Accessor.Radius>['getRadius'];
    public setRadius: Required<Accessor.Radius>['setRadius'];

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
     * 获取路径的节点数组
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getPath(): PointLike<'controlPoint'>[];
  }
}
