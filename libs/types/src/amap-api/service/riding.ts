declare namespace AMap {
  namespace Riding {
    interface Options extends Walking.Options {
      /**
       * 骑行路线规划策略
       * - `0` 推荐路线及最快路线综合
       * - `1` 推荐路线
       * - `2` 最快路线
       */
      policy?: RidingPolicy | number;
    }
    interface SearchKeyword extends Driving.SearchKeyword {}
    /** 回调函数 */
    interface Callback {
      (status: "complete", result: Result): void;
      (status: "error", result: string): void;
      (status: "no_data", result: Obj): void;
    }
    interface Result {
      /** 规划路线列表 */
      routes: Route[];
    }
    /** 规划路线 */
    interface Route {
      /** 此路段距离，单位：米 */
      distance: number;
      /** 预计耗时，单位：秒 */
      time: number;
      /** 骑行方案信息列表 */
      rides: Ride;
    }
    /** 骑行方案信息 */
    interface Ride {
      /** 此路段起点 */
      start_location: PointLike;
      /** 此路段终点 */
      end_location: PointLike;
      /** 导航指示 */
      instruction: string;
      /** 道路名称 */
      road: string;
      /** 方向 */
      orientation: string;
      /** 此路段距离，单位：米 */
      distance: number;
      /** 预计耗时，单位：秒 */
      time: number;
      /** 此路段坐标信息列表 */
      path: PointLike[];
      /** 导航主要动作 */
      action: Service.Action;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 骑行路线规划
   */
  class Riding extends Event<ServiceEventType> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Riding.Options} [options] 构造参数
     */
    public constructor(options?: Riding.Options);

    /** API URL */
    public url: string;

    /**
     * 通过起点、终点、途经点坐标规划骑行路线
     *
     * @public
     * @param {LngLatLike} origin 起点
     * @param {LngLatLike} destination 终点
     * @param {?Riding.Callback} [callback] 回调函数
     */
    public search(origin: LngLatLike, destination: LngLatLike, callback?: Riding.Callback): void;
    /**
     * 通过起点、终点、途经点名称规划骑行路线
     * - 数组第一项将作为起点，最后一项将作为终点，其它项将作为途经点
     *
     * @public
     * @param {Riding.SearchKeyword[]} options 关键字参数
     * @param {?Riding.Callback} [callback] 回调函数
     */
    public search(options: Riding.SearchKeyword[], callback?: Riding.Callback): void;
    /** 清除规划结果 */
    public clear(): void;
    /** 设置路线规划策略 */
    public setPolicy(policy: RidingPolicy | number): void;
  }
}
