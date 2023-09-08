declare namespace AMap {
  /**
   * 群组 - 覆盖物
   *
   * @class OverlayGroup
   * @template T extends OverlayEventList
   * @implements {Accessor.Map} 所属地图
   */
  class OverlayGroup<T extends OverlayEventList> implements Accessor.Map {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {OverlayType[]} overlays 覆盖物集合
     */
    public constructor(overlays: OverlayType[]);

    /** 要显示群组的地图实例 */
    public _map: Map;
    /** 群组中的覆盖物列表 */
    public _overlays: OverlayType[];

    public setMap: Required<Accessor.Map>['setMap'];

    /** 添加单个覆盖物到集合中，不支持添加重复的覆盖物 */
    public addOverlay(overlay: OverlayType): void;
    /** 添加覆盖物数组到集合中，不支持添加重复的覆盖物 */
    public addOverlays(overlays: OverlayType[]): void;
    /** 获取当前集合中所有的覆盖物 */
    public getOverlays(): OverlayType[];
    /** 判断传入的覆盖物实例是否在集合中 */
    public hasOverlay(
      overlay: OverlayType | ((this: null, item: OverlayType, index: number, overlays: OverlayType[]) => boolean),
    ): boolean;
    /** 从集合中删除传入的覆盖物实例 */
    public removeOverlay(overlay: OverlayType): this;
    /** 从集合中删除传入的覆盖物实例数组 */
    public removeOverlays(overlays: OverlayType[]): this;
    /** 清空集合 */
    public clearOverlays(): this;
    /**
     * 对集合中的覆盖物做迭代操作
     *
     * @public
     * @template C = O
     * @param {(this: C, overlay: OverlayType, index: number, overlays: OverlayType[]) => void} iterator 迭代回调
     * @param {?C} [context] 执行上下文
     */
    public eachOverlay<C = OverlayType>(
      iterator: (this: C, overlay: OverlayType, index: number, overlays: OverlayType[]) => void,
      context?: C,
    ): void;

    public setOptions(options: OverlayType[]): void;

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
