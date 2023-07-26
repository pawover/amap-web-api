declare namespace AMap {
  namespace BezierCurve {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions {
      /**
       * 贝瑟尔曲线的路径
       * - 描述为一个二维数组规则如下：
       *   - 第一个元素是起点，之后的元素同时描述控制点和途经点，之后每个元素可以有 0 个到 2 个控制点
       *   - 控制点在前，途经点在最后
       * ```js
       * [
       *   [lng, lat],
       *   // 起点0
       *   [lng, lat, lng, lat, lng, lat],
       *   // 控制点、控制点、途经点2
       *   [lng, lat, lng, lat]
       *   // 控制点、途经点3
       * ]
       * ```
       *   - 或者
       * ```js
       * [
       *  [[lng, lat]],
       *  // 起点0
       *  [[lng, lat], [lng, lat]],
       *  // 控制点、途经点1
       *  [[lng, lat], [lng, lat], [lng, lat]],
       *  // 控制点、控制点、途经点2
       *  [[lng, lat], [lng, lat]]
       *  // 控制点、途经点3
       * ]
       * ```
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
    interface Events extends EventsCommonProps<BezierCurve>, EventsDragProps<BezierCurve> {}
  }

  /**
   * 矢量图形 - 贝塞尔曲线
   *
   * @class BezierCurve
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Options<BezierCurve.Options>} 属性配置
   * @implements {GetSet.ZIndex} 叠加层级
   */
  class BezierCurve
    extends Overlay
    implements
      GetSet.Bound,
      GetSet.Draggable,
      GetSet.Cursor,
      GetSet.Options<BezierCurve.Options>,
      GetSet.ExtData,
      GetSet.ZIndex
  {
    public getBounds: () => Bounds | undefined;
    public setBounds: undefined;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    public getOptions: () => BezierCurve.Options;
    public setOptions: (options: BezierCurve.Options) => void;

    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: () => number;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {BezierCurve.Options} options 构造参数
     */
    public constructor(options?: BezierCurve.Options);

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
     * 获取曲线的总长度
     * @unit 米
     * @unitSymbol m
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getLength(): number;
    /**
     * 返回构成曲线的所有控制点信息
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getInterpolateLngLats(): ControlPoint[];
    /**
     * 将 曲线 以格式如 `[[lng, lat, lng, lat]]` 的 JSON 形式返回
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getSerializedPath(): number[] | number[][];

    /** 获取路径的节点数组 */
    public getPath(): [number, number] | [number, number][];
    /**
     * 获取路径的节点数组
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getPath(): ControlPath[];
    /** 设置组成该折线的节点数组 */
    public setPath(path: LngLatLike[] | LngLatLike[][]): void;
  }
}
