declare namespace AMap {
  namespace CitySearch {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Options {}
    /** 回调函数 */
    interface Callback {
      (status: "complete", result: Result): void;
      (status: "error", result: string): void;
    }
    /** 查询成功的结果 */
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 查询的成功状态码 */
      infocode: string;
      /** 所在省 */
      province: string;
      /** 所在城市 */
      city: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 边界范围 */
      bounds: Bounds;
      /** 格式如 `lng,lat;lng,lat` 的 字符串 */
      rectangle: string;
      /** 查询状态 `"1"` 成功， `"0"` 失败 */
      status: "0" | "1";
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 城市信息查询
   * - 提供自动获取 IP 地址或根据指定 IP 地址查询对应城市信息的功能
   * - 用户可以通过自定义回调函数取回并显示查询结果
   * - 若服务请求失败，系统将返回错误信息
   *
   * @class CitySearch
   * @extends {Event<ServiceEventType>} 类 - 地图事件
   */
  class CitySearch extends Event<ServiceEventType> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?CitySearch.Options} [options] 构造参数
     */
    public constructor(options?: CitySearch.Options);

    /**
     * 自动获取 IP 地址，回调函数返回查询结果
     *
     * @public
     * @param {?CitySearch.Callback} [callback] 回调函数
     */
    public getLocalCity(callback?: CitySearch.Callback): void;
    /**
     * 查询指定 IP 地址，回调函数返回查询结果
     *
     * @public
     * @param {string} ip IP 地址
     * @param {?CitySearch.Callback} [callback] 回调函数
     */
    public getCityByIp(ip: string, callback?: CitySearch.Callback): void;
    /** 获取当前实例已绑定事件 */
    public getEvents?(): { complete: (result: CitySearch.Result) => void; error: (result: string) => void };
  }
}
