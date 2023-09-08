declare namespace AMap {
  namespace Driving {
    interface Options extends Walking.Options {
      /**
       * 驾车路线规划策略
       * - 下方编号为 10-20，39-45 的策略，会返回多条路径规划结果，高德地图 APP 策略也包含在内，强烈建议从此策略之中选择
       * - 下方编号为 0-9，34-38 的策略，仅会返回一条路径规划结果
       * > - `0` 速度优先，此路线不一定路程最短
       * > - `1` 费用优先，不走收费路段，且耗时最少的路线
       * > - `2` 距离优先，仅走距离最短路线，但可能存在穿越小路/小区的情况
       * > - `3` 速度优先，不走快速路，如京通快速路。已弃用，请使用策略 `13`
       * > - `4` 避免拥堵，但可能存在绕路、耗时较长的情况
       * > - `5` 多种策略，同时使用速度优先、费用优先、距离优先三个策略计算路径，会根据路况，返回一至三条路径规划信息
       * > - `6` 速度优先，不走高速，但是不排除走其余收费路段
       * > - `7` 避免收费，不走高速且避免所有收费路段
       * > - `8` 避免拥堵和收费，可能存在走高速的情况，并且考虑路况不走拥堵路线，但有可能存在绕路和时间较长
       * > - `9` 避免拥堵和收费，不走高速
       * > - `34` 高速优先
       * > - `35` 不走高速
       * > - `36` 最少收费
       * > - `37` 大路优先
       * > - `38` 速度最快
       * > - `10` 返回多条 避免拥堵、距离优先、速度优先三种策略的结果
       * > - `11` 返回多条 避免拥堵、距离优先、时间最短三种策略的结果，建议用算法更优秀的策略 `10` 代替
       * > - `12` 返回多条 避免拥堵 策略的结果
       * > - `13` 返回多条 不走高速 策略的结果
       * > - `14` 返回多条 费用优先 策略的结果
       * > - `15` 返回多条 避免拥堵、不走高速 策略的结果
       * > - `16` 返回多条 避免收费、不走高速 策略的结果
       * > - `17` 返回多条 避免拥堵、费用优先 策略的结果
       * > - `18` 返回多条 避免拥堵、费用优先、不走高速 策略的结果
       * > - `19` 返回多条 高速优先 策略的结果
       * > - `20` 返回多条 避免拥堵、高速优先 策略的结果
       * > - `39` 返回多条 避免拥堵、高速优先 策略的结果
       * > - `40` 返回多条 避免拥堵、不走高速 策略的结果
       * > - `41` 返回多条 避免拥堵、最少收费 策略的结果
       * > - `42` 返回多条 不走高速、最少收费 策略的结果
       * > - `43` 返回多条 避免拥堵、最少收费、不走高速 策略的结果
       * > - `44` 返回多条 避免拥堵、大路优先 策略的结果
       * > - `45` 返回多条 避免拥堵、速度最快 策略的结果
       *
       * @default 0
       */
      policy?: DrivingPolicy | number;
      /**
       * 是否使用轮渡
       * - `0` 可以使用轮渡
       * - `1` 不可以使用轮渡
       *
       * @default 0
       */
      ferry?: number;
      /**
       * 是否显示实时路况信息
       * - 绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息
       *
       * @default true
       */
      showTraffic?: boolean;
      /**
       * 车牌号前的省份汉字缩写，用于判断是否限行，与 `number` 属性组合使用
       * - 例如：京
       */
      province?: string;
      /**
       * 车牌号，用于判断是否限行，与 `province` 属性组合使用
       * - 例如：NH1N11
       */
      number?: string;
    }
    interface SearchKeyword {
      /** 关键字 */
      keyword: string;
      /** 城市 */
      city?: Geocoder.Geocode['city'];
    }
    /** 回调函数 */
    interface Callback {
      (status: 'complete', result: Result): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: Obj): void;
    }
    interface Result extends Service.ResultBase {
      /** 规划途经点 */
      waypoints: ((Service.RoutePoint<'waypoint'> & { isWaypoint: boolean }) | Poi)[];
      /** 规划路线列表 */
      routes: Route[];
      /** 打车费用，单位：元 */
      taxi_cost?: number;
    }
    /** 规划路线 */
    interface Route {
      /** 规划策略 */
      policy: string;
      /**
       * 限行结果
       * - `0` 代表限行已规避或未限行，即该路线没有限行路段
       * - `1` 代表限行无法规避，即该线路有限行路段
       * - `-1`
       */
      restriction: number;
      /** 此路段距离，单位：米 */
      distance: number;
      /** 预计耗时，单位：秒 */
      time: number;
      /** 收费金额，单位：元 */
      tolls: number;
      /** 收费路段距离，单位：米 */
      tolls_distance: number;
      /** 路段导航信息列表 */
      steps: Step[];
    }
    /** 路段导航信息 */
    interface Step {
      /** 此路段起点 */
      start_location: PointLike;
      /** 此路段终点 */
      end_location: PointLike;
      /** 此路段距离，单位：米 */
      distance: number;
      /** 导航主要动作 */
      action: Service.Action;
      /** 导航辅助动作 */
      assistant_action: Service.AssistantAction;
      /** 导航指示 */
      instruction: string;
      /** 方向 */
      orientation: string;
      /** 道路名称 */
      road: string;
      /** 收费金额，单位：元 */
      tolls: number;
      /** 收费路段距离，单位：米 */
      toll_distance: number;
      /** 主要收费道路名称 */
      toll_road: string;
      /** 此路段坐标信息列表 */
      path: PointLike[];
      /** 途径城市列表 */
      cities: ViaCity[];
      /** 导航详细信息列表 */
      tmcs: Tmc[];
      tmcsPaths: TmcsPath[];
    }
    interface ViaCity {
      /** 途径名称 */
      name: string;
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 途径行政区列表 */
      districts: {
        /** 行政区名称 */
        name: string;
        /** 行政区编码 */
        adcode: `${number}`;
      }[];
    }
    /** 导航详细信息 */
    interface Tmc {
      /**
       * 路况信息对应的编码
       * - 如果 direction 是正向，lcode 返回值大于 0，否则 lcode 返回值小于 0
       * - 如果返回空数组则说明此路段无 lcode
       */
      lcode: string | never[];
      /** 此路段距离，单位：米 */
      distance: number;
      /** 此路段的交通情况 */
      status: '未知' | '畅通' | '缓行' | '拥堵' | '严重拥堵';
      /** 此路段坐标信息列表 */
      path: PointLike[];
      /**
       * 此路段坐标轨迹
       * - 如：`"116.480891,39.98937;116.480553,39.989606;116.480548,39.98966"`
       */
      polyline: string;
    }
    interface TmcsPath {
      /** 此路段坐标信息列表 */
      path: PointLike[];
      /** 此路段的交通情况 */
      status: '未知' | '畅通' | '缓行' | '拥堵' | '严重拥堵';
      /** 此路段距离，单位：米 */
      distance: number;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 驾车路线规划
   * - 提供起点、终点坐标的驾车导航路线查询功能
   *
   * @class Driving
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class Driving extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Driving.Options} [options] 构造参数
     */
    public constructor(options?: Driving.Options);

    /** API URL */
    public url: string;

    /**
     * 通过起点、终点、途经点坐标规划驾车路线
     *
     * @public
     * @param {LngLatLike} origin 起点
     * @param {LngLatLike} destination 终点
     * @param {?{ waypoints: LngLatLike[] }} [options] 途经点
     * @param {?Driving.Callback} [callback] 回调函数
     */
    public search(
      origin: LngLatLike,
      destination: LngLatLike,
      options?: { waypoints: LngLatLike[] },
      callback?: Driving.Callback,
    ): void;
    /**
     * 通过起点、终点、途经点名称规划驾车路线
     * - 数组第一项将作为起点，最后一项将作为终点，其它项将作为途经点
     *
     * @public
     * @param {Driving.SearchKeyword[]} options 关键字参数
     * @param {?Driving.Callback} [callback] 回调函数
     */
    public search(options: Driving.SearchKeyword[], callback?: Driving.Callback): void;
    /** 唤起高德地图客户端驾车路径规划 */
    public searchOnAMAP(params: {
      /** 起点坐标 */
      origin: LngLatLike;
      /** 起点名称 */
      originName: string;
      /** 终点坐标 */
      destination: LngLatLike;
      /** 终点名称 */
      destinationName: string;
    }): void;
    /** 清除规划结果 */
    public clear(): void;
    /** 设置路线规划策略 */
    public setPolicy(policy: DrivingPolicy | number): void;
    /** 设置车牌号 */
    public setProvinceAndNumber(province: string, number: number): void;

    /** 获取避让道路 */
    public getAvoidRoad(): string | undefined;
    /**
     * 设置避让道路
     * - 只支持一条避让道路
     * - 避让道路和避让区域不能同时使用
     */
    public setAvoidRoad(road: string): void;
    /** 清除避让道路 */
    public clearAvoidRoad(): void;

    /** 获取避让区域 */
    public getAvoidPolygons(): LngLatLike[][] | undefined;
    /**
     * 设置避让区域
     * - 最多支持三个避让区域
     * - 避让道路和避让区域不能同时使用
     */
    public setAvoidPolygons(polygons: LngLatLike[][]): void;
    /** 清除避让区域 */
    public clearAvoidPolygons(): void;
  }
}
