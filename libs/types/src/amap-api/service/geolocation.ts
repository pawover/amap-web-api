declare namespace AMap {
  namespace Geolocation {
    interface Options extends Control.Options {
      /**
       * 按钮边框颜色值
       * - 同 CSS 值，如 `silver`
       */
      borderColor?: string;
      /**
       * 按钮圆角边框值
       * - 同 CSS 值，如 `5px`
       */
      borderRadius?: string;
      /**
       * 箭头按钮的像素尺寸
       * - 同 CSS 值，如 `12px`
       */
      buttonSize?: string;
      /** 是否将定位结果转换为高德坐标 */
      convert?: boolean;
      /**
       * 进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率
       *
       * @default false
       */
      enableHighAccuracy?: boolean;
      /**
       * 定位超时时间
       *
       * @unit 毫秒
       * @unitSymbol ms
       * @default 5000
       */
      timeout?: number;
      /**
       * 浏览器原生定位的缓存时间
       *
       * @unit 毫秒
       * @unitSymbol ms
       */
      maximumAge?: number;
      /**
       * 是否显示定位按钮
       *
       * @default true
       */
      showButton?: boolean;
      /**
       * 是否显示定位精度圆
       *
       * @default true
       */
      showCircle?: boolean;
      /**
       * 是否显示定位点
       *
       * @default true
       */
      showMarker?: boolean;
      /** 定位点的样式 */
      markerOptions?: Marker.Options;
      /** 定位圆的样式 */
      circleOptions?: Circle.Options;
      /** 定位成功后是否自动移动到响应位置 */
      panToLocation?: boolean;
      /** 定位成功后是否自动调整级别 */
      zoomToAccuracy?: boolean;
      /** 是否显示打开关闭的按钮 */
      GeoLocationFirst?: boolean;
      /**
       * 是否禁用 IP 精确定位
       * - `0` 全部启用
       * - `1` 移动端禁用
       * - `2` 桌面端禁用
       * - `3` 全部禁用
       *
       * @default 0
       */
      noIpLocate?: 0 | 1 | 2 | 3;
      /**
       * 是否禁用浏览器原生定位
       * - `0` 全部启用
       * - `1` 移动端禁用
       * - `2` 桌面端禁用
       * - `3` 全部禁用
       *
       * @default 0
       */
      noGeoLocation?: 0 | 1 | 2 | 3;
      /** 是否与高德定位SDK能力结合，需要同时使用安卓版高德定位sdk，否则无效 */
      useNative?: boolean;
      /**
       * 是否在定位失败时返回基本城市信息
       *
       * @default false
       */
      getCityWhenFail?: boolean;
      /**
       * 是否需要将定位结果进行逆地理编码操作
       *
       * @default true
       */
      needAddress?: boolean;
      /**
       * 返回的定位信息的详细程度
       * - `base` 基本地址信息
       * - `all` 基本地址信息及附近 POI、道路、道路交叉口等信息
       *
       * @default "base"
       */
      extensions?: "base" | "all";
      /**
       * 定位按钮的停靠位置
       *
       * @deprecated AMap Web API 2.x 中已废弃
       * @default "RB"
       */
      buttonPosition?: "RT" | "RB" | "LT" | "LB";
      /**
       * 定位按钮与设置的停靠位置的偏移量
       *
       * @deprecated AMap Web API 2.x 中已废弃
       * @default Pixel(10,20)
       */
      buttonOffset?: Pixel;
    }
    /** 定位失败的错误信息 */
    interface Error {
      /**
       * 错误信息
       * - 参考 [错误信息列表](https://lbs.amap.com/api/javascript-api/reference/location#m_ErrorinformationList)
       *
       * @deprecated AMap Web API 2.x 中已废弃
       */
      info: string;
      /**
       * 造成定位失败的一些有用信息
       * - 参考 [失败信息说明](https://lbs.amap.com/faq/web/javascript-api/80)
       */
      message: string;
      /** 消息来源信息 */
      originMessage: string;
      /** 错误状态 */
      status: number;
    }
    /** 定位成功的结果 */
    interface Result {
      /** 所在国家 */
      country: "中华人民共和国" | string;
      /** 所在省 */
      province: string;
      /** 所在城市 */
      city: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 边界范围 */
      bounds: BoundsLike;
      /** 定位坐标 */
      position: PointLike;
      /**
       * 精度范围
       *
       * @unit 米
       * @unitSymbol m
       */
      accuracy: number;
      /**
       * 定位的类型
       * - 可能的值：
       *   - `"html5"` AMap Web API 2.x 中已废弃
       *   - `"h5"`
       *   - `"ip"`
       *   - `"ipcity"`
       *   - `"sdk"`
       */
      location_type: "html5" | "h5" | "ip" | "ipcity" | "sdk";
      /** 是否已转换为高德坐标 */
      isConverted: boolean;
      /** 定位过程的信息，用于排查定位失败原因 */
      message: string;
      /** 状态信息 "SUCCESS" */
      info: "SUCCESS" | "PERMISSION_DENIED" | "TIME_OUT" | "POSITION_UNAVAILABLE";
      code: number;
      status: number;
      /**
       * 结构化地址信息
       * - `needAddress` 设置为 `false` 时为空
       */
      addressComponent?: Geocoder.AddressComponent;
      /**
       * 规范地址信息
       * - `needAddress` 设置为 `false` 时为空
       */
      formattedAddress?: string;
      /**
       * 定位点附近的 POI 信息
       * - `extensions` 设置为 `base` 时为空
       */
      pois?: Poi[];
      /**
       * 定位点附近的道路信息
       * - `extensions` 设置为 `base` 时为空
       */
      roads?: Geocoder.Road[];
      /**
       * 定位点附近的交叉口信息
       * - `extensions` 设置为 `base` 时为空
       */
      crosses?: Geocoder.Roadinter[];
    }
    /** 地理定位回调函数 */
    type Callback = <S extends "complete" | "error">(status: S, result: S extends "complete" ? Result : Error) => void;

    interface Events {
      /** 查询成功时的触发事件 */
      onComplete?: (result: Result) => void;
      /** 查询失败时的触发事件 */
      onError?: (result: Error) => void;
    }
  }

  /**
   * 服务 - 地理定位
   * - 融合了浏览器定位、高精度IP定位、安卓SDK辅助定位等多种定位方式，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能
   * - 仅可用于支持 HTML5 原生定位接口的浏览器
   * - 如用户禁用了定位权限，需要用户开启设备和浏览器的定位权限，并在浏览器弹窗中允许使用定位
   *
   * @class Geolocation
   * @extends {Event<ServiceEventType>} 类 - 地图事件
   */
  class Geolocation extends Event<ServiceEventType> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Geolocation.Options} options 构造参数
     */
    public constructor(options?: Geolocation.Options);

    /** 添加地理定位 */
    public addTo(map: Map): void;
    /** 移除地理定位 */
    public remove(): void;
    public removeFrom(f: OverlayType | LayerType): void;

    /** 获取用户 IP 的精确位置，精确 IP 定位服务目前无法完全覆盖所有用户 IP，有 5% 的失败几率 */
    public getCurrentPosition(callback: Geolocation.Callback): void;
    /** 获取用户 IP 的城市信息，包括省、市名称，adcode、citycode，城市中心点、城市矩形边界等 */
    public getCityInfo(callback: Geolocation.Callback): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;
  }
}
