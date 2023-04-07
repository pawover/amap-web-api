declare namespace AMap {
  namespace IndoorMap {
    interface Options extends Layer.Options {
      /**
       * 指定鼠标悬停到店铺面时的鼠标样式
       */
      cursor?: CursorStyle;
      /**
       * 标题
       */
      createTile?: string;
      /**
       * 是否隐藏楼层切换控件
       *
       * @default false
       */
      hideFloorBar?: boolean;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 室内图层
   * - 用于在适当级别展示室内地图，并提供显示商铺tip、切换楼层等功能
   * - 展示室内图层需要浏览器支持 WebGL，默认不显示
   * - 当地图处在合适的级别下，移动到有室内地图的地方就会自动显示室内地图
   * - 可以通过监听地图 indoor_create 事件来获取这个室内图层，取得控制权
   *
   * @class IndoorMap
   * @extends {Layer<IndoorMap.Options>} 抽象类 - 图层
   * @example
    ```js
      map.on('indoor_create', function () {
        map.indoorMap.showIndoorMap('B000A8VT15', 4);
      });
   * ```
   */
  class IndoorMap extends Layer<IndoorMap.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {IndoorMap.Options} options 构造参数
     */
    public constructor(options: IndoorMap.Options);

    /**
     * 显示指定 POI 的室内地图
     *
     * @public
     * @param {number | string} indoorId 建筑物 POI ID
     * @param {?number} [floor] 楼层
     * @param {?number} [shopId] 商铺 ID
     */
    public showIndoorMap(indoorId: number | string, floor?: number, shopId?: number): void;
    /** 显示指定的楼层 */
    public showFloor(floor: number): void;
    /** 获取是否与指定的点相交 */
    public getIntersect(lnglat: LngLatLike): boolean;
    /** 获取是否与指定的覆盖物相交 */
    public getIntersectPoly(overlay: Overlay): boolean;
    public setBar(bar: unknown): void;
    public setBarOpt(options: Recordable): void;
    public setRenderData(data: unknown): void;
    public setShowId(isShow: boolean): void;
    public showId(id: number | string): void;

    /** 显示楼层切换控件 */
    public showFloorBar(): void;
    /** 隐藏楼层切换控件 */
    public hideFloorBar(): void;

    /** 显示室内图层上的标注 */
    public showLabels(): void;
    /** 隐藏室内图层上的标注 */
    public hideLabels(): void;

    /** 获取被选中的室内地图的一些基本信息，包含名称、当前楼层、所有楼层信息、POI ID等 */
    public getSelectedBuilding(): void;
    /** 获取被选中室内的 POI ID */
    public getSelectedBuildingId(): void;
  }
}
