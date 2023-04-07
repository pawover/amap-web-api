declare namespace AMap {
  namespace Ellipse {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions, Overlay.PlaneGeometryOptions {
      /**
       * 椭圆圆心
       */
      center: LngLatLike;
      /**
       * 椭圆的半径，用2个元素的数组表示，单位：米，如：`radius: [1000, 2000]` 表示横向半径是 1000，纵向的半径是 2000
       *
       * @default [1000,1000]
       */
      radius?: [number, number];
    }
    interface Events extends EventsCommonProps<Ellipse>, EventsDragProps<Ellipse> {}
  }

  /**
   * 矢量图形 - 椭圆形
   *
   * @class Ellipse
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Center} 中心点
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<Ellipse.Options>} 属性配置
   * @implements {GetSet.Radius} 半径
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class Ellipse
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Center,
      GetSet.Cursor,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Options<Ellipse.Options>,
      GetSet.Radius,
      GetSet.ZIndex
  {
    public getBounds: () => Bounds | undefined;
    public setBounds: undefined;

    public getCenter: () => LngLat;
    public setCenter: (center: LngLatLike) => void;

    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    public getOptions: () => Ellipse.Options;
    public setOptions: (options: Ellipse.Options) => void;

    public getRadius: () => number;
    public setRadius: (radius: number) => void;

    /** @deprecated AMap Web API 2.0 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.0 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Ellipse.Options} options 构造参数
     */
    public constructor(options: Ellipse.Options);

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
    /** 设置圆中心点和半径 */
    public setCenterAndRadius(center: LngLatLike, radius: number): void;
    /**
     * 获取路径的节点数组
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getPath(): ControlPath[];
    /**
     * 设置组成该折线的节点数组
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
