declare namespace Loca {
  namespace Layer {
    interface Options {
      /**
       * 图层容器，默认会添加到地图上
       * @default null
       */
      loca?: Container | null;
      /**
       * 图层是否可见
       * @default true
       */
      visible?: boolean;
      /**
       * 图层显示层级
       * @default 120
       */
      zIndex?: number;
      /**
       * 图层缩放等级范围
       * @default [2,20]
       */
      zooms?: [number, number];
      /**
       * 图层整体透明度
       * @default 1
       */
      opacity?: number;
      /**
       * 自定义图层中心
       */
      customCenter?: AMap.Vector;
      /**
       * 面是否接受光照，光照信息在 loca 对象中配置
       *
       * @default true
       */
      acceptLight?: boolean;
    }
    /** 动画配置参数 */
    interface AnimateConfig {
      /** 动画的属性 key，如 `height` */
      key: string;
      /** 动画的过渡值，范围 `[0 ~ 1]` 之间，`1` 代表真实设定的值 */
      value: number[];
      /** 动画时长，单位毫秒 */
      duration: number;
      /** 动画过渡函数，如 'CircularOut'，[相关参考](https://redmed.github.io/chito/example/easing.html) */
      easing: Animate.Easing;
      /** 一个动画 duration 中，从哪个时间开始动画 */
      startAt?: number;
      /** 是否开启来回摆动 */
      yoyo?: boolean;
      /** 是否开启随机执行动画，如果开启，图层中每个要素的动画开始的时间将随机延时，适合每个数据不同时间出现的效果 */
      random?: boolean;
      /** 随机动画延迟的时间段，每个要素的随机延迟将会在 delay 时间段内取值，单位毫秒，random 为 true 时生效 */
      delay?: number;
      /** 随机动画的动画执行时间，单位毫秒，random 为 true 时生效 */
      transform?: number;
    }
    type StyleRender<T, G extends GeoJSON.Geometry, O extends {} = {}> = T | ((index: number, item: G & O) => T);
  }

  /**
   * 抽象类 - 图层
   * - 此类是一个抽象类，作为其他图层的实现，有通用的方法和参数
   *
   * @abstract
   * @class Layer
   * @template StyleOptions extends {} = {}
   * @extends {AMap.Event<'add'>}
   */
  abstract class Layer<StyleOptions extends {} = {}> extends AMap.Event<'add'> {
    public readonly map: AMap.Map | null;
    public readonly loca: Container | null;
    public readonly customCenter: AMap.Vector;
    public readonly visible: boolean | undefined;
    public readonly opacity: number | undefined;
    public readonly zIndex: number | undefined;
    public readonly zooms: [number, number] | undefined;
    public readonly lights: Lights[];
    public readonly styleOptions: StyleOptions;

    /**
     * 构造函数
     *
     * @constructor
     * @protected
     * @param {?Layer.Options} [options] 构造参数
     */
    protected constructor(options: Layer.Options);

    /** 从 Loca 上移除图层 */
    public remove(): void;
    /** 销毁图层，此操作会先调用 remove 从 Loca 上移除，然后释放内存资源 */
    public destroy(): void;
    /**
     * 设置所属地图
     * - 参数为 `null` 时将会从地图上移除图层
     */
    public setMap(map: AMap.Map | null): void;
    /**
     * 将图层添加到 Loca 上
     * - 参数为 `null` 时将会从 Loca 上移除图层
     */
    public setLoca(loca: Container | null): void;
    /**
     * 设置图层的不透明度，将会影响整个图层的透明度信息
     *
     * @public
     * @param {number} opacity 不透明度
     */
    public setOpacity(opacity: number): void;
    /**
     * 设置图层的渲染顺序
     * - 如果图层主动开启了深度检测`depth: true`，那么深度可能将会影响显示顺序
     *
     * @public
     * @param {number} zIndex
     */
    public setzIndex(zIndex: number): void;
    /**
     * 设置图层的缩放范围，图层将在缩放范围内渲染
     *
     * @public
     * @param {[number, number]} zooms 缩放范围
     */
    public setZooms(zooms: [number, number]): void;
    /**
     * 设置自定义图层中心
     *
     * @public
     * @param {AMap.Vector} center 图层中心
     */
    public setCustomCenter(center: AMap.Vector): void;
    /**
     * 设置为可见
     *
     * @public
     * @param {?number} duration 淡入效果持续时间，单位毫秒。图层将会按照设置的时间将透明度从 0 过渡到 opacity 设置的值
     * @param {?() => void} callback 完全显示之后执行的回调函数
     */
    public show(duration?: number, callback?: () => void): void;
    /**
     * 设置为隐藏
     *
     * @public
     * @param {?number} duration 淡出效果持续时间，单位毫秒。图层将会按照设置的时间将透明度从 0 过渡到 opacity 设置的值
     * @param {?() => void} callback 完全隐藏之后执行的回调函数
     */
    public hide(duration?: number, callback?: () => void): void;
    /**
     * 图层添加后触发该事件
     * - 添加图层将触发 `locaContainer.requestRender`
     */
    public onAdd(): void;
    /**
     * 根据地图像素点，获取图层的渲染要素。如果查询结果为空，将返回 undefined
     *
     * @public
     * @param {[number,number]} pos 像素点位置 ，一般来说是鼠标相对地图容器的像素位置 [x, y]
     */
    public queryFeature(pos: [number, number]): Layer.Options | undefined;
    /**
     * 设置图层支持的动画属性。比如面图层支持高度和海拔（height、altitude）生长动画、圆点和图标图层支持半径（radius）动画、热力图支持半径和高度（radius、height）动画。
     * 具体每个图层支持的动画属性请查阅每个图层对应的样式文档。[动画曲线详细](https://redmed.github.io/chito/example/easing.html)
     *
     * @public
     * @param {Layer.AnimateConfig} config 动画配置参数
     * @param {?() => void} [callback] 动画完成后的回调函数
     */
    public addAnimate(config: Layer.AnimateConfig, callback?: () => void): void;
    /**
     * 清除图层动画效果，恢复初始状态
     *
     * @public
     */
    public clearAnimate(): void;
    /**
     * 设置图层的数据源与渲染样式
     *
     * @public
     * @param {GeoJSONSource} data 数据源
     * @param {?StyleOptions} [options] 渲染样式
     */
    public setSource(data: GeoJSONSource, options?: StyleOptions): void;
    /**
     * 更新图层样式，缺省字段将会被重置为默认值
     *
     * @public
     * @param {StyleOptions} options 渲染样式
     */
    public setStyle(options: StyleOptions): void;
    /** 获取图层标注 */
    public getLabelsLayer(): AMap.LabelsLayer | null;
    /** 获取图层基础设置 */
    public getLayerOptions(): { opacity: number; zooms: [number, number]; visible: boolean; zIndex: number };
  }
}
