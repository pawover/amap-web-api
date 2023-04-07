declare namespace AMap {
  namespace LineSearch {
    interface Options extends StationSearch.Options {
      /**
       * 返回的公交路线信息的详细程度
       * - `base` 基本公交路线信息
       * - `all` 基本公交路线信息及详细信息
       *
       * @default "base"
       */
      extensions?: 'base' | 'all';
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
      /** 线路信息列表 */
      lineInfo: LineRow;
    }
    /** 线路信息 */
    interface LineRow extends LineBase {
      /** 出发时刻表 */
      stime?: unknown[];
      /** 结束时刻表 */
      etime?: unknown[];
      uicolor?: string;
      /** 时刻表描述 */
      timedesc?: string;
      /** 循环次数 */
      loop?: string;
      /** 线路状态 */
      status?: string;
      direc?: `${number}`;
      /** 运营公司 */
      company?: string;
      /** 起点与终点间距离 */
      distance?: `${number}`;
      /** 起步价 */
      basic_price?: string;
      /** 总价 */
      total_price?: string;
      bounds?: Bounds;
      /** 途径站点 */
      via_stops?: ViaStop[];
    }
    /** 线路基础信息 */
    interface LineBase {
      /** 线路 ID */
      id: `${number}`;
      /** 线路名称 */
      name: string;
      /** 线路途经点 */
      path: LngLat[];
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 首发站 */
      start_stop: string;
      /** 终点站 */
      end_stop: string;
      /** 线路类型 */
      type: Service.BusType;
    }
    /** 途径站点 */
    interface ViaStop {
      /** 站点 ID */
      id: string;
      /** 站点位置 */
      location: LngLat;
      /** 站点名称 */
      name: string;
      /** 位于线路的第几站 */
      sequence: number;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 公交路线查询
   *
   * @class LineSearch
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class LineSearch extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?LineSearch.Options} [options] 构造参数
     */
    public constructor(options?: LineSearch.Options);

    /**
     * 通过关键字查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?LineSearch.Callback} [callback] 回调函数
     */
    public search(keyword: string, callback?: LineSearch.Callback): void;
    /**
     * 通过线路 ID 查询
     *
     * @public
     * @param {string} id 线路 ID
     * @param {?LineSearch.Callback} [callback] 回调函数
     */
    public searchById(id: string, callback?: LineSearch.Callback): void;
    /**
     * 设置查询的公交路线所在城市
     *
     * @public
     * @param {LineSearch.Options['city']} city 城市名称/区域编码
     */
    public setCity(city: LineSearch.Options['city']): void;
    /**
     * 设置当前页
     *
     * @public
     * @param {LineSearch.Options['pageIndex']} pageIndex 当前页
     */
    public setPageIndex(pageIndex: LineSearch.Options['pageIndex']): void;
    /**
     * 设置分页条数
     *
     * @public
     * @param {LineSearch.Options['pageSize']} pageSize 分页条数
     */
    public setPageSize(pageSize: LineSearch.Options['pageSize']): void;
  }
}
