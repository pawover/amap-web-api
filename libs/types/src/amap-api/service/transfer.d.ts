declare namespace AMap {
  namespace Transfer {
    interface Options extends Walking.Options {
      /**
       * 查询城市
       * - 可选值：城市名（中文或中文全拼）、citycode、adcode
       */
      city: string;
      /**
       * 公交路线规划策略
       * - `0` 最快捷模式
       * - `1` 最经济模式
       * - `2` 最少换乘模式
       * - `3` 最少步行模式
       * - `4` 最舒适模式
       * - `5` 不乘地铁模式
       */
      policy?: TransferPolicy | number;
      /**
       * 是否计算夜班车
       *
       * @default false
       */
      nightflag?: boolean;
    }
    interface SearchKeyword extends Driving.SearchKeyword {}
    /** 回调函数 */
    interface Callback {
      (status: "complete", result: Result): void;
      (status: "error", result: string): void;
      (status: "no_data", result: Obj): void;
    }
    interface Result extends Service.ResultBase {
      /** 查询的结果数量 */
      count: number;
      /** 规划路线列表 */
      plans: Plane[];
      /** 打车费用，单位：元 */
      taxi_cost: number;
    }
    /** 公交规划路线 */
    interface Plane {
      /** 此换乘方案价格，单位：元 */
      cost: number;
      /** 此换乘方案预期时间，单位：秒 */
      distance: number;
      /** 是否是夜班车 */
      nightLine: boolean;
      /** 此换乘方案坐标信息列表 */
      path: PointLike[];
      /** 预计耗时，单位：秒 */
      time: number;
      /** 地铁距离，单位：米 */
      railway_distance: number;
      /** 出租车距离，单位：米 */
      taxi_distance: number;
      /** 换乘距离，单位：米 */
      transit_distance: number;
      /** 步行距离，单位：米 */
      walking_distance: number;
      /** 换乘路段列表 */
      segments: Segment[];
    }
    /** 换乘路段 */
    interface Segment {
      /** 此路段距离，单位：米 */
      distance: number;
      /** 导航指示 */
      instruction: string;
      /** 预计耗时，单位：秒 */
      time: number;
      /** 换乘方案 */
      transit: Transit;
      /** 换乘模式 */
      transit_mode: string;
    }
    /** 换乘方案 */
    interface Transit {
      /** 起点坐标 */
      origin: PointLike;
      /** 终点坐标 */
      destination: PointLike;
      /** 路段坐标信息列表 */
      path: PointLike[];
      /** 路段导航信息 */
      steps: Step[];
    }
    /** 路段导航信息 */
    interface Step {
      /** 导航指示 */
      instruction: string;
      /** 道路名称 */
      road: string;
      /** 此路段距离，单位：米 */
      distance: number;
      /** 预计耗时，单位：秒 */
      time: number;
      /** 路段坐标信息列表 */
      path: PointLike[];
      /** 导航主要动作 */
      action: Service.Action;
      /** 导航辅助动作 */
      assist_action: string;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 公交路线规划
   *
   * @class Transfer
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class Transfer extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Transfer.Options} options 构造参数
     */
    public constructor(options?: Transfer.Options);

    /** API URL */
    public url: string;

    /**
     * 通过起点、终点、途经点坐标规划公交路线
     *
     * @public
     * @param {LngLatLike} origin 起点
     * @param {LngLatLike} destination 终点
     * @param {?Transfer.Callback} [callback] 回调函数
     */
    public search(origin: LngLatLike, destination: LngLatLike, callback?: Transfer.Callback): void;
    /**
     * 通过起点、终点、途经点名称规划公交路线
     * - 数组第一项将作为起点，最后一项将作为终点，其它项将作为途经点
     *
     * @public
     * @param {Transfer.SearchKeyword[]} options 关键字参数
     * @param {?Transfer.Callback} [callback] 回调函数
     */
    public search(options: Transfer.SearchKeyword[], callback?: Transfer.Callback): void;
    /** 清除规划结果 */
    public clear(): void;
    /** 设置公交路线规划的出发时间 */
    public leaveAt(time?: string, date?: string): void;
    /** 设置公交换乘策略 */
    public policy(): void;
    /** 设置公交路线规划查询的城市 */
    public setCity(city: string): void;
    /** 设置公交路线规划查询的目的地城市 */
    public setCityd(destination: string): void;
  }
}
