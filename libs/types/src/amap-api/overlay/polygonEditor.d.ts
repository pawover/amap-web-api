declare namespace AMap {
  namespace PolygonEditor {
    interface Options {
      /**
       * 是否开启编辑时吸附
       *
       * @default true
       */
      adsorb?: boolean;
      /** 新建对象构造参数 */
      createOptions?: Polygon.Options;
      /** 编辑对象样式 */
      editOptions?: Polygon.Options & Overlay.Options & Overlay.PlaneGeometryOptions & Overlay.LineGeometryOptions;
      /** 终点样式 */
      chosedPoint?: Partial<CircleMarker.Options>;
      /** 顶点样式 */
      controlPoint?: Partial<CircleMarker.Options>;
      /** 中间点样式 */
      midControlPoint?: Partial<CircleMarker.Options>;
    }
    interface Events extends EventsEditorProps<Polygon> {}
  }

  /**
   * 矢量图形编辑器 - 多边形
   *
   * @class PolygonEditor
   * @extends {Event<EditorEventList>} 类 - 地图事件
   */
  class PolygonEditor extends Event<EditorEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {AMap.Map} map 地图实例
     * @param {Polygon} polygon 多边形实例
     * @param {?PolygonEditor.Options} [options] 构造参数
     */
    public constructor(map: AMap.Map, polygon: Polygon, options?: PolygonEditor.Options);

    /** 编辑器的编辑状态 */
    public _editing: boolean;
    /** 要显示编辑器的地图实例 */
    public map: Map | null;
    /** 编辑器的拖拽状态 */
    public drawable: boolean;
    /** 编辑器的编辑状态 */
    public editable: boolean;
    /** 包含的多边形信息 */
    public adsorbDistance: { line: number; point: number };
    /** 包含的多边形列表 */
    public adsorbPolygons: Polygon[];
    public defaultCursor: string;
    public defaultMarkerOpt: CircleMarker.Options;

    /** 开始编辑对象，如果当前编辑对象不存在，则开启新建编辑对象 */
    public open(): void;
    /** 停止编辑对象 */
    public close(): void;

    /** 开始创建覆盖物 */
    public openAdd(): void;
    /** 停止创建覆盖物 */
    public closeAdd(): void;

    /** 开始编辑 */
    public openEdit(): void;
    /** 停止编辑 */
    public closeEdit(): void;

    /** 停止添加多边形 */
    public clearAddingPolygon(): void;
    /** @deprecated AMap Web API 2.x 中已废弃 */
    public clearTipMarkers(): void;
    public createMarker(marker: Marker.Options): void;
    /** 停止添加多边形 */
    public finishAddingPolygon(): void;
    /** 获取图标 */
    public getIcon(): Icon;
    /** 获取路径 */
    public getPath(): [number, number][];
    /** 获取包含的多边形列表 */
    public getPolygons(): Polygon[];

    /** 获取编辑对象 */
    public getTarget(): Polygon | undefined;
    /** 设置编辑对象，参数为空时清空编辑对象 */
    public setTarget(overlay?: Polygon | undefined): void;

    /** 清空所有吸附多边形 */
    public clearAdsorbPolygons(): void;
    /** 获取所有吸附多边形 */
    public getAdjustedPoint(): Polygon[];
    /** 设置吸附多边形 */
    public setAdsorbPolygons(overlay: Polygon | Polygon[]): void;
    /** 添加吸附多边形 */
    public addAdsorbPolygons(overlay: Polygon | Polygon[]): void;
    /** 删除吸附多边形 */
    public removeAdsorbPolygons(overlay: Polygon | Polygon[]): void;
  }
}
