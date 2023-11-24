declare namespace AMap {
  namespace Polyline {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions {
      /**
       * 初始折线路径，支持单条、多条折线
       */
      path: (number[] | number[][])[];
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
    /** 矢量图形折线 - 事件 */
    interface Events extends EventCommon<Polyline>, EventDrag<Polyline> {}
  }

  /**
   * 矢量图形 - 折线
   *
   * @class Polyline
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<Polyline.Options>} 属性配置
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class Polyline
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<Polyline.Options>,
      Accessor.ZIndex
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Polyline.Options} options 构造参数
     */
    public constructor(options?: Polyline.Options);

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public CLASS_NAME: "AMap.Polyline";
    public className: "Overlay.Polyline";
    public type: "AMap.Overlay";

    public getBounds: Required<Accessor.Bounds>["getBounds"];

    public getCursor: Required<Accessor.Cursor>["getCursor"];

    public getDraggable: Required<Accessor.Draggable>["getDraggable"];
    public setDraggable: Required<Accessor.Draggable>["setDraggable"];

    public getExtData: Required<Accessor.ExtData>["getExtData"];
    public setExtData: Required<Accessor.ExtData>["setExtData"];

    public getOptions: Required<Accessor.Options<Polyline.Options>>["getOptions"];
    public setOptions: Required<Accessor.Options<Polyline.Options>>["setOptions"];

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: Required<Accessor.ZIndex>["getzIndex"];
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: Required<Accessor.ZIndex>["setzIndex"];

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
     * 获取折线的总长度
     *
     * @unit 米
     * @unitSymbol m
     */
    public getLength(): number;

    /** 获取折线路径 */
    public getPath(): PointLike[] | PointLike[][];
    /** 设置折线路径，支持单条、多条折线 */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
