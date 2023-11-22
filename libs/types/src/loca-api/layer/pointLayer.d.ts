declare namespace Loca {
  namespace PointLayer {
    interface Options extends Layer.Options {
      /**
       * 图层里面元素的叠加效果
       *
       * @type {?('normal'|'lighter')} `normal`: 正常透明度叠加，`lighter`: 叠加后可能更加明亮
       * @default "normal"
       */
      blend?: "normal" | "lighter";
    }
    interface StyleOptions<ExtraType = any> {
      /**
       * 半径，支持动画过渡效果
       * - 单位取决于属性 `unit` 的值
       */
      radius?: Layer.StyleRender<number, GeoJSON.Point, ExtraType>;
      /**
       * 填充色，支持回调设置不同的颜色
       *
       * @default "#ffffff"
       */
      color?: Layer.StyleRender<COLOR, GeoJSON.Point, ExtraType>;
      /**
       * 点的单位，会影响半径和边宽度
       * - `px` 像素
       * - `meter` 地理单位米
       *
       * @default "px"
       */
      unit?: "px" | "meter";
      /**
       * 边框宽度
       * - 单位取决于属性 `unit` 的值
       */
      borderWidth?: Layer.StyleRender<number, GeoJSON.Point, ExtraType>;
      /**
       * 边框填充色，支持回调设置不同的颜色
       *
       * @default "#ffffff"
       */
      borderColor?: Layer.StyleRender<COLOR, GeoJSON.Point, ExtraType>;
      /**
       * 模糊半径，从哪个位置开始向边缘模糊
       * - 负数代表不进行模糊
       * - 单位取决于属性 `unit` 的值
       *
       * @default -1
       */
      blurWidth?: Layer.StyleRender<number, GeoJSON.Point, ExtraType>;
    }
  }

  /**
   * 图层 - 圆点
   * - 拥有描边的圆点
   * - 支持边缘模糊效果
   * - 支持对每个圆点的半径、颜色、描边信息单独设置
   *
   * @class PointLayer
   * @template [ExtraType=any]
   * @extends {Layer<PointLayer.StyleOptions<ExtraType>>} 抽象类 - 图层
   */

  class PointLayer<ExtraType = any> extends Layer<PointLayer.StyleOptions<ExtraType>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PointLayer.Options} [options] 构造参数
     */
    public constructor(options?: PointLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<"radius", Record<"time" | "type" | "value", number[]>>;
  }
}
