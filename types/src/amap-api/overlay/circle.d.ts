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
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Center} 中心点
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<Circle.Options>} 属性配置
   * @implements {GetSet.Radius} 半径
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class Circle
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Center,
      GetSet.Cursor,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Options<Circle.Options>,
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

    public getRadius: () => number;
    public setRadius: (radius: number) => void;

    public getOptions: () => Circle.Options;
    public setOptions: (options: Circle.Options) => void;

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Circle.Options} options 构造参数
     */
    public constructor(options?: Circle.Options);

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
