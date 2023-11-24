declare namespace AMap {
  namespace Layer {
    interface Options {
      /**
       * 透明度
       *
       * @default 1
       */
      opacity?: number;
      /**
       * 是否显示
       *
       * @default true
       */
      visible?: boolean;
      /**
       * 显示层级
       */
      zIndex?: number;
      /**
       * 支持的缩放级别范围
       *
       * @default [2,30]
       */
      zooms?: [number, number];
    }
  }

  /**
   * 抽象类 - 图层
   *
   * @abstract
   * @class Layer
   * @template O extends Layer.Options
   * @template E extends MapEventList | OverlayEventList = 'complete'
   * @extends {Event<E>} 类 - 地图事件
   * @implements {Accessor.Map} 所属地图
   * @implements {Accessor.Opacity} 透明度
   * @implements {Accessor.ZIndex} 叠加层级
   * @implements {Accessor.Zooms} 显示级别范围
   */
  abstract class Layer<O extends Layer.Options, E extends MapEventType | OverlayEventType = "complete">
    extends Event<E>
    implements Accessor.Map, Accessor.Opacity, Accessor.ZIndex, Accessor.Zooms
  {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Layer.Options} [options] 构造参数
     */
    public constructor(options?: Layer.Options);

    public CLASS_NAME: string;
    public _zIndex: number;
    public _opts: unknown;

    public getMap: Required<Accessor.Map>["getMap"];
    public setMap: Required<Accessor.Map>["setMap"];

    public getOpacity: Required<Accessor.Opacity>["getOpacity"];
    public setOpacity: Required<Accessor.Opacity>["setOpacity"];

    public getzIndex: Required<Accessor.ZIndex>["getzIndex"];
    public setzIndex: Required<Accessor.ZIndex>["setzIndex"];

    public getZooms: Required<Accessor.Zooms>["getZooms"];
    public setZooms: Required<Accessor.Zooms>["setZooms"];

    /** 获取构造参数 */
    public getLayerConfig(): O;
    /** 获取配置参数 */
    public getSourceConfig(): O;
    /** 获取配置参数 */
    public getOptions(): O;
    /** 获取显示状态 */
    public getVisible(): boolean;
    /** 获取内部状态 */
    public getState(): Layer.Options & Recordable;
    /** 获取渲染对象 */
    public getRender(): Recordable;

    /** 销毁图层 */
    public destroy(): void;
    /** 重新加载图层 */
    public reload(): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;
  }

  class NebulaLayer extends Layer<Layer.Options> {}

  namespace MediaLayer {
    interface Options extends Layer.Options {
      /** 显示范围 */
      bounds?: BoundsLike;
    }
  }

  /**
   * 抽象类 - 媒体图层
   *
   * @abstract
   * @class MediaLayer
   * @template O extends Layer.Options
   * @template E extends HTMLElement
   * @extends {Layer<O>} 抽象类 - 图层
   */
  abstract class MediaLayer<O extends Layer.Options, E extends HTMLElement> extends Layer<O> {
    /** 获取元素 */
    public getElement(): E | null;
  }
}
