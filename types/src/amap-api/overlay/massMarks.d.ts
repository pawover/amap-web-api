declare namespace AMap {
  namespace MassMarks {
    interface Options {
      /**
       * 指定悬停时的鼠标样式
       * - IE仅支持 cur/ani/ico 格式，Opera 不支持自定义 cursor
       */
      cursor?: CursorStyle;
      /**
       * 图标显示透明度
       *
       * @default 1
       */
      opacity?: number;
      /**
       * 海量点显示层级范围，范围外不显示
       *
       * @default [2,20]
       */
      zooms?: [number, number];
      /**
       * 显示层级
       *
       * @default 120
       */
      zIndex?: number;
      /**
       * 海量点样式列表
       */
      style?: StyleOptions | StyleOptions[];
    }
    /** 海量点数据参数 */
    interface DataOptions {
      lnglat: LngLatLike;
      id?: number;
      name?: string;
      style?: number;
    }
    /** 海量点配置参数 */
    interface StyleOptions {
      /** 图标地址 */
      url: string;
      /** 图标尺寸 */
      size: SizeLike;
      /** 锚点位置，以图标的左上角 (0,0) 为基准点 */
      anchor: PixelLike;
      /**
       * 显示层级
       * - 默认使用样式的索引值
       */
      zIndex?: number;
    }
    interface Events extends Omit<EventsCommonProps<MassMarks>, 'onHide' | 'onShow' | 'onRightClick' | 'onTouchMove'> {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 标记 - 海量点
   *
   * @class MassMarks
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {GetSet.Cursor} 鼠标样式
   * @implements {GetSet.Opacity} 透明度
   * @implements {GetSet.ZIndex} 叠加层级
   * @implements {GetSet.Zooms} 显示级别范围
   */
  class MassMarks extends Overlay implements GetSet.Cursor, GetSet.Opacity, GetSet.ZIndex, GetSet.Zooms {
    public getCursor: () => CursorStyle;
    public setCursor: undefined;

    public getOpacity: () => number;
    public setOpacity: (opacity: number) => void;

    public getzIndex: () => number;
    public setzIndex: (zIndex: number) => void;

    public getZooms: () => [number, number];
    public setZooms: (zooms: [number, number]) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {MassMarks.DataOptions[]} data 初始化数据
     * @param {?(MassMarks.Options | MassMarks.Options[])} [options] 构造参数
     */
    public constructor(data: MassMarks.DataOptions[], options?: MassMarks.Options | MassMarks.Options[]);

    /** 清除海量点 */
    public clear(): void;

    /** 获取海量点的数据集 */
    public getData(): MassMarks.DataOptions[];
    /** 设置海量点的数据集 */
    public setData(data: MassMarks.DataOptions[]): void;

    /** 获取海量点的显示样式 */
    public getStyle(): MassMarks.StyleOptions[];
    /**
     * 获取海量点的显示样式
     * - rotation_: 旋转角度
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getStyle(): (MassMarks.StyleOptions & { rotation_: number })[];
    /** 设置海量点的显示样式，可设置单个或多个样式，每条数据通过设置的样式索引值获取对应样式 */
    public setStyle(style: MassMarks.StyleOptions | MassMarks.StyleOptions[]): void;
  }
}
