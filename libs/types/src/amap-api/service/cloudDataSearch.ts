declare namespace AMap {
  namespace CloudDataSearch {
    interface Options {
      /**
       * 需展示结果的地图实例
       * - 当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上
       */
      map?: Map;
      /**
       * 关键字
       * - 仅支持对建立了文本索引的字段进行模糊检索
       * - 请在云数据管理平台中管理 文本索引
       */
      keywords?: string;
      /**
       * 筛选条件
       * - 仅支持对建立了排序筛选索引的字段进行筛选
       * - 请在云数据管理平台中管理 排序筛选索引
       * - 支持多个筛选条件，支持对文本字段的精确匹配和对数值字段的区间筛选
       * - 筛选条件之间使用 `+` 代表 “与” 关系，如：`filter: "_name:酒店+star: [3,5]"`，等同于 SOL 语句 `WHERE_name="酒店" AND star BETWEEN 3 AND 5`
       */
      filter?: string;
      /**
       * 数据排序规则
       * 1. 支持系统预设排序规则
       *   - `_distance` 坐标与中心点距离升序排序，仅对周边检索有效
       *   - `_weight` 权重降序排序，默认 `1`
       *   - 当设置了 `keywords` 时，默认按 `_weight` 权重排序，当未设置 `keywords` 时，默认按 `_distance` 距离排序
       * 2. 支持对建立了排序筛选索引的整数或小数字段进行排序，请在云数据管理平台中管理 排序筛选索引
       *   - 升降序分别为 `"ASC"`、`"DESC"`,若仅填字段不填升降序则默认按升序排列，如 `orderBy: "age:ASC"`
       */
      orderBy?: string;
      /**
       * 当前页
       * - 取值范围 `1` ~ `100`，超过取值范围取默认值，超出实际页数取最大值
       *
       * @default 1
       */
      pageIndex?: number;
      /**
       * 分页条数
       * - 取值范围 `1` ~ `100`，超过取值范围取默认值
       *
       * @default 20
       */
      pageSize?: number;
      /**
       * 结果列表的 DOM 容器 id 或 DOM 容器
       * - 结果列表将在此容器中进行展示
       */
      panel?: string | HTMLElement;
      /**
       * 是否在地点查询结束后自动调整地图视野
       *
       * @default true
       */
      autoFitView?: boolean;
    }
    /** 回调函数 */
    interface Callback {
      (status: "complete", result: Result): void;
      (status: "error", result: string): void;
      (status: "no_data", result: Obj): void;
    }
    interface Result {
      /** 查询的成功状态说明 */
      info: string;
      /** 查询的结果数量 */
      count: number;
      /** 云数据数组，当根据数据 id 检索时，数据仅包含一个 */
      datas: CloudData[];
    }
    interface CloudData {
      _id: string;
      _name: string;
      _location: LngLat;
      _address: string;
      _updatetime: string;
      _distance: number;
      _image: ImageData;
      custom_field1: unknown;
    }
    interface ImageData {
      _id: string;
      /** 最大限制获取 1024*1024，若您的原始图片小于该尺寸，将返回原图 */
      _url: string;
      /** 经过压缩处理的图片地址,尺寸为 400*400，若期望获取体积较小的图片文件，建议使用此地址 */
      _preurl: string;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 云数据搜索
   */
  class CloudDataSearch {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {string} tableId 数据 ID
     * @param {?CloudDataSearch.Options} [options] 构造参数
     */
    public constructor(tableId: string, options?: CloudDataSearch.Options);

    /** 清除搜索结果 */
    public clear(): void;
    /** 设置云数据检索属性配置 */
    public setOptions(options: CloudDataSearch.Options): void;
    /**
     * 通过中心点经纬度、半径进行范围查询
     *
     * @public
     * @param {LngLat} center 中心点
     * @param {number} radius 半径，单位：米，取值范围 `0` ~ `50000`，超过取值范围按 3000 处理
     * @param {?CloudDataSearch.Callback} [callback] 回调函数
     */
    public searchNearBy(center: LngLat, radius: number, callback?: CloudDataSearch.Callback): void;
    /**
     * 根据数据 ID 检索位置数据
     * - ID 检索时不需要设置构造参数
     *
     * @public
     * @param {string} id 数据 ID
     * @param {?CloudDataSearch.Callback} [callback] 回调函数
     */
    public searchById(id: string, callback?: CloudDataSearch.Callback): void;
    /**
     * 根据行政区（包括全国/省/市/区县）名称，检索行政区内位置数据
     *
     * @public
     * @param {string} district 行政区名称，参数不正确时取默认值 `"全国"`
     * @param {?CloudDataSearch.Callback} [callback] 回调函数
     */
    public searchByDistrict(district: string, callback?: CloudDataSearch.Callback): void;
    /**
     * 根据多边形节点坐标数组，检索位置数据
     * - 如果数组只有两个坐标元素，则认为多边形为矩形，这两个点为矩形的左下、右上点
     * - 多边形坐标数组的起、终点必须保证多边形闭合（起、终点坐标相同）
     *
     * @public
     * @param {LngLatLike[]} path 范围路径
     * @param {?CloudDataSearch.Callback} [callback] 回调函数
     */
    public searchInPolygon(path: LngLatLike[], callback?: CloudDataSearch.Callback): void;
    /**
     * 设置当前页
     *
     * @public
     * @param {CloudDataSearch.Options['pageIndex']} pageIndex 当前页
     */
    public setPageIndex(pageIndex: CloudDataSearch.Options["pageIndex"]): void;
    /**
     * 设置分页条数
     *
     * @public
     * @param {CloudDataSearch.Options['pageSize']} pageSize 分页条数
     */
    public setPageSize(pageSize: CloudDataSearch.Options["pageSize"]): void;
  }
}
