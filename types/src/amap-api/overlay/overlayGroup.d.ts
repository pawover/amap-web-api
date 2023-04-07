declare namespace AMap {
  /**
   * 群组 - 覆盖物
   *
   * @class OverlayGroup
   * @template T extends OverlayEventList
   * @implements {GetSet.Maps} 所属地图
   */
  class OverlayGroup<T extends OverlayEventList> implements GetSet.Maps {
    /** 要显示群组的地图实例 */
    public _map: Map;
    /** 群组中的覆盖物列表 */
    public _overlays: Overlays[];

    public getMap: undefined;
    public setMap: (map: Map | null) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Overlays[]} overlays 覆盖物集合
     */
    public constructor(overlays: Overlays[]);

    /** 添加单个覆盖物到集合中，不支持添加重复的覆盖物 */
    public addOverlay(overlay: Overlays): void;
    /** 添加覆盖物数组到集合中，不支持添加重复的覆盖物 */
    public addOverlays(overlays: Overlays[]): void;
    /** 获取当前集合中所有的覆盖物 */
    public getOverlays(): Overlays[];
    /** 判断传入的覆盖物实例是否在集合中 */
    public hasOverlay(
      overlay: Overlays | ((this: null, item: Overlays, index: number, overlays: Overlays[]) => boolean),
    ): boolean;
    /** 从集合中删除传入的覆盖物实例 */
    public removeOverlay(overlay: Overlays): this;
    /** 从集合中删除传入的覆盖物实例数组 */
    public removeOverlays(overlays: Overlays[]): this;
    /** 清空集合 */
    public clearOverlays(): this;
    /**
     * 对集合中的覆盖物做迭代操作
     *
     * @public
     * @template C = O
     * @param {(this: C, overlay: Overlays, index: number, overlays: Overlays[]) => void} iterator 迭代回调
     * @param {?C} [context] 执行上下文
     */
    public eachOverlay<C = Overlays>(
      iterator: (this: C, overlay: Overlays, index: number, overlays: Overlays[]) => void,
      context?: C,
    ): void;

    public setOptions(options: Overlays[]): void;

    /**
     * 添加事件监听函数
     *
     * @public
     * @param {T} type 事件名称
     * @param {(event: MapsEvent<T>) => void} callback 回调函数
     */
    public on(type: T, callback: (event: MapsEvent<T, unknown>) => void): void;
    /**
     * 移除事件监听函数
     *
     * @public
     * @param {T} type 事件名称
     * @param {(event: MapsEvent<T>) => void} callback 回调函数
     */
    public off(type: T, callback: (event: MapsEvent<T, unknown>) => void): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;
  }
}
