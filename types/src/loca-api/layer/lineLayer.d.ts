declare namespace Loca {
  namespace LineLayer {
    interface Options extends Layer.Options {}
    interface StyleOptions<ExtraData extends {} = {}> {
      /**
       * 线的颜色
       *
       * @default "#ffffff"
       */
      color?: Layer.StyleRender<COLOR, GeoJSON.LineString, ExtraData>;
      /**
       * 线的宽度
       */
      lineWidth?: Layer.StyleRender<number, GeoJSON.LineString, ExtraData>;
      /**
       * 线的描边宽度
       *
       * @unit 像素
       * @unitSymbol px
       */
      borderWidth?: Layer.StyleRender<number, GeoJSON.LineString, ExtraData>;
      /**
       * 线的描边颜色
       *
       * @default "#ffffff"
       */
      borderColor?: Layer.StyleRender<COLOR, GeoJSON.LineString, ExtraData>;
      /**
       * 线的虚线配置信息，`[实线长度, 虚线长度, 实线长度, 虚线长度]`
       */
      dash?: Layer.StyleRender<[number, number, number, number], GeoJSON.LineString, ExtraData>;
      /**
       * 海拔高度，代表棱柱的离地高度
       *
       * @unit 米
       * @unitSymbol m
       * @default 0
       */
      altitude?: Layer.StyleRender<number, GeoJSON.LineString, ExtraData>;
    }
  }

  /**
   * 图层 - 线
   *
   * @class LineLayer
   * @template ExtraData extends {} = {}
   * @extends {Layer<LineLayer.StyleOptions<ExtraData>>} 抽象类 - 图层
   */
  class LineLayer<ExtraData extends {} = {}> extends Layer<LineLayer.StyleOptions<ExtraData>> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?LineLayer.Options} [options] 构造参数
     */
    public constructor(options?: LineLayer.Options);

    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<'altitude' | 'lineWidth', Record<'time' | 'type' | 'value', number[]>>;
  }
}
