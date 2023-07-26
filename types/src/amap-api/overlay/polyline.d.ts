declare namespace AMap {
  namespace Polyline {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions {
      /**
       * 初始折线路径，支持单条、多条折线
       */
      path: LngLatLike[] | LngLatLike[][];
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
    interface Events extends EventsCommonProps<Polyline>, EventsDragProps<Polyline> {}
  }

  /**
   * 矢量图形 - 折线
   *
   * @class Polyline
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<Polyline.Options>} 属性配置
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class Polyline
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Cursor,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Options<Polyline.Options>,
      GetSet.ZIndex
  {
    public getBounds: () => Bounds | undefined;
    public setBounds: undefined;

    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    public getOptions: () => Polyline.Options;
    public setOptions: (options: Polyline.Options) => void;

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Polyline.Options} options 构造参数
     */
    public constructor(options?: Polyline.Options);

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
    public getPath(): LngLat[] | LngLat[][];
    /** 设置折线路径，支持单条、多条折线 */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
