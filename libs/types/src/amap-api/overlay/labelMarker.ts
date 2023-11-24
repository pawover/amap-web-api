declare namespace AMap {
  namespace LabelMarker {
    interface Options extends Overlay.Options {
      /**
       * 标注名称
       * - 作为标注标识，并非最终在地图上显示的文字内容
       * - 显示文字内容请设置 options.text.content
       */
      name?: string;
      /**
       * 标注位置
       * - 默认为地图中心点
       */
      position?: LngLatLike;
      /**
       * 是否可见
       *
       * @default true
       */
      visible?: boolean;
      /**
       * 标注透明度
       *
       * @default 1
       */
      opacity?: number;
      /**
       * 避让优先级，获取标注的优先级，该优先级用于 `LabelsLayer` 支持避让时，`rank` 值大的标注会避让掉 `rank` 值低的标注
       *
       * @default 1
       */
      rank?: number;
      /** 标注显示级别范围 */
      zooms?: [number, number];
      /** 标注图标设置 */
      icon?: Icon.Options;
      /** 标注文本设置 */
      text?: TextOptions;
    }
    /** 文本设置 */
    interface TextOptions {
      /**
       * 显示内容，可以是字符串或者 HTML DOM 对象
       * - 该属性为直接显示在标注上的文本内容
       */
      content?: string | HTMLElement;
      /**
       * 文本标注方位
       * - 若设置了 `icon`，则 `direction` 是以 `icon` 为中心的偏移，若未设置 `icon`，则相对 `position` 偏移
       *
       * @default "right"
       */
      direction?: Direction;
      /**
       * 偏移量
       * - 在 `direction` 基础上的偏移量
       *
       * @default [0,0]
       */
      offset?: PixelLike;
      /**
       * 文本显示级别范围
       * - 此属性可单独设置文本显示范围
       */
      zooms?: [number, number];
      /** 文本样式设置 */
      style?: TextStyleOptions;
    }
    /** 文本样式设置 */
    interface TextStyleOptions {
      /** 文字大小 */
      fontSize?: number;
      /** 文字颜色 */
      fillColor?: string;
      /** 文字描边颜色 */
      strokeColor?: string;
      /** 文字内边距 */
      padding?: (string | number)[];
      /** 文字背景颜色 */
      backgroundColor?: string;
      /** 文字背景描边颜色 */
      borderColor?: string;
      /** 文字背景描边粗细 */
      borderWidth?: number;
      /** 文字是否折行（`6` 个字一折行） */
      fold?: boolean;
    }
    interface Events extends Omit<EventCommon<LabelMarker>, "onHide" | "onShow"> {}
  }

  /**
   * 标记 - 标注层
   *
   * @class LabelMarker
   * @typedef {LabelMarker}
   * @extends {Overlay} 抽象类 - 覆盖物
   * @implements {Accessor.Bounds} 覆盖范围
   * @implements {Accessor.Cursor} 鼠标样式
   * @implements {Accessor.Draggable} 拖拽移动
   * @implements {Accessor.ExtData} 自定义数据
   * @implements {Accessor.Opacity} 透明度
   * @implements {Accessor.Options<LabelMarker.Options>} 属性配置
   * @implements {Accessor.Position} 位置
   * @implements {Accessor.Zooms} 显示级别范围
   * @implements {Accessor.ZIndex} 叠加层级
   * @implements {MoveAnimation} 标记动画
   */
  class LabelMarker
    extends Overlay
    implements
      Accessor.Bounds,
      Accessor.Cursor,
      Accessor.Draggable,
      Accessor.ExtData,
      Accessor.Opacity,
      Accessor.Options<LabelMarker.Options>,
      Accessor.Position,
      Accessor.Zooms,
      Accessor.ZIndex,
      MoveAnimation
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {LabelMarker.Options} options 构造参数
     */
    public constructor(options?: LabelMarker.Options);

    /** @deprecated AMap Web API 2.x 中已废弃 */
    public CLASS_NAME: "AMap.LabelMarker";
    public className: "AMap.LabelMarker";
    public type: "AMap.LabelMarker";

    public getBounds: Required<Accessor.Bounds>["getBounds"];

    public getCursor: Required<Accessor.Cursor>["getCursor"];
    public setCursor: Required<Accessor.Cursor>["setCursor"];

    public getDraggable: Required<Accessor.Draggable>["getDraggable"];

    public getExtData: Required<Accessor.ExtData>["getExtData"];

    public getOpacity: Required<Accessor.Opacity>["getOpacity"];
    public setOpacity: Required<Accessor.Opacity>["setOpacity"];

    public getOptions: Required<Accessor.Options<LabelMarker.Options>>["getOptions"];

    public getPosition: Required<Accessor.Position>["getPosition"];
    public setPosition: Required<Accessor.Position>["setPosition"];

    public getzIndex: Required<Accessor.ZIndex>["getzIndex"];
    public setzIndex: Required<Accessor.ZIndex>["setzIndex"];

    public getZooms: Required<Accessor.Zooms>["getZooms"];
    public setZooms: Required<Accessor.Zooms>["setZooms"];

    public startMove(): void;
    public stopMove(): void;
    public resumeMove(): void;
    /**
     * 暂停标记动画
     * @deprecated AMap Web API 2.x 中已废弃
     */
    public pauseMove(): void;
    public moveTo(lnglat: LngLatLike, options: MoveAnimation.MoveToOptions): void;
    /**
     * 标记动画 - 标记移动到指定位置
     *
     * @deprecated AMap Web API 2.x 中已废弃
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
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @param {LngLatLike[]} path 指定路径
     * @param {number} speed 速度（千米/小时）
     * @param {?(t: number) => number} [fn] 曲线变化函数
     * @param {?boolean} [circlable] 动画是否循环
     */
    public moveAlong(path: LngLatLike[], speed: number, fn?: (t: number) => number, circlable?: boolean): void;

    /** 设置是否置顶标注，设置为 `true` 表示该标注会显示在其他标注之前 */
    public setTop(isTop: boolean): void;
    /** 获取该标注是否因被避让从而没有显示 */
    public getCollision(): boolean | undefined;

    /** 获取标注的名称，作为标注标识，并非最终在地图上显示的文字内容 */
    public getName(): string | undefined;
    /** 设置标注的名称，作为标注标识，并非最终在地图上显示的文字内容 */
    public setName(name: string): void;

    /** 获取标注的优先级，该优先级用于 `LabelsLayer` 支持避让时，`rank` 值大的标注会避让掉 `rank` 值低的标注 */
    public getRank(): number | undefined;
    /** 设置标注的优先级，该优先级用于 `LabelsLayer` 支持避让时，`rank` 值大的标注会避让掉 `rank` 值低的标注 */
    public setRank(rank: number): void;

    /** 获取标注的文本设置 */
    public getText(): LabelMarker.TextOptions | undefined;
    /** 设置标注的文本设置 */
    public setText(textOpts: LabelMarker.TextOptions): void;

    /** 获取标注的图标设置 */
    public getIcon(): Icon.Options | undefined;
    /** 设置标注的图标设置 */
    public setIcon(iconOpts: Icon.Options): void;
  }
}
