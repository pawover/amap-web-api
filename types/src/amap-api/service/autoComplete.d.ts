declare namespace AMap {
  namespace AutoComplete {
    interface Options extends Autocomplete.Options {}
    interface Callback extends Autocomplete.Callback {}
    interface Result extends Autocomplete.Result {}
    interface Tip extends Autocomplete.Tip {}
    interface EventsCallback extends Autocomplete.EventsCallback {}
    interface Events extends Autocomplete.Events {}
  }
  namespace Autocomplete {
    interface Options {
      /**
       * POI 类型
       * - 用于限制查询范围
       * - 多个类型用 `|` 分隔，目前只支持 Poi 类型编码，如 `"050000"`
       *
       * @default ""
       */
      type?: string;
      /**
       * 查询城市
       * - 用于限制查询范围
       * - 可选值：城市名（中文或中文全拼）、citycode、adcode
       *
       * @default "全国"
       */
      city?: string;
      /**
       * 返回的数据类型
       * - 可选值：
       *   - `all` 返回所有数据类型
       *   - `poi` 返回 POI 数据类型
       *   - `bus` 返回公交站点数据类型
       *   - `busline` 返回公交线路数据类型
       * - 目前暂时不支持多种类型
       *
       * @default "all"
       */
      datatype?: string;
      /**
       * 是否强制限制查询范围在设定城市内
       * - `true` 强制限制在设定城市内
       * - `false` 不强制限制在设定城市内
       *
       * @default false
       */
      citylimit?: boolean;
      /**
       * 指定一个 input 输入框，设定之后，在 input 输入文字将自动生成下拉选择列表
       * - 支持传入输入框 DOM 对象的 id 值，或直接传入输入框的 DOM 对象
       */
      input?: string | HTMLInputElement;
      /**
       * 指定一个 div 作为展示提示结果的容器，当指定了 input 时有效，缺省的时候将自动创建一个显示结果面板
       * - 支持传入 div DOM 对象的 id 值，或直接传入 div 的 DOM 对象
       */
      output?: string | HTMLDivElement;
      /**
       * 表示是否在 input 位于页面较下方的时候自动将输入面板显示在 input 上方以避免被遮挡
       *
       * @default true
       */
      outPutDirAuto?: boolean;
      /**
       * 页面滚动时关闭查询结果列表
       *
       * @default true
       */
      closeResultOnScroll?: boolean;
      /**
       * 是否不显示行政区
       *
       * @default true
       */
      noshowDistrict?: boolean;
      /**
       * 检索检索语言类型
       *
       * @default "zh_cn"
       */
      lang?: 'zh_cn' | 'en';
    }
    /** 回调函数 */
    interface Callback {
      (status: 'complete', result: Result): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: Obj): void;
    }
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 查询的结果数量 */
      count: number;
      /** 查询的详情列表 */
      tips: Tip[];
    }
    interface Tip {
      /** POI 唯一标识 */
      id: string;
      /** 名称 */
      name: string;
      /** 行政区 */
      district: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 坐标 */
      location: LngLat;
      /** 详细地址 */
      address: string;
      /** Poi 类型编码 */
      typecode: string;
      /** 城市 */
      city: unknown[];
    }
    interface EventsCallback extends Omit<Tip, 'address' | 'typecode' | 'city'> {
      /** POI 类型 */
      type: string;
    }
    interface Events {
      /** 鼠标或者键盘上下键选择 POI 信息时触发此事件 */
      onChoose?: (event: EventsCallback) => void;
      /** 鼠标点击或者回车键选择 POI 信息时触发此事件 */
      onSelect?: (event: EventsCallback) => void;
    }
  }

  /**
   * 服务 - 输入提示
   * - 根据输入的关键字自动查询匹配的信息
   * - 可将 Poi 类型和城市类型作为查询范围的限制条件
   * - 用户可以通过自定义回调函数取回查询结果并显示
   *
   * @class AutoComplete
   * @extends {Autocomplete} 服务 - 输入提示
   */
  class AutoComplete extends Autocomplete {}
  /**
   * 服务 - 输入提示
   * - 根据输入的关键字自动查询匹配的信息
   * - 可将 Poi 类型和城市类型作为查询范围的限制条件
   * - 用户可以通过自定义回调函数取回查询结果并显示
   *
   * @deprecated AMap Web API 2.x 中已废弃
   * @class Autocomplete
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class Autocomplete extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Autocomplete.Options} [options] 构造参数
     */
    public constructor(options?: Autocomplete.Options);

    /**
     * 通过关键字查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?Autocomplete.Callback} [callback] 回调函数
     */
    public search(keyword: string, callback?: Autocomplete.Callback): void;
    /**
     * 设置查询的 POI 类型
     *
     * @public
     * @param {Autocomplete.Options['type']} type POI 类型
     */
    public setType(type: Autocomplete.Options['type']): void;
    /**
     * 设置查询城市
     *
     * @public
     * @param {Autocomplete.Options['city']} city 城市名称/区域编码
     */
    public setCity(city: Autocomplete.Options['city']): void;
    /**
     * 设置是否强制限制在设置的城市内搜索
     *
     * @public
     * @param {Autocomplete.Options['citylimit']} citylimit 是否强制限制在设置的城市内搜索
     */
    public setCityLimit(citylimit: Autocomplete.Options['citylimit']): void;

    /** 获取检索语言类型 */
    public getLang(): 'zh_cn' | 'en';
    /** 设置检索语言类型 */
    public setLang(lang: 'zh_cn' | 'en'): void;
  }
}
