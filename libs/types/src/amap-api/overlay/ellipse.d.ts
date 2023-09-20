declare namespace AMap {
  namespace Ellipse {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions, Overlay.PlaneGeometryOptions {
      /**
       * 椭圆圆心
       */
      center: LngLatLike;
      /**
       * 椭圆的半径，用2个元素的数组表示，单位：米
       * - 如：`radius: [1000, 2000]` 表示横向半径是 1000，纵向的半径是 2000
       */
      radius: [number, number];
    }
    interface Events extends EventsCommonProps<Ellipse>, EventsDragProps<Ellipse> {}
  }

  /**
   * 矢量图形 - 椭圆形
   *
   * @class Ellipse
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Center} 中心点
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<Ellipse.Options>} 属性配置
   * @implements {Accessor.Radius} 半径
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class Ellipse
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Center,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<Ellipse.Options>,
      Accessor.Radius,
      Accessor.ZIndex
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Ellipse.Options} options 构造参数
     */
    public constructor(options?: Ellipse.Options);

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public CLASS_NAME: 'AMap.Ellipse';
    public className: 'Overlay.Ellipse';
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

    public getOptions: Required<Accessor.Options<Ellipse.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<Ellipse.Options>>['setOptions'];

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
    /** 设置圆中心点和半径 */
    public setCenterAndRadius(center: LngLatLike, radius: number): void;
    /** 获取路径的节点数组 */
    public getPath(): PointLike[];
    /**
     * 设置组成该折线的节点数组
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
