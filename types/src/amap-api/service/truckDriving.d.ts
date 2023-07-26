declare namespace AMap {
  namespace TruckDriving {
    interface Options extends Driving.Options {
      /**
       * 车型大小
       * - `1`-`4` 分别对应小型至大型
       */
      size: 0 | 1 | 2 | 3 | 4;
      /**
       * 车身宽度
       *
       * @unit 米
       * @unitSymbol m
       * @default 2.5
       */
      width?: number;
      /**
       * 车身高度
       *
       * @unit 米
       * @unitSymbol m
       * @default 1.6
       */
      height?: number;
      /**
       * 载重
       *
       * @unit 吨
       * @unitSymbol t
       * @default 0.9
       */
      load?: number;
      /**
       * 自重
       *
       * @unit 吨
       * @unitSymbol t
       * @default 10
       */
      weight?: number;
      /**
       * 轴数
       *
       * @default 2
       */
      axlesNum?: number;
      /**
       * 车辆类型
       * - `0` 普通货车
       * - `1` 纯电动货车
       * - `2` 插电混动货车
       *
       * @default 0
       */
      cartype?: number;
      /**
       * 是否返回 `steps` 字段内容
       * - `0` 返回
       * - `1` 不返回
       * - 默认取 `showpolyline` 字段的值，如未设置则为 `1`
       */
      nosteps?: number;
      /**
       * API 版本
       *
       * @default "v4"
       */
      apiVersion?: 'v4' | 'v5';
      /**
       * 可指定具体返回的字段，仅支持 `v5` 版本货车接口
       * - `"toll_gate"` 收费站信息
       * - `"cameras"` 电子眼信息
       * - `"general"` 交通设施信息
       * - `"incident"` 交通事件信息
       */
      showFields?: 'toll_gate' | 'cameras' | 'general' | 'incident';
      /** 自定义参数 */
      customParams?: Recordable;
    }
    interface SearchPath {
      /** 位置 */
      lnglat: LngLatLike[];
      /** POI 唯一标识 */
      pid?: Geocoder.Poi.Base['id'];
      /** POI 类型 */
      type?: Geocoder.Poi.Base['type'];
    }
    interface SearchKeyword extends Driving.SearchKeyword {}
    /** 回调函数 */
    interface Callback {
      (status: 'complete', result: Result): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: Obj): void;
    }
    interface Result extends Omit<Driving.Result, 'taxi_cost'> {}
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 货车路线规划
   *
   * @class TruckDriving
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class TruckDriving extends Event<ServiceEventList> {
    /** API URL */
    public url: string;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {TruckDriving.Options} options 构造参数
     */
    public constructor(options?: TruckDriving.Options);

    /**
     * 通过起点、终点、途经点坐标或名称规划驾车路线
     * - 数组第一项将作为起点，最后一项将作为终点，其它项将作为途经点
     *
     * @public
     * @param {(TruckDriving.SearchPath[] | TruckDriving.SearchKeyword[])} options
     * @param {?TruckDriving.Callback} [callback]
     */
    public search(
      options: TruckDriving.SearchPath[] | TruckDriving.SearchKeyword[],
      callback?: TruckDriving.Callback,
    ): void;
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
