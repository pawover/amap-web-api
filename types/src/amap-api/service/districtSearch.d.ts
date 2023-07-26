declare namespace AMap {
  namespace DistrictSearch {
    interface Options {
      /**
       * 查询的行政区级别或商圈
       *
       * @default "country"
       */
      level?: 'country' | 'province' | 'city' | 'district' | 'biz_area';
      /**
       * 是否显示商圈
       * - 为了能够精准的定位到街道，特别是在快递、物流、送餐等场景下，强烈建议将此设置为 `false`
       *
       * @default true
       */
      showbiz?: boolean;
      /**
       * 返回的行政区信息的详细程度
       * - `base` 基本行政区信息
       * - `all` 基本行政区信息及行政区边界坐标点
       *
       * @default "base"
       */
      extensions?: 'base' | 'all';
      /**
       * 显示下级行政区级数
       * - 行政区级别包括：国家、省/直辖市、市、区/县，4个级别，商圈为 区/县 的下一级
       * - `0` 不返回下级行政区
       * - `1` 返回下一级行政区
       * - `2` 返回下两级行政区
       * - `3` 返回下三级行政区
       *
       * @default 1
       */
      subdistrict?: 0 | 1 | 2 | 3;
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
      /** 行政区列表 */
      districtList: DistrictList[];
    }
    interface DistrictList extends DistrictRow {
      districtList: DistrictRow[];
    }
    interface DistrictRow {
      /** 行政区编码 */
      adcode: `${number}`;
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 行政区名称 */
      name: string;
      /** 行政区中心点 */
      center: ControlPoint | LngLat;
      /** 行政区级别 */
      level: 'country' | 'province' | 'city' | 'district' | 'biz_area';
      /** 行政区范围 */
      boundaries: LngLat[][];
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /**
   * 服务 - 行政区查询
   *
   * @class DistrictSearch
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class DistrictSearch extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?DistrictSearch.Options} [options] 构造参数
     */
    public constructor(options?: DistrictSearch.Options);

    /**
     * 通过关键字查询
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?DistrictSearch.Callback} [callback] 回调函数
     */
    public search(keyword: string, callback?: DistrictSearch.Callback): void;
    /**
     * 设置行政区信息的详细程度
     *
     * @public
     * @param {DistrictSearch.Options['extensions']} extensions 行政区信息的详细程度
     */
    public setExtensions(extensions: 'base' | 'all'): void;
    /**
     * 设置行政区级别
     *
     * @public
     * @param {DistrictSearch.Options['level']} extensions 行政区级别
     */
    public setLevel(extensions: DistrictSearch.Options['level']): void;
    /**
     * 设置显示下级行政区级数
     *
     * @public
     * @param {DistrictSearch.Options['subdistrict']} subdistrict 显示下级行政区级数
     */
    public setSubdistrict(subdistrict: DistrictSearch.Options['subdistrict']): void;
  }
}
