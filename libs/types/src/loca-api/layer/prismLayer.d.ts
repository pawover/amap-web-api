declare namespace Loca {
  namespace PrismLayer {
    interface Options extends Layer.Options {
      /**
       * 剔除背面/前面的面，选择剔除将会提升性能
       * - `back` 剔除背面的面
       * - `front` 剔除前面的面
       * - `none` 不进行剔除
       *
       * @default 'back'
       */
      cullface?: 'back' | 'front' | 'none';
      /**
       * 立体网格的粗糙度，值越高，说明表面越粗糙
       *
       * @default 30
       */
      shininess?: number;
      /**
       * 当面有厚度的时候，是否有侧面和底面
       *
       * @default true
       */
      hasSide?: boolean;
      /**
       * 是否开启深度检测，开启后可能会影响 `zIndex`
       *
       * @default true
       */
      depth?: boolean;
      /**
       * 文字标注图层配置
       *
       * @default undefined
       */
      labelsLayerOptions?: AMap.LabelsLayer.Options;
    }
    interface StyleOptions<ExtraType = any> {
      /**
       * 半径，支持动画过渡效果
       * - 单位取决于属性 `unit` 的值
       */
      radius?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 点的单位，会影响半径和边宽度
       * - `px` 像素
       * - `meter` 地理单位米
       *
       * @default "px"
       */
      unit?: 'px' | 'meter';
      /**
       * 棱柱的边数
       * - 如果希望做成圆柱体效果，可以尝试此字段设置一个较大的值
       *
       * @default 3
       */
      sideNumber?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 每个棱柱的旋转角度，取值范围 `[0 ~ 360]`，可以支持动画效果
       *
       * @default 0
       */
      rotation?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 海拔高度，代表棱柱的离地高度
       * - 支持动画过渡效果
       * - 单位取决于属性 `unit` 的值
       *
       * @default 0
       */
      altitude?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 棱柱的高度
       * - 支持动画过渡效果
       * - 单位取决于属性 `unit` 的值
       *
       * @default 100
       */
      height?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 棱柱的顶面颜色值
       *
       * @default "#fff"
       */
      topColor?: Layer.StyleRender<COLOR, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 棱柱的侧面顶部颜色值
       *
       * @default "#fff"
       */
      sideTopColor?: Layer.StyleRender<COLOR, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 棱柱的侧面底部颜色值
       *
       * @default "#fff"
       */
      sideBottomColor?: Layer.StyleRender<COLOR, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 棱柱中心位置的文字标注
       *
       * @default undefined
       */
      label?: Layer.StyleRender<AMap.LabelMarker.Options, GeoJSON.MultiPolygon, ExtraType>;
      /**
       * 文字标注相对于顶面的海拔高度
       * - 单位取决于属性 `unit` 的值
       *
       * @default 0
       */
      labelAltitude?: Layer.StyleRender<number, GeoJSON.MultiPolygon, ExtraType>;
    }
  }

  /**
   * 图层 - 棱柱
   * - 使用点类型数据描述带有高度的立体棱柱
   * - 使用高度、颜色、半径等样式描述点数据的不同维度属性信息
   * - 支持动画、光照效果
   *
   * @class PrismLayer
   * @extends {Layer<PrismLayer.StyleOptions>} 抽象类 - 图层
   */
  class PrismLayer<ExtraType = any> extends Layer<PrismLayer.StyleOptions<ExtraType>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PrismLayer.Options} [options] 构造参数
     */
    public constructor(options?: PrismLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<
      'altitude' | 'height' | 'radius' | 'rotation',
      Record<'time' | 'type' | 'value', number[]>
    >;
  }
}
