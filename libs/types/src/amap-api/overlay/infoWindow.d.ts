declare namespace AMap {
  namespace InfoWindow {
    /** 信息窗体参数 */
    interface Options {
      /**
       * 信息窗体显示基点位置
       * - 默认为地图中心点
       */
      position?: LngLatLike;
      /**
       * 是否自定义窗体
       * - true: 信息窗体外框及内容完全按照 content 所设的值添加
       * - false: 在系统默认的信息窗体外框中显示 content 内容
       *
       * @default false
       */
      isCustom?: boolean;
      /**
       * 显示内容，可以是字符串或者 HTML DOM 对象
       */
      content?: string | HTMLElement;
      /**
       * 信息窗体锚点
       *
       * @default "bottom-center"
       */
      anchor?: PositionDirection;
      /**
       * 是否自动调整窗体到视野内
       * - 当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示
       */
      autoMove?: boolean;
      /**
       * `autoMove` 为 `true` 时，自动平移到视野内后的上右下左的避让宽度
       *
       * @default [20,20,20,20]
       */
      avoid?: number[];
      /**
       * 控制是否在鼠标点击地图后关闭信息窗体
       *
       * @default false
       */
      closeWhenClickMap?: boolean;
      /**
       * 信息窗体显示位置偏移量
       * - 默认基准点为信息窗体的底部中心
       * - 若设置了 `anchor`，则以 `anchor` 值为基准点
       */
      offset?: PixelLike;
      /**
       * 信息窗体尺寸
       * - `isCustom` 为 `true` 时，该属性无效
       */
      size?: SizeLike;
    }
    interface Events extends EventsInfoWindow {}
  }

  /**
   * 信息窗体
   * - 用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示 `1` 个信息窗体
   *
   * @class InfoWindow
   * @extends {Event<'open' | 'close'>}
   * @implements {Accessor.Anchor} 锚点
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Map} 所属地图
   * @implements {Accessor.Offset} 偏移量
   * @implements {Accessor.Options<InfoWindow.Options>} 属性配置
   * @implements {Accessor.Position} 位置
   * @implements {Accessor.ZIndex} 叠加层级
   */
  class InfoWindow
    extends Event<'open' | 'close'>
    implements
      Accessor.Anchor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Map,
      Accessor.Offset,
      Accessor.Options<InfoWindow.Options>,
      Accessor.Position,
      Accessor.ZIndex
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {InfoWindow.Options} options 构造参数
     */
    public constructor(options?: InfoWindow.Options);

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public CLASS_NAME: 'AMap.InfoWindow';
    public className: 'AMap.DOMOverlay';
    public type: 'AMap.InfoWindow';

    public getMap: Required<Accessor.Map>['getMap'];
    public setMap: Required<Accessor.Map>['setMap'];

    public getAnchor: Required<Accessor.Anchor>['getAnchor'];
    public setAnchor: Required<Accessor.Anchor>['setAnchor'];

    public getExtData: Required<Accessor.ExtData>['getExtData'];
    public setExtData: Required<Accessor.ExtData>['setExtData'];

    public getOptions: Required<Accessor.Options<InfoWindow.Options>>['getOptions'];
    public setOptions: Required<Accessor.Options<InfoWindow.Options>>['setOptions'];

    public getPosition: Required<Accessor.Position>['getPosition'];
    public setPosition: Required<Accessor.Position>['setPosition'];

    public getOffset: Required<Accessor.Offset>['getOffset'];
    public setOffset: Required<Accessor.Offset>['setOffset'];

    public getDraggable: Required<Accessor.Draggable>['getDraggable'];
    public setDraggable: Required<Accessor.Draggable>['setDraggable'];

    public getzIndex: Required<Accessor.ZIndex>['getzIndex'];
    public setzIndex: Required<Accessor.ZIndex>['setzIndex'];

    /** 销毁覆盖物 */
    public destroy(): void;
    /** 移除覆盖物 */
    public remove(): void;

    /** 打开信息窗体 */
    public open(map: Map, position: LngLatLike, height?: number): void;
    /** 关闭信息窗体 */
    public close(): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;

    /** 获取信息窗体尺寸 */
    public getSize(): Vector;
    /** 设置信息窗体尺寸 */
    public setSize(size: SizeLike): void;

    /** 获取信息窗体的显示内容 */
    public getContent(): string | HTMLElement | undefined;
    /** 设置信息窗体的显示内容 */
    public setContent(content: string | HTMLElement): void;

    /** 获取旋转角度 */
    public getAngle(): number;
    /** 设置旋转角度 */
    public setAngle(angle: number): void;

    /** 获取方向 */
    public getOrientation(): number | null;
    /** 设置方向 */
    public setOrientation(orientation: [number, number] | null): void;

    /** 获取信息窗体是否打开 */
    public getIsOpen(): boolean;
    /** 获取显示状态 */
    public getVisible(): boolean;
    /** 获取鼠标指针样式 */
    public getCursor(): CursorStyle | undefined;
    /** 获取 DOM 容器 */
    public getContentDom(): HTMLDivElement | undefined;
  }
}
