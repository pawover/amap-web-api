declare namespace AMap {
  namespace Weather {
    /** 回调函数 */
    interface LiveCallback {
      (status: 'complete', result: LiveResult): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: Obj): void;
    }
    /** 回调函数 */
    interface ForecastCallback {
      (status: 'complete', result: ForecastResult): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: Obj): void;
    }
    /** 实时天气查询结果说明 */
    interface LiveResult {
      /** 查询的成功状态说明 */
      info: string;
      /** 省份名 */
      province: string;
      /** 城市名 */
      city: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 天气现象，详见天气现象列表 */
      weather: string;
      /**
       * 实时气温
       *
       * @unit 摄氏度
       * @unitSymbol ℃
       */
      temperature: string;
      /** 风向，风向编码对应描述 */
      windDirection: string;
      /**
       * 风力，风力编码对应风力级别
       *
       * @unit 级
       */
      windPower: number;
      /**
       * 空气湿度
       *
       * @unit 百分比
       * @unitSymbol %
       */
      humidity: string;
      /** 数据发布的时间 */
      reportTime: string;
    }
    /** 查询四天预报天气，包括查询当天天气信息 */
    interface ForecastResult {
      /** 查询的成功状态说明 */
      info: string;
      /** 省份名 */
      province: string;
      /** 城市名 */
      city: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 数据发布的时间 */
      reportTime: string;
      /** 天气预报数组，包括当天至第三天的预报数据 */
      forecast: Forecast[];
    }
    /** 天气预报 */
    interface Forecast {
      /** 日期，格式为“年-月-日” */
      date: string;
      /** 星期 */
      week: string;
      /** 白天天气现象，详见天气现象列表 */
      dayWeather: string;
      /** 夜间天气现象，详见天气现象列表 */
      nightWeather: string;
      /** 白天温度 */
      dayTemp: number;
      /** 白天温度 */
      nightTemp: number;
      /** 白天风向 */
      dayWindDir: string;
      /** 白天风力 */
      dayWindPower: string;
      /** 夜间风力 */
      nightWindPower: string;
    }
  }

  /**
   * 服务 - 天气查询
   * - 根据城市名称或区域编码返回城市天气预报，包括实时天气信息和四天的天气预报
   *
   * @class Weather
   * @extends {Event<ServiceEventList>}
   */
  class Weather extends Event<ServiceEventList> {
    /** API URL */
    public url: string;

    /**
     * 查询实时天气信息
     *
     * @public
     * @param {string} city 城市名称
     * @param {?Weather.LiveCallback} [callback] 回调函数
     */
    public getLive(city: string, callback?: Weather.LiveCallback): void;
    /**
     * 查询四天预报天气，包括查询当天天气信息
     *
     * @public
     * @param {string} city 城市名称
     * @param {?Weather.ForecastCallback} [callback] 回调函数
     */
    public getForecast(city: string, callback?: Weather.ForecastCallback): void;
  }
}
