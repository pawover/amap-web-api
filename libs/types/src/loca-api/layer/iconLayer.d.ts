declare namespace Loca {
  namespace IconLayer {
    interface Options extends Layer.Options {}
    interface StyleOptions<ExtraType = any> {
      /**
       * 图标资源，接受三种值 `Svg` `Image` `Url`，可通过回调函数对每个点进行设置
       *
       * @example 'https://a.amap.com/test_cms/static/kwt/yinhang3.png'
       *
       */
      icon?: string | Fn;
      /**
       * 图标大小，影响宽高。支持动画过渡效果，动画 `key` 字段名称为 `iconSize`
       * - 单位取决于属性 `unit` 的值
       *
       * @default [20,20]
       */
      iconSize?: string | Fn;
      /**
       * 点的单位，会影响半径和边宽度
       * - `px` 像素
       * - `meter` 地理单位米
       *
       * @default "px"
       */
      unit?: 'px' | 'meter';
      /**
       * 图标的旋转角度，可以通过回调为每个点设置不同的旋转角
       *
       * @unit 角度
       * @default 0
       */
      rotation?: number | Fn;
      /**
       * 透明度，支持通过回调函数为每个点设置不同的透明度
       *
       * @default 1
       */
      opacity?: number | Fn;
      /**
       * 图标偏移的位置大小，右上方为正方向
       * - 单位取决于属性 `unit` 的值
       *
       * @default [0,0]
       */
      offset?: [number, number];
    }
  }

  /**
   * 图层 - 图标
   *
   * @class IconLayer
   * @extends {Layer<IconLayer.StyleOptions>} 抽象类 - 图层
   */

  /**
   * 图层 - 图标
   *
   * @class IconLayer
   * @template [ExtraType=any]
   * @extends {Layer<IconLayer.StyleOptions<ExtraType>>} 抽象类 - 图层
   */
  class IconLayer<ExtraType = any> extends Layer<IconLayer.StyleOptions<ExtraType>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?IconLayer.Options} [options] 构造参数
     */
    public constructor(options?: IconLayer.Options);

    /** 获取图层标注 */
    public getLabelsLayer(): AMap.LabelsLayer | null;
    /** 获取图层基础设置 */
    public getLayerOptions(): { opacity: number; zooms: [number, number]; visible: boolean; zIndex: number };
    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<'iconSize' | 'offset', Record<'time' | 'type' | 'value', number[]>>;
    /** 清除图层动画效果，恢复初始状态 */
    public clearAnimate(): void;
  }
}
