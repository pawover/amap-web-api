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
    interface Events {
      /** 信息窗体打开之后触发事件 */
      onOpen?: (event: { type: 'open' }) => void;
      /** 信息窗体关闭之后触发事件 */
      onClose?: (event: { type: 'close' }) => void;
    }
  }

  /**
   * 信息窗体
   * - 用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示 1 个信息窗体
   *
   * @class InfoWindow
   * @extends {Event<'open' | 'close'>}
   * @implements {GetSet.ExtData} 自定义数据
   */
  class InfoWindow extends Event<'open' | 'close'> implements GetSet.ExtData {
    public getExtData: () => unknown;
    public setExtData: <D>(extraData: D) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {InfoWindow.Options} options 构造参数
     */
    public constructor(options?: InfoWindow.Options);

    /** 打开信息窗体 */
    public open(map: Map, pos: LngLatLike, height?: number): void;
    /** 关闭信息窗体 */
    public close(): void;
    /** 获取信息窗体是否打开 */
    public getIsOpen(): boolean;
    /** 设置信息窗体大小 */
    public setSize(size: SizeLike): void;
    /** 设置显示内容，可以是字符串或者 HTML DOM 对象 */
    public setContent(content: string | HTMLElement): void;
    /** 设置信息窗体锚点 */
    public setAnchor(anchor: PositionDirection): void;
  }
}
