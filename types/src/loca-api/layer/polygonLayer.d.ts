declare namespace Loca {
  namespace PolygonLayer {
    interface Options extends PrismLayer.Options {
      /**
       * 当面有厚度的时候，有没有底面
       *
       * @default false
       */
      hasBottom?: boolean;
      /**
       * 是否隐藏被遮挡的面
       * - 如果关闭，在有透明度的时候，会显示出被遮挡的面
       *
       * @default true
       */
      blockHide?: boolean;
    }
    interface StyleOptions<ExtraData extends {} = {}> {
      /**
       * 线的颜色
       *
       * @default "#ffffff"
       */
      color?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的侧面颜色
       *
       * @deprecated
       * @default "#ffffff"
       */
      sideColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的侧面顶部的颜色
       *
       * @default "#ffffff"
       */
      sideTopColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的侧面底部的颜色
       *
       * @default "#ffffff"
       */
      sideBottomColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的顶部的颜色
       *
       * @default "#ffffff"
       */
      topColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的底部的颜色
       *
       * @default "#ffffff"
       */
      bottomColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, ExtraData>;
      /**
       * 海拔高度，代表棱柱的离地高度
       *
       * @unit 米
       * @unitSymbol m
       * @default 0
       */
      altitude?: Layer.StyleRender<number, GeoJSON.Polygon, ExtraData>;
      /**
       * 面的厚度
       *
       * @unit 米
       * @unitSymbol m
       * @default 0
       */
      height?: Layer.StyleRender<number, GeoJSON.Polygon, ExtraData>;
      /**
       * 带有高度的时候，侧面的贴图纹理，目前仅支持侧面
       * - 如果需要纹理在侧面重复贴图，需要图片的宽高是 2 的 n 次方像素值，比如 `256 x 256`，`64 x 1024`
       */
      texture?: HTMLCanvasElement | string;
      /**
       * 一个纹理图片覆盖的大小，[宽度, 高度]，单位是米，默认是宽 20 米，高 3 米贴一张纹理，会重复贴图
       */
      textureSize?: Layer.StyleRender<number, GeoJSON.Polygon, ExtraData>;
      /**
       * 面中心位置的文字标注
       *
       * @default undefined
       */
      label?: Layer.StyleRender<AMap.LabelMarker.Options, GeoJSON.Polygon, ExtraData>;
      /**
       * 文字标注相对于顶面的海拔高度
       *
       * @unit 米
       * @unitSymbol m
       * @default 0
       */
      labelAltitude?: Layer.StyleRender<number, GeoJSON.Polygon, ExtraData>;
    }
  }

  /**
   * 图层 - 面
   * - 支持多边形、复杂多边形、带洞多边形的绘制
   *
   * @class PolygonLayer
   * @template ExtraData extends {} = {}
   * @extends {Layer<PolygonLayer.StyleOptions<ExtraData>>} 抽象类 - 图层
   */
  class PolygonLayer<ExtraData extends {} = {}> extends Layer<PolygonLayer.StyleOptions<ExtraData>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PolygonLayer.Options} [options] 构造参数
     */
    public constructor(options?: PolygonLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<'altitude' | 'height', Record<'time' | 'type' | 'value', number[]>>;
  }
}
