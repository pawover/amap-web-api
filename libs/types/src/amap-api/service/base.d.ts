// TODO: DragRoute and GraspRoad
declare namespace AMap {
  namespace Service {
    /** 导航主要动作 */
    type Action =
      | "无基本导航动作"
      | "左转"
      | "右转"
      | "向左前方行驶"
      | "向右前方行驶"
      | "向左后方行驶"
      | "向右后方行驶"
      | "左转调头"
      | "直行"
      | "靠左"
      | "靠右"
      | "进入环岛"
      | "离开环岛"
      | "减速行驶";
    /** 导航辅助动作 */
    type AssistantAction =
      | "无辅助导航动作"
      | "进入主路"
      | "进入辅路"
      | "进入高速"
      | "进入匝道"
      | "进入隧道"
      | "进入中间岔道"
      | "进入右岔路"
      | "进入左岔路"
      | "进入右转专用道"
      | "进入左转专用道"
      | "进入中间道路"
      | "进入右侧道路"
      | "进入左侧道路"
      | "靠右行驶进入辅路"
      | "靠左行驶进入辅路"
      | "靠右行驶进入主路"
      | "靠左行驶进入主路"
      | "靠右行驶进入右转专用道"
      | "进入轮渡"
      | "驶离轮渡"
      | "沿当前道路行驶"
      | "沿辅路行驶"
      | "沿主路行驶"
      | "到达出口"
      | "到达服务区"
      | "到达收费站"
      | "到达途经地"
      | "到达目的地的"
      | "绕环岛左转"
      | "绕环岛右转"
      | "绕环岛直行"
      | "绕环岛调头"
      | "小环岛不数出口"
      | "进入调头专用路"
      | "到达复杂路口，走右边第一出口"
      | "到达复杂路口，走右边第二出口"
      | "到达复杂路口，走右边第三出口"
      | "到达复杂路口，走右边第四出口"
      | "到达复杂路口，走右边第五出口"
      | "到达复杂路口，走左边第一出口"
      | "到达复杂路口，走左边第二出口"
      | "到达复杂路口，走左边第三出口"
      | "到达复杂路口，走左边第四出口"
      | "到达复杂路口，走左边第五出口";
    /** 公交类型 */
    type BusType =
      | "普通公交"
      | "地铁线路"
      | "轻轨线路"
      | "有轨电车"
      | "无轨电车"
      | "旅游专线"
      | "机场大巴"
      | "社区专车"
      | "磁悬浮列车线路"
      | "轮渡"
      | "索道交通"
      | "其他公交线路";
    /** 火车类型 */
    type TrainsType =
      | "普客火车"
      | "G字头的高铁火车"
      | "D字头的动车火车"
      | "C字头的城际火车"
      | "Z字头的直达特快火车"
      | "T字头的特快火车"
      | "K字头的快车火车"
      | "L字头，Y字头的临时火车"
      | "S字头的郊区线火车";
    /** 座舱类型 */
    type SeatsType =
      | "不分仓位级别"
      | "特等座"
      | "火车硬座"
      | "火车软座"
      | "火车软座1等座"
      | "火车软座2等座"
      | "火车硬卧上铺"
      | "火车硬卧中铺"
      | "火车硬卧下铺";
    /** 基础规划结果 */
    interface ResultBase {
      /** 查询的成功状态说明 */
      info: string;
      /** 规划起点坐标 */
      origin: PointLike;
      /** 规划终点坐标 */
      destination: PointLike;
      /** 规划起点名称 */
      originName?: string;
      /** 规划终点名称 */
      destinationName?: string;
      /** 规划起点 */
      start: RoutePoint<"start"> | Poi;
      /** 规划终点 */
      end: RoutePoint<"end"> | Poi;
    }
    /** 规划点 */
    interface RoutePoint<T extends "start" | "end" | "waypoint"> {
      location: PointLike;
      name: string;
      type: T;
    }
  }

  /** 驾车路线规划策略 */
  const enum DrivingPolicy {
    /** 速度优先 */
    LEAST_TIME = 0,
    /** 费用优先 */
    LEAST_FEE = 1,
    /** 距离优先 */
    LEAST_DISTANCE = 2,
    /** 避免拥堵 */
    REAL_TRAFFIC = 4,
    /** 多种策略 */
    MULTI_POLICIES = 5,
    /** 避免高速 */
    HIGHWAY = 6,
    /** 避免收费 */
    FEE_HIGHWAY = 7,
    /** 避免拥堵和收费 */
    FEE_TRAFFIC = 8,
    /** 避免拥堵，不走高速 */
    TRAFFIC_HIGHWAY = 9,
  }
  /** 公交路线规划策略 */
  const enum TransferPolicy {
    /** 最快捷模式 */
    LEAST_TIME,
    /** 最经济模式 */
    LEAST_FEE,
    /** 最少换乘模式 */
    LEAST_TRANSFER,
    /** 最少步行模式 */
    LEAST_WALK,
    /** 最舒适模式 */
    MOST_COMFORT,
    /** 不乘地铁模式 */
    NO_SUBWAY,
  }
  /** 骑行路线规划策略 */
  const enum RidingPolicy {
    /** 推荐路线及最快路线综合 */
    DEFAULT,
    /** 推荐路线 */
    RECOMMENDED,
    /** 最快路线 */
    FASTEST,
  }
}
