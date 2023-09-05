declare namespace AMap {
  namespace BezierCurve {
    interface Options extends Overlay.Options, Overlay.LineGeometryOptions {
      /**
       * 贝塞尔曲线路径
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
    interface Events extends EventsCommonProps<BezierCurve>, EventsDragProps<BezierCurve> {}
  }

  /**
   * 矢量图形 - 贝塞尔曲线
   *
   * @class BezierCurve
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Options<BezierCurve.Options>} 属性配置
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class BezierCurve
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Options<BezierCurve.Options>,
      Accessor.ZIndex
  {
    public getBounds: Required<Accessor.Bounds>['getBounds'];

    public getCursor: Required<Accessor.Cursor>['getCursor'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getOptions: Required<Accessor.Options<BezierCurve.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<BezierCurve.Options>>['setOptions'];

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public getzIndex: Required<Accessor.ZIndex>['getzIndex'];
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public setzIndex: Required<Accessor.ZIndex>['setzIndex'];

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
