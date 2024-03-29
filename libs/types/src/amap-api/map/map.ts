declare namespace AMap {
  namespace Map {
    interface States {
      /**
       * 地图是否可通过双击鼠标放大地图
       * - 此属性可被 setStatus/getStatus 方法控制
       *
       * @default true
       */
      doubleClickZoom?: boolean;
      /**
       * 是否开启地图热点和标注的 hover 效果
       * - 桌面端默认 `true`, 移动端默认 `false`
       */
      isHotspot?: boolean;
      /**
       * 是否监控地图容器尺寸变化
       *
       * @default false
       */
      resizeEnable?: boolean;
      /**
       * 地图是否可通过鼠标滚轮缩放浏览
       * - 此属性可被 setStatus/getStatus 方法控制
       *
       * @default true
       */
      scrollWheel?: boolean;
      /**
       * 是否开启触摸缩放
       */
      touchZoom?: boolean;
      /**
       * 当值为 `1` 时，移动端以地图中心为中心双指缩放，否则以双指中间点为中心
       */
      touchZoomCenter?: number;
      /**
       * 地图是否可通过鼠标拖拽平移
       * - 此属性可被 setStatus/getStatus 方法控制
       *
       * @default true
       */
      dragEnable?: boolean;
      /**
       * 地图是否可缩放
       * - 此属性可被 setStatus/getStatus 方法控制
       *
       * @default true
       */
      zoomEnable?: boolean;
      /**
       * 地图是否使用缓动效果
       * - 此属性可被 setStatus/getStatus 方法控制
       *
       * @default true
       */
      jogEnable?: boolean;
      /**
       * 是否允许设置俯仰角度
       * - 3D 视图下为 true, 2D 视图下无效
       * @default true
       */
      pitchEnable?: boolean;
      /**
       * 地图是否可旋转
       * @default true
       */
      rotateEnable?: boolean;
      /**
       * 地图平移过程中是否使用动画
       * - 如调用 panBy、panTo、setCenter、setZoomAndCenter 等函数, 将对地图产生平移操作, 是否使用动画平移的效果
       *
       * @default true
       */
      animateEnable?: boolean;
      /**
       * 地图是否可通过键盘控制
       * - 方向键控制地图平移，"+" 和 "-" 可以控制地图的缩放, ctrl + "→" 顺时针旋转，ctrl + "←" 逆时针旋转
       * - 此属性可被setStatus/getStatus 方法控制
       * @default true
       */
      keyboardEnable?: boolean;
    }
    interface Options extends States {
      /**
       * 初始地图中心经纬度
       */
      center?: LngLatLike;
      /**
       * 地图显示的缩放级别，可以设置为浮点数
       * - 若未设置 `center` 与 `level`，则默认显示用户所在城市
       *
       * @default 15
       */
      zoom?: number;
      /**
       * 地图显示的缩放级别范围, 取值范围 `2` ~ `30`
       *
       * @default [2,20]
       */
      zooms?: [number, number];
      /**
       * 地图顺时针旋转角度，取值范围 `0` ~ `360`
       *
       * @default 0
       */
      rotation?: number;
      /**
       * 俯仰角度，最大值根据地图当前 `zoom` 级别不断增加
       * - `2D` 模式下无效
       *
       * @default 0
       */
      pitch?: number;
      /**
       * 地图视图模式，选择 `3D` 会显示 `3D` 地图效果
       *
       * @default "2D"
       */
      viewMode?: "2D" | "3D";
      /**
       * 地图显示的元素种类
       * - bg: 地图背景
       * - point: 兴趣点
       * - road: 道路
       * - building: 建筑物
       *
       * @default ['bg','point','road','building']
       */
      features?: ("bg" | "point" | "road" | "building")[];
      /**
       * 地图显示的图层数组，可以是图层中的一个或多个，默认为普通二维图层
       * - 当叠加多个图层时，普通二维图层需通过实例化一个 `TileLayer` 类实现
       * - 如果你希望创建一个默认底图图层，可以使用 `AMap.createDefaultLayer()`
       */
      layers?: MapLayerType[];
      /**
       * 是否展示地图文字和 POI 信息
       *
       * @default true
       */
      showLabel?: boolean;
      /**
       * 地图默认鼠标样式
       * - 参数应符合 `CSS` 的 `cursor` 属性规范
       *
       * @default "default"
       */
      defaultCursor?: string;
      /**
       * 地图的显示样式，目前支持两种地图样式：
       * - 第一种：自定义地图样式，可前往地图[自定义平台](https://lbs.amap.com/dev/mapstyle/index)定制自己的个性地图样式
       *   - "amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"
       * - 第二种：官方样式模版
       *   - "amap://styles/grey"
       *
       * 其他模版样式及自定义地图的使用说明见开发指南
       * - 标准色 `amap://styles/normal`,
       * - 幻影黑 `amap://styles/dark`,
       * - 月光银 `amap://styles/light`,
       * - 远山黛 `amap://styles/whitesmoke`,
       * - 青草色 `amap://styles/fresh`,
       * - 雅士灰 `amap://styles/grey`,
       * - 涂鸦色 `amap://styles/graffiti`,
       * - 马卡龙 `amap://styles/macaron`,
       * - 靛青蓝 `amap://styles/blue`,
       * - 极夜蓝 `amap://styles/darkblue`,
       * - 酱紫色 `amap://styles/wine`,
       */
      mapStyle?: `amap://styles/${string}`;
      /**
       * 地图楼块的侧面颜色
       */
      wallColor?: string | number[];
      /**
       * 地图楼块的顶面颜色
       */
      roofColor?: string | number[];
      /**
       * 天空颜色，3D 模式下带有俯仰角时会显示
       */
      skyColor?: string | number[];
      /**
       * 是否展示地图 3D 楼块
       *
       * @default true
       */
      showBuildingBlock?: boolean;
      /**
       * 是否展示室内地图
       *
       * @default false
       */
      showIndoorMap?: boolean;
      /**
       * 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像，3D视图下有效。 格式为一个经纬度的一维、二维或三维数组。[相关示例](https://lbs.amap.com/demo/jsapi-v2/example/3d/mask)
       * - 一维数组时代表一个普通多边形路径，如:
       * [lng1,lat1] , [lng2,lat2] , [lng3,lat3] ]
       * - 二维数组时代表一个带洞的多边形路径，如:
       * [ [lng4,lat4] , [lng5,lat5] , [lng6,lat6] ], [ [lng7,lat7] , [lng8,lat8] , [lng9,lat9] ] ]
       * - 三维数组时代表多个多边形路径，如:
       * [ [ [lng1,lat1] , [lng2,lat2] , [lng3,lat3] ],
       * - 一个普通多边形
       * - 一个带洞多边形 [ [lng4,lat4] , [lng5,lat5] , [lng6,lat6] ], [ [lng7,lat7] , [lng8,lat8] , [lng9,lat9] ]
       */
      mask?: number[];
    }
    interface CustomTileType {
      tileInnerCoord: number[];
      tileCoord: {
        x: number;
        y: number;
        z: number;
      };
    }
    interface Events extends Omit<EventCommon<Map>, "onHide" | "onShow">, EventDrag<Map> {
      /** 容器尺寸改变 */
      onResize?: (event?: MapsEvent<"resize", undefined>) => void;
      /** 地图加载完成 */
      onComplete?: (event?: MapsEvent<"complete", undefined>) => void;
      /** 缩放开始 */
      onZoomStart?: (event?: MapsEvent<"zoomstart", Map>) => void;
      /** 缩放结束 */
      onZoomEnd?: (event?: MapsEvent<"zoomend", Map>) => void;
      /** 缩放比例变化 */
      onZoomChange?: (event?: MapsEvent<"zoomchange", Map>) => void;
      /** 鼠标滚轮缩放地图比例 */
      onMouseWheel?: (event?: MapsEvent<"mousewheel", Map>) => void;
      /** 地图平移 */
      onMapMove?: (event?: MapsEvent<"mapmove", Map>) => void;
      /** 地图开始平移 */
      onMoveStart?: (event?: MapsEvent<"movestart", Map>) => void;
      /** 地图结束平移 */
      onMoveEnd?: (event?: MapsEvent<"moveend", Map>) => void;
      /** 鼠标点击热点 */
      onHotspotClick?: (event?: MapsEvent<"hotspotclick", Map>) => void;
      /** 鼠标经过热点 */
      onHotspotOver?: (event?: MapsEvent<"hotspotover", Map>) => void;
      /** 鼠标移出热点 */
      onHotspotOut?: (event?: MapsEvent<"hotspotout", Map>) => void;
      /** 地图旋转开始 */
      onRotateStart?: (event?: MapsEvent<"rotatestart", undefined>) => void;
      /** 地图旋转结束 */
      onRotateEnd?: (event?: MapsEvent<"rotateend", undefined>) => void;
      /** 地图旋转角度变化 */
      onRotateChange?: (event?: MapsEvent<"rotatechange", undefined>) => void;
    }
  }

  /**
   * 类 - 地图
   * - 封装了地图的属性设置、图层变更、事件交互等
   *
   * @class Map
   * @extends {Event<E>} 类 - 地图事件
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.City} 地图显示中心所在行政区
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.DefaultCursor} 地图默认鼠标指针样式
   * @implements {Accessor.MapCenter} 地图中心点
   * @implements {Accessor.MapFeatures} 地图显示元素种类
   * @implements {Accessor.MapLayers} 地图图层
   * @implements {Accessor.MapMask} 地图遮罩图层
   * @implements {Accessor.MapPitch} 地图俯仰角度
   * @implements {Accessor.MapRotation} 地图顺时针旋转角度
   * @implements {Accessor.MapStatus} 地图状态信息
   * @implements {Accessor.MapStyle} 地图显示样式
   * @implements {Accessor.Zoom} 显示级别
   * @implements {Accessor.Zooms} 显示级别范围
   */
  class Map
    extends Event<MapEventType>
    implements
      Accessor.Bounds,
      Accessor.City,
      Accessor.Cursor,
      Accessor.DefaultCursor,
      Accessor.MapCenter,
      Accessor.MapFeatures,
      Accessor.MapLayers,
      Accessor.MapMask,
      Accessor.MapPitch,
      Accessor.MapRotation,
      Accessor.MapStatus,
      Accessor.MapStyle,
      Accessor.Zoom,
      Accessor.Zooms
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {(string | HTMLDivElement)} container 地图容器，可传入 id 属性值，地图容器在创建之前必须拥有实际大小，否则可能出现底图无法渲染的问题
     * @param {Map.Options} [options] 地图构造参数
     */
    public constructor(container: string | HTMLDivElement, options: Map.Options);

    public labelMarkersLayer: { add: Fn };

    /** 获取当前地图视图范围/可视区域 */
    public getBounds: Required<Accessor.Bounds>["getBounds"];
    /** 设置当前地图视图范围/可视区域 */
    public setBounds: Required<Accessor.Bounds>["setBounds"];

    public getCity: Required<Accessor.City>["getCity"];
    public setCity: Required<Accessor.City>["setCity"];

    public setCursor: Required<Accessor.Cursor>["setCursor"];

    public getDefaultCursor: Required<Accessor.DefaultCursor>["getDefaultCursor"];
    public setDefaultCursor: Required<Accessor.DefaultCursor>["setDefaultCursor"];

    public getFeatures: Required<Accessor.MapFeatures>["getFeatures"];
    public setFeatures: Required<Accessor.MapFeatures>["setFeatures"];

    public getCenter: Required<Accessor.MapCenter>["getCenter"];
    public setCenter: Required<Accessor.MapCenter>["setCenter"];

    public getMask: Required<Accessor.MapMask>["getMask"];
    public setMask: Required<Accessor.MapMask>["setMask"];

    public getLayers: Required<Accessor.MapLayers>["getLayers"];
    public setLayers: Required<Accessor.MapLayers>["setLayers"];

    public getStatus: Required<Accessor.MapStatus>["getStatus"];
    public setStatus: Required<Accessor.MapStatus>["setStatus"];

    public getMapStyle: Required<Accessor.MapStyle>["getMapStyle"];
    public setMapStyle: Required<Accessor.MapStyle>["setMapStyle"];

    public getPitch: Required<Accessor.MapPitch>["getPitch"];
    public setPitch: Required<Accessor.MapPitch>["setPitch"];

    public getRotation: Required<Accessor.MapRotation>["getRotation"];
    public setRotation: Required<Accessor.MapRotation>["setRotation"];

    public getZoom: Required<Accessor.Zoom>["getZoom"];
    public setZoom: Required<Accessor.Zoom>["setZoom"];

    public getZooms: Required<Accessor.Zooms>["getZooms"];
    public setZooms: Required<Accessor.Zooms>["setZooms"];

    /** 添加图片 */
    public addImage(text: string, options: { url: string; callback: Fn }): void;
    /** 获取图片 */
    public getImage(): unknown;
    /** 取消过渡动画 */
    public cancelMapAnimate(): void;
    /** 清除地图上的信息窗体 */
    public clearInfoWindow(): void;
    /** 删除地图上所有的覆盖物 */
    public clearMap(): void;
    /**
     * 清除 Map 的限制区域
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public clearLimitBounds(): void;
    /** 销毁地图实例，并清空地图容器 */
    public destroy(): void;
    /** 获取地图 DOM 容器 */
    public getContainer(): HTMLDivElement;
    /** 获取地图图层 DOM 容器 */
    public getMapsContainer(): HTMLDivElement;
    /** 获取地图控件 DOM 容器 */
    public getControlContainer(): HTMLDivElement;
    /** 获取地图 DOM 容器尺寸 */
    public getSize(): Size;
    /** 获取事件绑定对象 */
    public getBindHandler(): unknown;
    /** 根据容器位置获取自定义类型 */
    public getCustomTypeByContainerPos(position: { lnglat: LngLat }): Map.CustomTileType | null;
    public getCustomTypeByPos(position: { lnglat: LngLat }): [number, number, number] | null;
    /** 获取默认图层 */
    public getDefaultLayer(): TileLayer;
    public getOutseaDataType(): string;
    public getOutseaState(): boolean;
    /** 获取地图显示模式 */
    public getView(): Record<"type", "2D" | "3D">;
    public isDOMMode(): boolean;
    public isDOMRender(): boolean;
    public loadData(): string;
    /** 获取图层渲染信息 */
    public getGL(): {
      canvas: HTMLCanvasElement;
      drawingBufferColorSpace: string;
      unpackColorSpace: string;
      drawingBufferHeight: number;
      drawingBufferWidth: number;
    };
    /** 通过构造类名获取图层 */
    public getLayerByClass(className: `AMap.${string}`): LayerType | undefined;
    /**
     * 根据矩形范围获取最佳缩放比例和中心点
     *
     * @public
     * @param {Bounds} bounds 矩形范围
     * @param {?[number,number,number,number]} [i] 容器四角像素坐标
     * @param {?number} [zoom] 当前缩放比例
     * @returns {[number,LngLat]} 缩放比例和中心点
     */
    public getFitZoomAndCenterByBounds(bounds: Bounds, i?: FourSide, zoom?: number): [number, LngLat];
    /**
     * 根据覆盖物获取最佳缩放比例和中心点
     *
     * @public
     * @param {OverlayType} overlay 覆盖物
     * @param {?FourSide} [i] 容器四角像素坐标
     * @param {?number} [zoom] 当前缩放比例
     * @returns {[number, LngLat]} 缩放比例和中心点
     */
    public getFitZoomAndCenterByOverlays(overlay: OverlayType, i?: FourSide, zoom?: number): [number, LngLat];
    /**
     * 获取硬件信息对象
     * - `hardwareAccEnabled` 是否支持硬件加速
     *
     * @public
     * @returns {{ hardwareAccEnabled: boolean }}
     */
    public getGraphicInfo(): { hardwareAccEnabled: boolean };
    /** 获取地图批准编号 */
    public getMapApprovalNumber(): string;
    /** 获取楼块图层的颜色配置 */
    public getBuildingColor(): {
      buildingColor: string | string[] | undefined;
      roofColor: BuildingLayer.Options["roofColor"];
      wallColor: BuildingLayer.Options["wallColor"];
    };
    /** 获取地图内部状态 */
    public getMapState(): Map.States;
    /**
     * 获取已添加的覆盖物对象
     *
     * @public
     * @param {?string} [type] 覆盖物类型，默认返回所有类型覆盖物
     * @returns {OverlayType[]} 返回结果不包含官方覆盖物等，比如定位 marker，周边搜索圆等
     */
    public getAllOverlays<R extends OverlayType = OverlayType>(type?: string): R[];
    /**
     * 获取当前地图比例尺
     * - 当前视图一米代表实际距离多少米
     *
     * @public
     * @param {number} dpi
     * @returns {number} 实际距离
     */
    public getScale(dpi: number): number;
    /**
     * 获取指定位置的一个像素代表实际距离多少米
     * - `point` 缺省时，默认返回当前地图中心点位置的分辨率
     *
     * @public
     * @param {?LngLatLike} [point] 指定位置
     * @returns {number} 实际距离，单位：米/像素
     */
    public getResolution(point?: LngLatLike): number;
    /**
     * 根据宽高截图
     *
     * @deprecated 源码有错误
     * @public
     * @param {number} width 宽度
     * @param {number} height 高度
     * @returns {string}
     */
    public getScreenShot(width: number, height: number): string;
    public getTileCoordByLngLat(lnglat: LngLat, i: number, z: number): { key: string; x: number; y: number; z: number };
    /**
     * 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
     *
     * @param {?(OverlayType[] | null)} [overlays] 覆盖物数组，缺省时为当前地图上添加的所有覆盖物图层
     * @param {?boolean} [immediately] 是否禁用过渡动画
     * @param {?FourSide} [avoid] 四周边距，上、下、左、右
     * @param {?number} [maxZoom] 最大缩放级别
     * @returns {Bounds} 新的地图视口范围
     */
    public setFitView(
      overlays?: OverlayType[] | null,
      immediately?: boolean,
      avoid?: FourSide,
      maxZoom?: number,
    ): Bounds;
    /** 设置是否需要更新 */
    public setNeedUpdate(need: boolean): void;
    /**
     * 加载插件
     *
     * @public
     * @param {(Plugin | Plugin[])} plugin 插件列表
     * @param {?() => void} [callBack] 加载完成后的回调函数
     */
    public plugin(plugin: Plugin | Plugin[], callBack?: () => void): void;
    /** 更新地图 */
    public updateView(map: Map, options: Map.Options): void;

    /**
     * 高德经纬度坐标 转为 莫卡托坐标
     *
     * @public
     * @unit 米
     * @unitSymbol m
     * @param {LngLatLike} lnglat 高德经纬度坐标
     * @returns {[number,number]} 莫卡托坐标，单位：米
     */
    public lngLatToCoords(lnglat: LngLatLike): [number, number];
    /**
     * 莫卡托坐标 转为 高德经纬度坐标
     *
     * @public
     * @param {[number, number]} coords 莫卡托坐标，单位：米
     * @returns {PointLike} 高德经纬度坐标
     */
    public coordsToLngLat(coords: [number, number]): PointLike;

    /** 地图经纬度坐标 转为 地图容器像素坐标 */
    public lngLatToContainer(lnglat: LngLatLike): Pixel;
    /** 地图容器像素坐标 转为 地图经纬度坐标 */
    public containerToLngLat(pixel: PixelLike): PointLike;

    /** 莫卡托坐标 转为 地图容器像素坐标 */
    public coordToContainer(coord: [number, number]): Pixel;
    /** 地图容器像素坐标 转为 莫卡托坐标 */
    public containerToCoord(pixel: PixelLike): [number, number];

    /** 地图容器像素坐标 转为 高德经纬度坐标 */
    public pixelToLngLat(pixel: Pixel | Vector, zoom?: number): PointLike;
    /** 高德经纬度坐标 转为 地图容器像素坐标 */
    public lngLatToPixel(lnglat: LngLatLike, zoom?: number): Pixel;

    /**
     * 地图缩放至指定级别并以指定点为地图显示中心点
     *
     * @public
     * @param {number} zoom 缩放等级
     * @param {LngLatLike} center 地图中心点坐标
     * @param {boolean} [immediately] 是否禁用过渡动画
     * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
     */
    public setZoomAndCenter(zoom: number, center: LngLatLike, immediately?: boolean, duration?: number): void;
    /** 地图放大一级显示 */
    public zoomIn(): void;
    /** 地图缩小一级显示 */
    public zoomOut(): void;

    /** 将图层添加至地图中 */
    public addLayer(layer: LayerType): void;
    /** 将图层从地图中移除 */
    public removeLayer(layer: LayerType): void;
    /** 判断地图中是否存在指定图层 */
    public hasLayer(layer: LayerType): boolean;

    /** 将覆盖物添加至地图中 */
    public addOverlay(overlay: OverlayType): void;
    /** 将覆盖物从地图中移除 */
    public removeOverlay(overlay: OverlayType): void;
    /** 判断地图中是否存在指定覆盖物 */
    public hasOverlay(overlay: OverlayType): boolean;

    /**
     * 添加覆盖物或图层
     *
     * @public
     * @param {(LayerType | OverlayType | LayerType[] | OverlayType[])} features 覆盖物或图层，支持数组
     */
    public add(features: LayerType | OverlayType | LayerType[] | OverlayType[]): void;
    /**
     * 删除覆盖物或图层
     *
     * @public
     * @param {(LayerType | OverlayType | LayerType[] | OverlayType[])} features 覆盖物或图层，支持数组
     */
    public remove(features: LayerType | OverlayType | LayerType[] | OverlayType[]): void;

    /**
     * 添加地图控件
     * - 可以是插件列表中的任何插件对象
     *
     * @public
     * @param {ControlType} control 地图控件
     */
    public addControl(control: ControlType): void;
    /**
     * 移除地图控件
     *
     * @public
     * @param {ControlType} control 地图控件
     */
    public removeControl(control: ControlType): void;

    /**
     * 地图中心点平移至指定点位置
     *
     * @public
     * @param {LngLatLike} lnglat 定点位置
     * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
     */
    public panTo(lnglat: LngLatLike, duration?: number): void;
    /**
     * 以像素为单位，沿 x 方向和 y 方向移动地图，x 向右为正，y 向下为正
     *
     * @public
     * @param {number} x 横轴方向
     * @param {number} y 纵轴方向
     * @param {?number} [duration] 动画时长，单位 ms，默认内部动态计算
     */
    public panBy(x: number, y: number, duration?: number): void;

    /**
     * 获取 Map 的限制区域
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public getLimitBounds(): Bounds;
    /**
     * 设置 Map 的限制区域
     * - 设定区域限制后，传入参数为限制的 Bounds，地图仅在区域内可拖拽
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public setLimitBounds(bounds: Bounds): void;
  }
}
