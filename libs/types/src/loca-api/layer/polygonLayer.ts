declare namespace Loca {
  namespace PolygonLayer {
    interface Options extends Layer.Options {
      /**
       * 剔除背面/前面的面，选择剔除将会提升性能
       * - `back` 剔除背面的面
       * - `front` 剔除前面的面
       * - `none` 不进行剔除
       *
       * @default 'back'
       */
      cullface?: "back" | "front" | "none";
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
    interface StyleOptions<E = any> {
      /**
       * 线的颜色
       *
       * @default "#ffffff"
       */
      color?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 面的侧面颜色
       *
       * @deprecated
       * @default "#ffffff"
       */
      sideColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 面的侧面顶部的颜色
       *
       * @default "#ffffff"
       */
      sideTopColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 面的侧面底部的颜色
       *
       * @default "#ffffff"
       */
      sideBottomColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 面的顶部的颜色
       *
       * @default "#ffffff"
       */
      topColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 面的底部的颜色
       *
       * @default "#ffffff"
       */
      bottomColor?: Layer.StyleRender<COLOR, GeoJSON.Polygon, E>;
      /**
       * 海拔高度，代表棱柱的离地高度
       * - 单位取决于属性 `unit` 的值
       *
       * @default 0
       */
      altitude?: Layer.StyleRender<number, GeoJSON.Polygon, E>;
      /**
       * 面的厚度
       * - 单位取决于属性 `unit` 的值
       *
       * @default 0
       */
      height?: Layer.StyleRender<number, GeoJSON.Polygon, E>;
      /**
       * 点的单位，会影响半径和边宽度
       * - `px` 像素
       * - `meter` 米
       *
       * @default "px"
       */
      unit?: "px" | "meter";
      /**
       * 带有高度的时候，侧面的贴图纹理，目前仅支持侧面
       * - 如果需要纹理在侧面重复贴图，需要图片的宽高是 2 的 n 次方像素值，比如 `256 x 256`，`64 x 1024`
       */
      texture?: HTMLCanvasElement | string;
      /**
       * 一个纹理图片覆盖的大小，[宽度, 高度]，单位是米，默认是宽 20 米，高 3 米贴一张纹理，会重复贴图
       */
      textureSize?: Layer.StyleRender<number, GeoJSON.Polygon, E>;
      /**
       * 面中心位置的文字标注
       *
       * @default undefined
       */
      label?: Layer.StyleRender<AMap.LabelMarker.Options, GeoJSON.Polygon, E>;
      /**
       * 文字标注相对于顶面的海拔高度
       * - 单位取决于属性 `unit` 的值
       *
       * @default 0
       */
      labelAltitude?: Layer.StyleRender<number, GeoJSON.Polygon, E>;
    }
  }

  /**
   * 图层 - 面
   * - 支持多边形、复杂多边形、带洞多边形的绘制
   *
   * @class PolygonLayer
   * @template {GeoJSON} [G=GeoJSON]
   * @template [E=any]
   * @extends {Layer<G, PolygonLayer.StyleOptions<E>>} 抽象类 - 图层
   */
  class PolygonLayer<G extends GeoJSON = GeoJSON, E = any> extends Layer<G, PolygonLayer.StyleOptions<E>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PolygonLayer.Options} [options] 构造参数
     */
    public constructor(options?: PolygonLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<"altitude" | "height", Record<"time" | "type" | "value", number[]>>;
  }
}
