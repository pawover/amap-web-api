declare namespace AMap {
  namespace Marker {
    interface Options extends Overlay.Options {
      /**
       * 标记在地图上显示的位置
       * - 默认为地图中心点
       */
      position?: LngLatLike;
      /**
       * 标记显示位置偏移量
       * - 标记指定 position 后，默认以标记左上角位置为基准点（若设置了 anchor，则以 anchor 设置位置为基准点），对准所给定的 position 位置
       * - 若需使标记指定位置对准在 position 处，需根据标记的尺寸设置一定的偏移量
       *
       * @default [0,0]
       */
      offset?: PixelLike;
      /**
       * 设置标记锚点
       *
       * @default "top-left"
       */
      anchor?: PositionDirection | PixelLike;
      /**
       * 显示内容，可以是字符串或者 HTML DOM 对象
       * - `content` 属性生效时，`icon` 属性将失效
       */
      content?: string | HTMLElement;
      /**
       * 需在标记中显示的图标
       * - 可以是一个本地图标地址，或者 Icon 对象
       * - `content` 属性生效时，此属性无效
       */
      icon?: Icon | string;
      /**
       * 添加文本标注
       * - `content` : 文本标注的内容
       * - `direction` : 文本标注方位，可选值：`top`、`right`、`bottom`、`left`、`center`，默认为 `top`
       * - `offset` : 偏移量（默认基准点为图标左上角），如设置了 `direction`，以 `direction` 方位为基准点进行偏移
       */
      label?: LabelOptions;
      /**
       * 鼠标点击时是否置顶
       *
       * @default false
       */
      topWhenClick?: boolean;
      /**
       * 鼠标滑过标记时的文字提示，不设置则鼠标滑过点标无文字提示
       */
      title?: string;
      /**
       * 旋转角度
       */
      rotate?: number;
      /**
       * 縮放比例
       */
      scale?: number;
      /**
       * 标记显示的层级范围，超过范围不显示
       *
       * @default [2,20]
       */
      zooms?: Vector;
      /**
       * 标记阴影，不设置该属性则标记无阴影
       *
       * @deprecated AMap Web API 2.0 中已废弃
       */
      shadow?: Icon;
      /**
       * 设置 Marker 的可点击区域，在定义的区域内可触发 Marker 的鼠标点击事件
       *
       * @deprecated AMap Web API 2.0 中已废弃
       */
      shape?: MarkerShape;
      /**
       * 设置拖拽标记时是否开启标记离开地图的效果
       *
       * @deprecated AMap Web API 2.0 中已废弃
       */
      raiseOnDrag?: boolean;
      /**
       * 标记的旋转角度，广泛用于改变车辆行驶方向
       * - `angle` 属性使用 CSS3 实现，仅支持 IE9 及以上版本
       *
       * @default 0
       * @deprecated AMap Web API 2.0 中已废弃
       */
      angle?: number;
      /**
       * 是否自动旋转
       * - 标记在使用 moveAlong 动画时，路径方向若有变化，标记是否自动调整角度，广泛用于自动调节车辆行驶方向。
       * - `autoRotation` 属性仅支持 IE9 及以上版本
       *
       * @default false
       * @deprecated AMap Web API 2.0 中已废弃
       */
      autoRotation?: boolean;
      /**
       * 标记的动画效果，可选值：
       * - `AMAP_ANIMATION_NONE` 无动画效果
       * - `AMAP_ANIMATION_DROP` 点标掉落效果
       * - `AMAP_ANIMATION_BOUNCE` 点标弹跳效果
       *
       * @default "AMAP_ANIMATION_NONE"
       * @deprecated AMap Web API 2.0 中已废弃
       */
      animation?: Animation;
    }
    /** 文本标注配置选项 */
    interface LabelOptions {
      /** 显示内容，可以是字符串或者 HTML DOM 对象 */
      content?: string | HTMLElement;
      /** 文本标注方位，默认 `right` */
      direction?: Direction;
      /** 文本偏移量。如设置了 direction，以 direction 方位为基准点进行偏移 */
      offset?: PixelLike;
    }
    interface Events extends EventsCommonProps<Marker>, EventsDragProps<Marker> {
      /**
       * 标记在执行 `moveTo`，`moveAlong` 动画时触发的事件
       * - `passedPath` 为 Marker 对象在 `moveAlong` 或 `moveTo` 过程中已经走过的路径
       */
      onMoving?: (obj: { passedPath: LngLat[] }) => void;
      /** 标记执行 `moveTo` 或 `moveAlong` 动画结束时触发事件 */
      onMoveEnd?: (event: MapsEvent<'moveend', Marker>) => void;
      /** 标记执行 `moveAlong` 动画一次后触发事件 */
      onMoveAlong?: () => void;
    }
  }

  /**
   * 标记 - 点
   *
   * @class Marker
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {GetSet.Anchor} 锚点
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Clickable} 是否支持鼠标单击事件
   * @implements {GetSet.Bound} 覆盖范围
   * @implements {GetSet.Draggable} 拖拽移动
   * @implements {GetSet.ExtData} 自定义数据
   * @implements {GetSet.Offset} 偏移量
   * @implements {GetSet.Options<Marker.Options>} 属性配置
   * @implements {GetSet.Position} 位置
   * @implements {GetSet.ZIndex} 叠加层级
   * @implements {MoveAnimation} 标记动画
   */
  class Marker
    extends Overlay
    implements
      GetSet.Anchor,
      GetSet.Cursor,
      GetSet.Clickable,
      GetSet.Bound,
      GetSet.Draggable,
      GetSet.ExtData,
      GetSet.Offset,
      GetSet.Options<Marker.Options>,
      GetSet.Position,
      GetSet.ZIndex,
      MoveAnimation
  {
    public getAnchor: () => PixelLike | PositionDirection;
    public setAnchor: (anchor: PixelLike | PositionDirection) => void;

    public getBounds: () => Bounds | undefined;
    public setBounds: undefined;

    public getCursor: () => CursorStyle;
    public setCursor: (cursor: CursorStyle) => void;

    public getClickable: () => boolean;
    public setClickable: (clickable: boolean) => void;

    public getDraggable: () => boolean;
    public setDraggable: (draggable: boolean) => void;

    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    public getOffset: () => Pixel;
    public setOffset: (offset: PixelLike) => void;

    public getOptions: () => Marker.Options;
    public setOptions: (options: Marker.Options) => void;

    public getPosition: () => LngLat;
    public setPosition: (position: LngLatLike) => void;

    public getzIndex: () => number;
    public setzIndex: (zIndex: number) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Marker.Options} options 构造参数
     */
    public constructor(options: Marker.Options);

    public startMove(): void;
    public stopMove(): void;
    public resumeMove(): void;
    /**
     * 暂停标记动画
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public pauseMove(): void;
    public moveTo(lnglat: LngLatLike, options: MoveAnimation.MoveToOptions): void;
    /**
     * 标记动画 - 标记移动到指定位置
     *
     * @deprecated AMap Web API 2.0 中已废弃
     * @public
     * @param {LngLatLike} lnglat 指定位置
     * @param {number} speed 速度（千米/小时）
     * @param {?(t: number) => number} [fn] 曲线变化函数
     */
    public moveTo(lnglat: LngLatLike, speed: number, fn?: (t: number) => number): void;
    public moveAlong(path: LngLatLike[], options: MoveAnimation.MoveAlongOptions): void;
    /**
     * 标记动画 - 标记沿指定路径移动
     *
     * @deprecated AMap Web API 2.0 中已废弃
     * @public
     * @param {LngLatLike[]} path 指定路径
     * @param {number} speed 速度（千米/小时）
     * @param {?(t: number) => number} [fn] 曲线变化函数
     * @param {?boolean} [circlable] 动画是否循环
     */
    public moveAlong(path: LngLatLike[], speed: number, fn?: (t: number) => number, circlable?: boolean): void;

    /** 将覆盖物加到地图上 */
    public add(map: Map): void;
    /**
     * 将覆盖物加到地图上
     * @deprecated 已弃用
     */
    public addTo(map: Map): void;
    /** 返回 GeoJSON 形式的数据 */
    public toGeometry(): GeoJSON | undefined;
    /**
     * 返回 GeoJSON 形式的数据
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public toGeoJSON(): GeoJSON | undefined;
    /**
     * 唤起高德地图客户端标注页
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public markOnAMAP(params: Recordable<'position', LngLatLike>): void;
    /** 获取标记的 DOM 容器 */
    public getContentDom(): HTMLDivElement;
    /**
     * 获取标记的 amap id
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getId(): number;

    /** 获取旋转角度 */
    public getAngle(): number;
    /** 设置旋转角度 */
    public setAngle(angle: number): void;

    /** 获取标记的文字提示 */
    public getTitle(): string | undefined;
    /** 鼠标滑过点标时的文字提示 */
    public setTitle(title: string): void;

    /** 当标记未自定义图标时，获取 Icon 内容 */
    public getIcon(): Icon | string | undefined;
    /** 当标记未自定义图标时，获取 Icon 内容 */
    public setIcon(icon: Icon | string): void;

    /** 获取标记文本配置选项 */
    public getLabel(): Marker.LabelOptions;
    /** 设置标记文本配置选项 */
    public setLabel(options: Marker.LabelOptions): void;

    /** 获取标记的显示内容 */
    public getContent(): string | HTMLElement | undefined;
    /** 设置标记的显示内容 */
    public setContent(content: string | HTMLElement): void;

    /** 获取标记是否处于置顶状态 */
    public getTop(): boolean;
    /** 设置标记是否处于置顶状态 */
    public setTop(isTop: boolean): void;

    /** 获取尺寸 */
    public getSize(): [number, number];
    /** 设置尺寸 */
    public setSize(size: SizeLike): void;

    /** 获取方向 */
    public getOrientation(): number | null;
    /** 设置方向 */
    public setOrientation(orientation: [number, number] | null): void;

    /**
     * 获取标记的动画效果
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getAnimation(): Animation;
    /**
     * 设置标记的动画效果
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setAnimation(animation: Animation): void;

    /**
     * 获取标记的文本标注方位
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getTextAlign(): Direction;
    /**
     * 设置标记的文本标注方位
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setTextAlign(direction: Direction): void;

    /**
     * 获取可点击区域
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getShape(): MarkerShape;
    /**
     * 设置可点击区域
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setShape(shape: MarkerShape): void;

    /**
     * 获取阴影图标
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getShadow(): Icon;
    /**
     * 设置阴影图标
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setShadow(icon: Icon): void;
  }
}
