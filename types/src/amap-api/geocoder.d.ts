declare namespace AMap {
  namespace Geocoder {
    interface Options {
      /**
       * 地理编码时地址描述所在的城市
       * - 可选值：城市名（中文或中文全拼）、citycode、adcode
       *
       * @default "全国"
       */
      city?: string;
      /**
       * 逆地理编码时，以给定坐标为中心点
       * 取值范围：0 - 3000
       *
       * @unit 米
       * @unitSymbol m
       * @default 1000
       */
      radius?: number;
      /**
       * 设置检索语言类型
       * 可选值：zh_cn（中文）、en（英文）
       *
       * @default "zh_cn"
       */
      lang?: 'zh_cn' | 'en';
      /**
       * 是否批量查询
       * - batch 设置为 `false` 时，只返回第一条记录
       */
      batch?: boolean;
      /**
       * 逆地理编码返回信息的详细程度
       * - `base` 基本地址信息
       * - `all` 基本地址信息及附近 POI、道路、道路交叉口等信息
       *
       * @default "base"
       */
      extensions?: 'base' | 'all';
    }
    /** 地理编码回调函数 */
    type GeocoderCallback = <S extends 'complete' | 'error' | 'no_data'>(
      status: S,
      result: S extends 'complete' ? Geocoder.GeocoderResult : S extends 'error' ? Geocoder.Error : {},
    ) => void;
    /** 逆地理编码回调函数 */
    type ReGeocoderCallback = <S extends 'complete' | 'error' | 'no_data'>(
      status: S,
      result: S extends 'complete' ? Geocoder.GeocoderResult : S extends 'error' ? Geocoder.Error : {},
    ) => void;
    type Error = string;
    interface GeocoderResult {
      /** 查询的成功状态说明 */
      info: string;
      /** 查询的结果数量 */
      count: number;
      /**
       * 查询的结果状态值
       * - 0 表示请求失败；1 表示请求成功
       */
      status: 0 | 1;
      /** 地理编码信息列表 */
      geocodes: Geocode[];
    }
    interface ReGeocoderResult {
      /** 查询的成功状态说明 */
      info: string;
      /**
       * 查询的结果状态值
       * - 0 表示请求失败；1 表示请求成功
       */
      status: 0 | 1;
      /** 地理编码信息列表 */
      regeocodes: ReGeocode[];
    }
    /** 行政区（省，市，区/县） */
    interface District {
      /** 省份 */
      province: string;
      /** 城市 */
      city: string;
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 区/县 */
      district: string;
    }
    /** 地理编码信息列表 */
    interface Geocode extends District {
      /** 国家 */
      country: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 街道 */
      street: string;
      /** 门牌 */
      number: string;
      /** 位置 */
      location: ControlPoint | LngLat;
      /** 匹配级别 */
      level:
        | '国家'
        | '省'
        | '市'
        | '区县'
        | '开发区'
        | '乡镇'
        | '村庄'
        | '热点商圈'
        | '兴趣点'
        | '门牌号'
        | '单元号'
        | '道路'
        | '道路交叉路口'
        | '公交站台、地铁站'
        | '未知';
    }
    /** 逆地理编码信息列表 */
    interface ReGeocode {
      /** 地址元素 */
      addressComponent: AddressComponent[];
      /** 道路信息 */
      roads: Road[];
      /** 道路交叉口 */
      roadinters: { roadinter: Roadinter[] };
      /** POI 信息 */
      pois: Poi.Base[];
      /** AOI 信息 */
      aois: { aoi: Aoi[] };
    }
    /** 地址元素 */
    interface AddressComponent extends District {
      /** 行政区编码 */
      adcode: `${number}`;
      /** 坐标点所在乡镇/街道（此街道为社区街道，不是道路信息） */
      township: string;
      /** 乡镇街道编码 */
      towncode: string;
      /** 社区信息列表 */
      neighborhood: Neighborhood[];
      /** 楼栋信息列表 */
      building: Building[];
      /** 门牌信息列表 */
      streetNumber: StreetNumber[];
      /** 海域 */
      seaArea: string;
      /** 经纬度所属商圈 */
      businessAreas: BusinessArea[];
    }
    /** 社区信息列表 */
    interface Neighborhood {
      /** 社区名称 */
      name: string;
      /** POI 类型 */
      type: string;
    }
    /** 楼栋信息列表 */
    interface Building {
      /** 建筑名称 */
      name: string;
      /** 建筑类型 */
      type: string;
    }
    /** 门牌信息列表 */
    interface StreetNumber {
      /** 街道名称 */
      street: string;
      /** 门牌号 */
      number: string;
      /** 坐标 */
      location: ControlPoint | LngLat;
      /** 所处街道方位 */
      direction: string;
      /** 门牌地址到请求坐标的距离，单位：米 */
      distance: number;
    }
    /** 经纬度所属商圈 */
    interface BusinessArea {
      /** 商圈信息 */
      businessArea: string;
      /** 商圈中心点坐标 */
      location: ControlPoint | LngLat;
      /** 商圈名称 */
      name: string;
      /** 商圈所在区域的行政区编码 */
      id: string;
    }
    /** 道路信息 */
    interface Road {
      /** 道路 ID */
      id: string;
      /** 道路名称 */
      name: string;
      /** 道路到坐标的距离，单位：米 */
      distance: number;
      /** 坐标 */
      location: LngLat;
      /** 与坐标的相对方位 */
      direction: string;
    }
    /** 道路交叉口信息 */
    interface Roadinter {
      /** 交叉口到坐标的距离，单位：米 */
      distance: number;
      /** 与坐标的相对方位 */
      direction: string;
      /** 交叉口经纬度 */
      location: LngLat;
      /** 第一条道路id */
      first_id: string;
      /** 第一条道路名称 */
      first_name: string;
      /** 第二条道路id */
      second_id: string;
      /** 第二条道路名称 */
      second_name: string;
    }
    /** 兴趣点 */
    namespace Poi {
      interface Base {
        /** POI 唯一标识 */
        id: string;
        /** 名称 */
        name: string;
        /** POI 类型 */
        type: string;
        /** 位置 */
        location: ControlPoint | LngLat;
        /** 地址 */
        address: string;
        /** 距离 */
        distance: number;
        /** 商店信息 */
        shopinfo: `${number}`;
        /** 联系电话 */
        tel?: string;
      }
      interface Detail {
        /** 电话 */
        tel: string;
        /** 网址 */
        website: string;
        /** 电子邮箱 */
        email: string;
        /** 省份 */
        pname: string;
        /** 省份编码 */
        pcode: string;
        /** 城市编号（区号） */
        citycode: `${number}`;
        /** 城市名称 */
        cityname: string;
        /** 行政区编码 */
        adcode: `${number}`;
        /** 城市邮编 */
        postcode: string;
        /** 行政区名称 */
        adname: string;
        /** 入口经纬度，POI 点有出入口信息时返回，否则为空 */
        entr_location: ControlPoint | LngLat | null;
        /** 出口经纬度，POI 点有出入口信息时返回，否则为空 */
        exit_location: ControlPoint | LngLat | null;
        /** 照片 */
        photos: Photo[];
        /** 是否有室内地图 */
        indoor_map: boolean;
        /** 室内地图数据 */
        indoor_data: Indoordata;
        /** 评级 */
        rating: string;
        /**
         * 是否有团购
         *
         * @deprecated 已废弃
         */
        groupbuy: boolean;
        /**
         * 是否有优惠
         *
         * @deprecated 已废弃
         */
        discount: boolean;
      }
      interface Indoordata {
        cpid: string;
        floor: string;
        truefloor: string;
      }
      interface Photo {
        title: string;
        url: string;
      }
    }
    /** 兴趣区 */
    interface Aoi {
      /** AOI ID */
      id: string;
      /** 名称 */
      name: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 坐标 */
      location: ControlPoint | LngLat;
      /** 面积，单位：平方米 */
      area: number;
      /** 输入坐标是否在 AOI 之中，`0` 代表在 AOI 内，其余整数代表距离 AOI 的距离 */
      distance: number;
      /** AOI 类型 */
      type: string;
    }
    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: GeocoderResult | ReGeocoderResult) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: string) => void;
    }
  }

  /** 兴趣点 */
  interface Poi extends Geocoder.Poi.Base, Partial<Geocoder.Poi.Detail> {}

  /**
   * 地理编码与逆地理编码
   * - 用于地址描述与经纬度坐标之间的转换
   * - 用户可以通过回调函数获取查询结果
   *
   * @class Geocoder
   * @extends {Event<ServiceEventList>} 类 - 地图事件
   */
  class Geocoder extends Event<ServiceEventList> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Geocoder.Options} [options] 构造参数
     */
    public constructor(options?: Geocoder.Options);

    /**
     * 地理编码
     * - 将地址信息转化为高德经纬度坐标信息
     *
     * @public
     * @param {string} keyword 关键字
     * @param {?Geocoder.GeocoderCallback} [callback] 回调函数
     */
    public getLocation(keyword: string, callback?: Geocoder.GeocoderCallback): void;
    /**
     * 逆地理编码
     * - 将高德经纬度坐标信息转化为地址信息
     *
     * @public
     * @param {(LngLatLike | LngLatLike[])} location 坐标
     * @param {?Geocoder.ReGeocoderCallback} [callback] 回调函数
     */
    public getAddress(location: LngLatLike | LngLatLike[], callback?: Geocoder.ReGeocoderCallback): void;
    /**
     * 设置地理编码时地址描述所在城市
     *
     * @public
     * @param {Autocomplete.Options['city']} city 城市名称/区域编码
     */
    public setCity(city: Autocomplete.Options['city']): void;

    /** 获取检索语言类型 */
    public getLang(): 'zh_cn' | 'en';
    /** 设置检索语言类型 */
    public setLang(lang: 'zh_cn' | 'en'): void;
  }
}
