declare namespace AMapUI {
  namespace PathNavigator {
    interface Options {
      /**
       * 是否循环
       *
       * @default false
       */
      loop?: boolean;
      /**
       * 巡航速度，单位：千米/小时
       *
       * @default 1000
       */
      speed?: number;
      /**
       * 巡航器的样式
       */
      pathNavigatorStyle?: PathSimplifier.RenderOptions<unknown>['pathNavigatorStyle'];
      /**
       * 动画触发的间隔，单位：毫秒
       * - 该值只是建议性质，较大的间隔有助于降低资源消耗，但同时也会降低动画的流畅度，通常情况下保持原值即可
       *
       * @default 16
       */
      animInterval?: number;
      /**
       * 该值会影响巡航器行进中的方向指向，单位：毫秒
       * - [相关参考](https://lbs.amap.com/api/amap-ui/reference-amap-ui/mass-data/pathsimplifier#PathNavigator)
       *
       * @default 200
       */
      dirToPosInMillsecs?: number;
      /**
       * 巡航路径的节点索引范围，默认整条路径
       *
       * @default [0,路径长度-1]
       */
      range?: number[];
    }
  }

  /**
   * 轨迹巡航器
   *
   * @class PathNavigator
   * @template DataItem
   */
  class PathNavigator<DataItem> {
    /** 巡航器编号 */
    public id: number;
    /** 巡航器状态 */
    public type: PathNavigatorEventList;
    /** 巡航光标状态 */
    public cursor: { idx: number; tail: number };
    /** 巡航器的路径节点索引范围 */
    public idxRange: [number, number];

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PathNavigator.Options} [options] 构造参数
     */
    public constructor(options?: PathNavigator.Options);

    /**
     * 开始路径巡航
     * - 参数默认为节点索引范围 `range` 的最小值，如果是浮点类型，则整数部分表示起始点索引，小数部分表示起始点和下一节点间的比例位置
     * - 如 `7.5` 就表示 7 ~ 8 的中间位置
     *
     * @public
     * @param {?number} [index] 用于指定巡航的起始节点索引
     */
    public start(index?: number): void;
    /** 暂停巡航 */
    public pause(): void;
    /** 恢复巡航 */
    public resume(): void;
    /** 停止巡航，并清除已经过路径 */
    public stop(): void;
    /** 销毁巡航器，巡航作为动画过程是非常耗费性能的，因此不再需要时应及时销毁 */
    public destroy(): void;
    /**
     * 返回当前所处的索引位置
     *
     * @public
     * @returns {{ idx: number; tail: number }} `idx`: 节点索引，`tail`：至下一个节点的比例位置
     */
    public getCursor(): { idx: number; tail: number };
    /**
     * 返回巡航状态
     * - `'stop'` 停止状态，start 之前或者 stop 之后处于该状态
     * - `'moving'` 巡航状态，start 或者 resume 之后处于该状态
     * - `'pause'` 暂停状态，pause 之后处于该状态
     *
     * @public
     * @returns {('stop' | 'moving' | 'pause')} 巡航状态
     */
    public getNaviStatus(): 'stop' | 'moving' | 'pause';
    /**
     * 获取巡航路径的轨迹索引
     * - 即创建（createPathNavigator）时 传入的第一个参数
     */
    public getPathIndex(): number;
    /** 获取当前位置的经纬度 */
    public getPosition(): AMap.PointLike;
    /** 获取巡航器的速度 */
    public getSpeed(): number;
    /** 设置巡航器的速度 */
    public setSpeed(speed: number): void;
    /** 设定巡航器的路径节点索引范围 */
    public setRange(startIndex: number, endIndex: number): void;
    /**
     * 巡航经过的距离
     * - 起始节点到当前位置，单位：米
     * - stop 后会重置为 `0`
     */
    public getMovedDistance(): number;
    /** 获取巡航路径的起始节点索引 */
    public getPathStartIdx(): number;
    /** 获取巡航路径的结束节点索引 */
    public getPathEndIdx(): number;
    /** 将巡航器移动指定的距离，单位：米 */
    public moveByDistance(distance: number): number;
    /**
     * 将巡航器移动到指定的节点索引位置
     *
     * @public
     * @param {number} idx 节点索引
     * @param {number} tail 至下一个节点的比例位置
     * @returns {number}
     */
    public moveToPoint(idx: number, tail: number): number;
    /** 判断巡航光标是否处于轨迹起始节点 */
    public isCursorAtPathStart(): boolean;
    /** 判断巡航光标是否处于轨迹结束节点 */
    public isCursorAtPathEnd(): boolean;

    /**
     * 添加事件绑定
     *
     * @public
     * @param {PathNavigatorEventList} eventName 事件名称
     * @param {Function} callback 回调函数
     */
    public on(
      eventName: PathNavigatorEventList,
      callback: (
        obj: { type: PathNavigatorEventList; target: PathNavigator<DataItem> },
        info: {
          tail: number;
          dataItem: { type: string; pathIndex: number; pointIndex: number; pathData: DataItem[] };
          nextDataItem: { type: string; pathIndex: number; pointIndex: number; pathData: DataItem[] };
        },
      ) => void,
    ): void;
    /**
     * 解除事件绑定
     *
     * @public
     * @param {(PathNavigatorEventList)} eventName 事件名称
     * @param {Fn} callback 回调函数
     */
    public off(eventName: PathNavigatorEventList, callback: Fn): void;
  }
}
