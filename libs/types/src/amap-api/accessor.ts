declare namespace AMap {
  /** 存取器 */
  namespace Accessor {
    /** 所属地图 */
    interface Map {
      /** 获取所属地图 */
      getMap?: () => AMap.Map | null;
      /** 设置所属地图 */
      setMap?: (map: AMap.Map | null) => void;
    }

    /** 锚点 */
    interface Anchor {
      /** 获取锚点 */
      getAnchor?: () => PositionDirection | PixelLike;
      /** 设置锚点 */
      setAnchor?: (anchor: PositionDirection | PixelLike) => void;
    }

    /** 覆盖范围 */
    interface Bounds {
      /** 获取覆盖范围 */
      getBounds?: () => Bounds | undefined;
      /**
       * 设置覆盖范围
       * @param {BoundsLike} bounds 矩形范围
       * @param {?boolean} [immediately] 是否禁用过渡动画
       * @param {?FourSide} [avoid] 四周边距，上、下、左、右
       */
      setBounds?: (bounds: BoundsLike, immediately?: boolean, avoid?: FourSide) => void;
    }

    /** 中心点 */
    interface Center {
      /** 获取中心点 */
      getCenter?: () => PointLike;
      /** 设置中心点 */
      setCenter?: (center: LngLatLike) => void;
    }

    /** 地图显示中心所在行政区 */
    interface City {
      /**
       * 获取地图显示中心所在行政区
       *
       * @param {(param: Geocoder.District) => void} callBack 查询成功后的回调函数，参数为函数返回值
       * @param {?LngLatLike} [lnglat] 要查询的坐标
       */
      getCity: (callBack: (param: Geocoder.District) => void, lnglat?: LngLatLike) => void;
      /**
       * 按照行政区名称或 adcode 来设置地图显示中心
       * - 行政区名称支持 { 中国、省、市、区/县 } 名称，如遇重名的情况，会按城市编码表顺序返回第一个
       * - [下载 adcode 与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
       * - 建议不要同时使用 `setCenter()` 和 `setCity()`，如一起使用将以 `setCity()` 作为最后结果
       *
       * @param {string} cityName 照行政区名称或 adcode
       */
      setCity: (cityName: string) => void;
    }

    /** 是否支持鼠标单击事件 */
    interface Clickable {
      /** 获取是否支持鼠标单击事件 */
      getClickable?: () => boolean;
      /** 设置是否支持鼠标单击事件 */
      setClickable?: (clickable: boolean) => void;
    }

    /** 鼠标样式 */
    interface Cursor {
      /** 获取鼠标悬停时的鼠标样式 */
      getCursor?: () => CursorStyle;
      /** 设置鼠标悬停时的鼠标样式 */
      setCursor?: (cursor: CursorStyle) => void;
    }

    /** 地图默认鼠标指针样式 */
    interface DefaultCursor {
      /** 获取地图默认鼠标指针样式 */
      getDefaultCursor: () => CursorStyle;
      /** 设置地图默认鼠标指针样式 */
      setDefaultCursor: (cursor: CursorStyle) => void;
    }

    /** 拖拽移动 */
    interface Draggable {
      /** 获取是否可拖拽移动 */
      getDraggable?: () => boolean;
      /** 设置是否可拖拽移动 */
      setDraggable?: (draggable: boolean) => void;
    }

    /** 自定义数据 */
    interface ExtData {
      /** 获取自定义数据 */
      getExtData?: <D>() => D;
      /** 设置自定义数据 */
      setExtData?: <D>(extraData: D) => void;
    }

    /** 偏移量 */
    interface Offset {
      /** 获取偏移量 */
      getOffset?: () => Pixel;
      /** 设置偏移量 */
      setOffset?: (offset: PixelLike) => void;
    }

    /** 透明度 */
    interface Opacity {
      /** 获取透明度 */
      getOpacity?: () => number;
      /** 设置透明度 */
      setOpacity?: (opacity: number) => void;
    }

    /** 属性配置 */
    interface Options<O> {
      /** 获取属性配置 */
      getOptions?: () => O;
      /** 设置属性配置 */
      setOptions?: (options: O) => void;
    }

    /** 位置 */
    interface Position {
      /** 获取位置 */
      getPosition?: () => PointLike;
      /** 设置位置 */
      setPosition?: (position: LngLatLike) => void;
    }

    /** 半径 */
    interface Radius {
      /** 获取半径 */
      getRadius?: () => number;
      /** 设置半径 */
      setRadius?: (radius: number) => void;
    }

    /** 显示级别 */
    interface Zoom {
      /**
       * 获取地图缩放级别
       *
       * @param {?number} [digits] 级别的小数位精度，默认 `2`
       * @returns {number} 缩放级别
       */
      getZoom?: (digits?: number) => number;
      /**
       * 设置地图缩放级别
       *
       * @param {number} zoom 缩放级别，范围 `2` ~ `20`
       * @param {?boolean} [immediately] 是否禁用过渡动画
       * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
       */
      setZoom?: (zoom: number, immediately?: boolean, duration?: number) => void;
    }

    /** 显示级别范围 */
    interface Zooms {
      /** 获取显示级别范围 */
      getZooms?: () => [number, number];
      /** 设置显示级别范围 */
      setZooms?: (zooms: [number, number]) => void;
    }

    /** 叠加层级 */
    interface ZIndex {
      /** 获取叠加层级 */
      getzIndex?: () => number;
      /** 设置叠加层级，默认最先添加的在最底层 */
      setzIndex?: (zIndex: number) => void;
    }

    /** 地图俯仰角度 */
    interface MapPitch {
      /** 获取地图俯仰角度 */
      getPitch?: () => number;
      /**
       * 设置地图俯仰角度
       *
       * @param {number} Pitch 俯仰角度
       * @param {?boolean} [immediately] 是否禁用过渡动画
       * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
       */
      setPitch?: (Pitch: number, immediately?: boolean, duration?: number) => void;
    }

    /** 地图中心点 */
    interface MapCenter {
      /** 获取地图中心点 */
      getCenter: () => PointLike;
      /**
       * 设置地图中心点
       *
       * @param {LngLatLike} center 地图中心点坐标
       * @param {?boolean} [immediately] 是否禁用过渡动画
       * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
       */
      setCenter: (center: LngLatLike, immediately?: boolean, duration?: number) => void;
    }

    /** 地图顺时针旋转角度 */
    interface MapRotation {
      /**
       * 获取地图顺时针旋转角度，旋转原点为地图容器中心点
       * - 范围: `0` ~ `360`
       */
      getRotation?: () => number;
      /**
       * 设置地图顺时针旋转角度，旋转原点为地图容器中心点
       * - 取值范围: `0` ~ `360`
       *
       * @param {number} rotation 旋转角度
       * @param {?boolean} [immediately] 是否禁用过渡动画
       * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
       */
      setRotation?: (rotation: number, immediately?: boolean, duration?: number) => void;
    }

    /** 地图遮罩图层 */
    interface MapMask {
      /** 获取地图遮罩图层 */
      getMask: () => PointLike[] | undefined;
      /** 设置地图遮罩图层 */
      setMask: (path: LngLatLike[]) => void;
    }

    /** 地图图层 */
    interface MapLayers {
      /** 获取地图图层 */
      getLayers: () => LayerType[];
      /** 设置地图图层 */
      setLayers: (layers: LayerType[]) => void;
    }

    /** 地图状态信息 */
    interface MapStatus {
      /**
       * 获取地图状态信息
       * - 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、 是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等
       *
       * @returns {Map.States} 地图状态信息
       */
      getStatus: () => Map.States;
      /**
       * 设置地图状态信息
       * - 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、 是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等
       *
       * @param {Map.States} options 地图状态信息
       */
      setStatus: (options: Map.States) => void;
    }

    /** 地图显示元素种类 */
    interface MapFeatures {
      /**
       * 获取地图显示元素种类
       * - bg: 地图背景
       * - point: 兴趣点
       * - road: 道路
       * - building: 建筑物
       *
       * @returns {(('bg' | 'point' | 'road' | 'building')[])} 元素种类集合
       */
      getFeatures: () => ("bg" | "point" | "road" | "building")[];
      /**
       * 设置地图显示元素种类
       * - bg: 地图背景
       * - point: 兴趣点
       * - road: 道路
       * - building: 建筑物
       *
       * @param {(('bg' | 'point' | 'road' | 'building')[])} features 元素种类集合
       */
      setFeatures: (features: ("bg" | "point" | "road" | "building")[]) => void;
    }

    /** 地图显示样式 */
    interface MapStyle {
      /** 获取地图显示样式 */
      getMapStyle: () => `amap://styles/${string}`;
      /** 设置地图的显示样式 */
      setMapStyle: (mapStyle: `amap://styles/${string}`) => void;
    }

    /**
     * 高度
     * @deprecated AMap Web API 2.x 中已废弃
     */
    interface Height {
      /** 获取高度 */
      getHeight?: () => number | string;
      /** 设置高度 */
      setHeight?: (height?: number | string) => void;
    }
  }
}
