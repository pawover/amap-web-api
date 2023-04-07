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
   * @implements {GetSet.Maps} 所属地图
   * @implements {GetSet.Opacity} 透明度
   * @implements {GetSet.ZIndex} 叠加层级
   * @implements {GetSet.Zooms} 显示级别范围
   */
  abstract class Layer<O extends Layer.Options, E extends MapEventList | OverlayEventList = 'complete'>
    extends Event<E>
    implements GetSet.Maps, GetSet.Opacity, GetSet.ZIndex, GetSet.Zooms
  {
    public getMap: () => Map | null;
    public setMap: (map: Map | null) => void;

    public getOpacity: () => number;
    public setOpacity: (opacity: number) => void;

    public getzIndex: () => number;
    public setzIndex: (zIndex: number) => void;

    public getZooms: () => [number, number];
    public setZooms: (zooms: [number, number]) => void;

    private readonly CLASS_NAME: string;
    private readonly _zIndex: number;
    private readonly _opts: unknown;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Layer.Options} [options] 构造参数
     */
    public constructor(options?: Layer.Options);

    /** 获取构造参数 */
    public getLayerConfig(): O;
    /** 获取配置参数 */
    public getSourceConfig(): O;
    /** 获取配置参数 */
    public getOptions(): O;
    /** 获取显示状态 */
    public getVisible(): boolean;
    /** 获取内部状态 */
    public getState(): Recordable & Layer.Options;
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
