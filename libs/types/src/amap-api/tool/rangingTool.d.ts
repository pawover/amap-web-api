declare namespace AMap {
  namespace RangingTool {
    interface Options {
      /**
       * 设置量测起始点标记属性对象，包括点标记样式、大小等
       */
      startMarkerOptions?: Marker.Options;
      /**
       * 设置量测中间点标记属性对象，包括点标记样式、大小等
       */
      midMarkerOptions?: Marker.Options;
      /**
       * 设置量测结束点标记属性对象，包括点标记样式、大小等
       */
      endMarkerOptions?: Marker.Options;
      /**
       * 设置距离量测线的属性对象，包括线样式、颜色等
       */
      lineOptions?: Polyline.Options;
      /**
       * 设置距离量测过程中临时量测线的属性对象，包括线样式、颜色
       */
      tmpLineOptions?: Polyline.Options;
      /**
       * 设置量测起始点标签的文字内容
       *
       * @default "起点"
       */
      startLabelText?: string;
      /**
       * 设置量测中间点处标签的文字内容
       */
      midLabelText?: string;
      /**
       * 设置量测结束点处标签的文字内容
       */
      endLabelText?: string;
      /**
       * 设置量测起始点标签的偏移量
       *
       * @default Pixel(-6,6)
       */
      startLabelOffset?: PixelLike;
      /**
       * 设置量测中间点标签的偏移量
       *
       * @default Pixel(-6,6)
       */
      midLabelOffset?: PixelLike;
      /**
       * 设置量测结束点标签的偏移量
       *
       * @default Pixel(-6,6)
       */
      endLabelOffset?: PixelLike;
    }
  }
  /**
   * 工具 - 距离测量
   */
  class RangingTool extends Event<EditorEventList> {
    /**
     * 构造参数
     *
     * @constructor
     * @public
     * @param {Map} map 地图实例
     * @param {?RangingTool.Options} [options] 构造参数
     */
    public constructor(map: Map, options?: RangingTool.Options);

    /**
     * 开启测距工具
     */
    public turnOn(): void;
    /**
     * 关闭测距工具
     *
     * @public
     * @param {boolean} isClear 是否删除测距过程产生的覆盖物
     */
    public turnOff(isClear: boolean): void;
  }
}
