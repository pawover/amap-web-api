declare namespace Loca {
  namespace LinkLayer {
    interface Options extends Layer.Options {}
    interface StyleOptions<E = any> extends LineLayer.StyleOptions<E> {
      /**
       * 链接线颜色
       * - 可设置颜色渐变，`color[0]`为起始色，`color[color.length-1]`为终止色，中间为过渡色
       * - `item.link` 每条线的初始信息
       * - `item.distance` 每条线的长度
       */
      lineColors?: Layer.StyleRender<COLOR[], GeoJSON.LineString, E & Recordable<"link" | "distance">>;
      /**
       * 弧顶最高高度
       * - `item.distance` 两点间的距离，可用于处理高度
       *
       * @unit 米
       * @unitSymbol m
       */
      height?: Layer.StyleRender<number, GeoJSON.LineString, E & Recordable<"distance">>;
      /**
       * 平滑步数
       * - 弧线的分隔段数，越大平滑度越好
       *
       * @default 100
       */
      smoothSteps?: Layer.StyleRender<number[], GeoJSON.LineString, E>;
    }
  }

  /**
   * 图层 - 图标
   *
   * @class LinkLayer
   * @template {GeoJSON} [G=GeoJSON]
   * @template [E=any]
   * @extends {Layer<G, LinkLayer.StyleOptions<E>>} 抽象类 - 图层
   */
  class LinkLayer<G extends GeoJSON = GeoJSON, E = any> extends Layer<G, LinkLayer.StyleOptions<E>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?LinkLayer.Options} [options] 构造参数
     */
    public constructor(options?: LinkLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<"altitude" | "lineWidth", Record<"time" | "type" | "value", number[]>>;
  }
}
