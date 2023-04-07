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
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Center} 中心点
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<CircleMarker.Options>} 属性配置
   * @implements {GetSet.Radius} 半径
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class CircleMarker
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Center,
      GetSet.Cursor,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Options<CircleMarker.Options>,
      GetSet.Radius,
      GetSet.ZIndex
  {
    public getBounds: () => Bounds | undefined;
    public setBounds: undefined;

    public getCenter: () => LngLat;
    public setCenter: (center: LngLatLike) => void;

    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    public getOptions: () => CircleMarker.Options;
    public setOptions: (options: CircleMarker.Options) => void;

    public getRadius: () => number;
    public setRadius: (radius: number) => void;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    /** @deprecated AMap Web API 2.0 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.0 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {CircleMarker.Options} options 构造参数
     */
    public constructor(options: CircleMarker.Options);

    /** 判断坐标是否在覆盖范围内 */
    public contains(point: LngLatLike): boolean;
    /** 获取原点坐标 */
    public getDeltaCoord(): Vector;
    /** 返回 GeoJSON 形式的数据 */
    public toGeometry(): GeoJSON | undefined;

    /**
     * 获取路径的节点数组
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getPath(): ControlPath[];
  }
}
