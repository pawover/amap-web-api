declare namespace AMap {
  namespace Walking {
    interface Options {
      /**
       * 需展示结果的地图实例
       * - 当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上
       */
      map?: Map;
      /**
       * 使用 `map` 属性时，绘制的规划线路是否显示描边
       *
       * @default true
       */
      isOutline?: boolean;
      /**
       * 是否隐藏路径规划的起始点图标
       *
       * @default false
       */
      hideMarkers?: boolean;
      /**
       * 是否延路径显示白色方向箭头
       *
       * @default true
       */
      showDir?: boolean;
      /**
       * 使用 `map` 属性时，绘制的规划线路的描边颜色
       *
       * @default "white"
       */
      outlineColor?: string;
      /**
       * 返回的路线规划信息的详细程度
       * - `base` 基本路线规划信息
       * - `all` 基本路线规划信息及详细信息
       *
       * @default "base"
       */
      extensions?: 'base' | 'all';
      /**
       * 结果列表的 DOM 容器 id 或 DOM 容器
       * - 结果列表将在此容器中进行展示
       */
      panel?: string | HTMLElement;
      /**
       * 是否在路线规划结束后自动调整地图视野
       *
       * @default true
       */
      autoFitView?: boolean;
    }
    interface SearchKeyword extends Driving.SearchKeyword {}
    /** 回调函数 */
    interface Callback {
      (status: 'complete', result: Result): void;
      (status: 'error', result: string): void;
      (status: 'no_data', result: {}): void;
    }
    interface Result extends Service.ResultBase {
      /** 查询的结果数量 */
      count: number;
      /** 规划路线列表 */
      routes: Route[];
    }
    /** 规划路线 */
    interface Route {
      /** 行驶距离，单位：米 */
      distance: number;
      /** 路线预计耗时，单位：秒 */
      time: number;
      /** 导航路段信息列表 */
      steps: Driving.Step[];
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 步行路线规划
   *
   * @class Walking
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class Walking extends Event<ServiceEventList> {
    /** API URL */
    public url: string;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Walking.Options} [options] 构造参数
     */
    public constructor(options?: Walking.Options);

    /**
     * 通过起点、终点、途经点坐标规划步行路线
     *
     * @public
     * @param {LngLatLike} origin 起点
     * @param {LngLatLike} destination 终点
     * @param {?Walking.Callback} [callback] 回调函数
     */
    public search(origin: LngLatLike, destination: LngLatLike, callback?: Walking.Callback): void;
    /**
     * 通过起点、终点、途经点名称规划步行路线
     * - 数组第一项将作为起点，最后一项将作为终点，其它项将作为途经点
     *
     * @public
     * @param {Walking.SearchKeyword[]} options 关键字参数
     * @param {?Walking.Callback} [callback] 回调函数
     */
    public search(options: Walking.SearchKeyword[], callback?: Walking.Callback): void;
    /** 唤起高德地图客户端步行路径规划 */
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
  }
}
