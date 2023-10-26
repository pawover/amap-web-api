declare namespace AMap {
  namespace PlaceSearch {
    interface Options extends StationSearch.Options {
      /**
       * POI 类型
       * - 用于限制查询范围
       * - 多个类型用 `|` 分隔，目前只支持 Poi 类型编码，如 `"050000"`
       *
       * @default ""
       */
      type?: string;
      /**
       * 是否强制限制查询范围在设定城市内
       * - `true` 强制限制在设定城市内
       * - `false` 不强制限制在设定城市内
       *
       * @default false
       */
      citylimit?: boolean;
      /**
       * 返回的地点信息的详细程度
       * - `0` 基本地点信息
       * - `>0` 基本地点信息及详细信息
       *
       * @default 0
       */
      children?: number;
      /**
       * 返回的地点信息的详细程度
       * - `base` 基本地点信息
       * - `all` 基本地点信息及详细信息
       *
       * @default "base"
       */
      extensions?: 'base' | 'all';
      /**
       * 设置检索语言类型
       * 可选值：zh_cn（中文）、en（英文）
       *
       * @default "zh_cn"
       */
      lang?: 'zh_cn' | 'en';
      /**
       * 是否在地点查询结束后自动调整地图视野
       *
       * @default true
       */
      autoFitView?: boolean;
      /**
       * 是否添加周边搜索的圆和范围搜索的多边形
       *
       * @default true
       */
      showCover?: boolean;
      /**
       * 结果列表的 DOM 容器 id 或 DOM 容器
       * - 结果列表将在此容器中进行展示
       */
      panel?: string | HTMLElement;
      /**
       * 设定绘制的 UI 风格
       * - 启用 `panel` 属性后生效
       *
       * @default "newpc"
       */
      renderStyle?: 'newpc' | 'default';
    }
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 线路信息列表 */
      poiList: {
        /** 查询的结果数量 */
        count: number;
        /** 当前页 */
        pageIndex: number;
        /** 分页条数 */
        pageSize: number;
        /** 位置附近的 POI 信息 */
        pois: Poi[];
      };
      /** 发生事件且查无此关键字时，返回建议关键字列表，可根据建议关键字查询 */
      keywordList?: string[];
      /** 发生事件且查无此关键字且 city 为 `"全国"` 时，返回城市建议列表，该列表中每个城市包含一个或多个相关 Poi 点信息 */
      cityList?: Poi[];
    }
    interface OnPoiParams {
      /** 地点位置 */
      location: LngLatLike;
      /** POI ID */
      id?: string;
      /** 地点名称 */
      name?: string;
      /** 地点地址 */
      address?: string;
    }
    interface SelectChangeEvent {
      /** 事件类型 */
      type: string;
      /** 当前选中的 POI ID */
      id: string;
      /** 当前选中的 POI 对应在地图中的 Marker */
      marker: Marker;
      /** 当前选中的 POI 对应结果面板的列表项 */
      listElement: HTMLLIElement;
      /** 当前选中的 POI 的信息 */
      data: Poi;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
      /** 使用 `panel` 属性后，选中的 POI 改变时触发 */
      onSelectChanged?: (event: SelectChangeEvent) => void;
      /** 使用 `panel` 属性后，结果面板中 POI 对应的列表项被点击时触发 */
      onListElementClick?: (event: SelectChangeEvent) => void;
      /** 使用 `panel` 属性后，POI 在地图中对应的 Marker 被点击时触发 */
      onMarkerClick?: (event: SelectChangeEvent) => void;
    }
  }

  /**
   * 服务 - 地点查询
   *
   * @class PlaceSearch
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class PlaceSearch extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PlaceSearch.Options} [options] 构造参数
     */
    public constructor(options?: PlaceSearch.Options);

    /**
     * 通过关键字查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?PlaceSearch.Callback} [callback] 回调函数
     */
    public search(keyword: string, callback: (status: 'complete', result: PlaceSearch.Result) => void): void;
    public search(keyword: string, callback: (status: 'error', result: string) => void): void;
    public search(keyword: string, callback: (status: 'no_data', result: Obj) => void): void;
    /**
     * 通过关键字和范围查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {BoundsLike} bounds 范围
     * @param {?PlaceSearch.Callback} [callback] 回调函数
     */
    public searchInBounds(
      keyword: string,
      bounds: BoundsLike,
      callback?: (status: 'complete', result: PlaceSearch.Result) => void,
    ): void;
    public searchInBounds(
      keyword: string,
      bounds: BoundsLike,
      callback?: (status: 'error', result: string) => void,
    ): void;
    public searchInBounds(
      keyword: string,
      bounds: BoundsLike,
      callback?: (status: 'no_data', result: Obj) => void,
    ): void;
    /**
     * 通过关键字、中心点经纬度、半径进行范围查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {LngLatLike} center 中心点
     * @param {number} radius 半径，单位：米，取值范围 `0` ~ `50000`，超过取值范围按 3000 处理
     * @param {?PlaceSearch.Callback} [callback] 回调函数
     */
    public searchNearBy(
      keyword: string,
      center: LngLatLike,
      radius: number,
      callback?: (status: 'complete', result: PlaceSearch.Result) => void,
    ): void;
    public searchNearBy(
      keyword: string,
      center: LngLatLike,
      radius: number,
      callback?: (status: 'error', result: string) => void,
    ): void;
    public searchNearBy(
      keyword: string,
      center: LngLatLike,
      radius: number,
      callback?: (status: 'no_data', result: Obj) => void,
    ): void;
    /**
     * 根据 POI ID 查询详细信息
     *
     * @public
     * @param {string} id POI ID
     * @param {?PlaceSearch.Callback} [callback] 回调函数
     */
    public getDetails(id: string, callback: (status: 'complete', result: PlaceSearch.Result) => void): void;
    public getDetails(id: string, callback: (status: 'error', result: string) => void): void;
    public getDetails(id: string, callback: (status: 'no_data', result: Obj) => void): void;
    /**
     * 设置查询的 POI 类型
     *
     * @public
     * @param {PlaceSearch.Options['type']} type POI 类型
     */
    public setType(type: PlaceSearch.Options['type']): void;
    /**
     * 设置当前页
     *
     * @public
     * @param {PlaceSearch.Options['pageIndex']} pageIndex 当前页
     */
    public setPageIndex(pageIndex: PlaceSearch.Options['pageIndex']): void;
    /**
     * 设置分页条数
     *
     * @public
     * @param {PlaceSearch.Options['pageSize']} pageSize 分页条数
     */
    public setPageSize(pageSize: PlaceSearch.Options['pageSize']): void;
    /**
     * 设置查询城市
     *
     * @public
     * @param {PlaceSearch.Options['city']} city 城市名称/区域编码
     */
    public setCity(city: PlaceSearch.Options['city']): void;
    /**
     * 设置是否强制限制在设置的城市内搜索
     *
     * @public
     * @param {PlaceSearch.Options['citylimit']} citylimit 是否强制限制在设置的城市内搜索
     */
    public setCityLimit(citylimit: PlaceSearch.Options['citylimit']): void;
    /**
     * 唤起高德地图客户端 POI Marker 页
     *
     * @public
     * @param {PlaceSearch.OnPoiParams} param 必要参数
     */
    public poiOnAMAP(param: PlaceSearch.OnPoiParams): void;
    /**
     * 唤起高德地图客户端 POI 详情页
     *
     * @public
     * @param {Omit<PlaceSearch.OnPoiParams, 'address'>} param 必要参数
     */
    public detailOnAMAP(param: Omit<PlaceSearch.OnPoiParams, 'address'>): void;

    /** 清除搜索结果 */
    public clear(): void;

    /** 获取检索语言类型 */
    public getLang(): 'zh_cn' | 'en';
    /** 设置检索语言类型 */
    public setLang(lang: 'zh_cn' | 'en'): void;
  }
}
