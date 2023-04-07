declare namespace AMap {
  namespace StationSearch {
    interface Options {
      /**
       * 查询城市
       * - 可选值：城市名（中文或中文全拼）、citycode、adcode
       *
       * @default "全国"
       */
      city?: string;
      /**
       * 当前页
       * - 取值范围 `1` ~ `100`，超过取值范围取默认值，超出实际页数取最大值
       *
       * @default 1
       */
      pageIndex?: number;
      /**
       * 分页条数
       * - 取值范围 `1` ~ `100`，超过取值范围取默认值
       *
       * @default 20
       */
      pageSize?: number;
    }
    /** 回调函数 */
    interface Callback {
      (status: 'complete', result: Result): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: {}): void;
    }
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 站点信息列表 */
      stationInfo: StationRow;
    }
    /** 站点信息 */
    interface StationRow {
      /** 站点 ID */
      id: string;
      /** 站点名称 */
      name: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 站点位置 */
      location: Location;
      /** 公交线路信息 */
      buslines: BusLine[];
    }
    /** 公交线路信息 */
    interface BusLine extends Omit<LineSearch.LineBase, 'path' | 'type' | 'citycode'> {
      /** 站点位置 */
      location: ControlPoint | LngLat;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 公交站点查询
   *
   * @class StationSearch
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class StationSearch extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?StationSearch.Options} [options] 构造参数
     */
    public constructor(options?: StationSearch.Options);

    /**
     * 通过关键字查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?StationSearch.Callback} [callback] 回调函数
     */
    public search(keyword: string, callback?: StationSearch.Callback): void;
    /**
     * 通过站点 ID 查询
     *
     * @public
     * @param {string} id 站点 ID
     * @param {?StationSearch.Callback} [callback] 回调函数
     */
    public searchById(id: string, callback?: StationSearch.Callback): void;
    /**
     * 设置查询城市
     *
     * @public
     * @param {StationSearch.Options['city']} city 城市名称/区域编码
     */
    public setCity(city: StationSearch.Options['city']): void;
    /**
     * 设置当前页
     *
     * @public
     * @param {StationSearch.Options['pageIndex']} pageIndex 当前页
     */
    public setPageIndex(pageIndex: StationSearch.Options['pageIndex']): void;
    /**
     * 设置分页条数
     *
     * @public
     * @param {StationSearch.Options['pageSize']} pageSize 分页条数
     */
    public setPageSize(pageSize: StationSearch.Options['pageSize']): void;
  }
}
