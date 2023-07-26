declare namespace AMap {
  namespace Icon {
    interface Options {
      /**
       * 点标记在地图上显示的位置
       * - 默认为地图中心点
       */
      position?: LngLatLike;
      /**
       * 图标锚点，锚点位置对应设置的 position 位置
       *
       * @default "top-left"
       */
      anchor?: PositionDirection | PixelLike;
      /**
       * 图标尺寸
       *
       * @default (36,36)
       */
      size?: SizeLike;
      /**
       * 图标所在图片偏移位置
       *
       * @default [0,0]
       */
      clipOrigin?: PixelLike;
      /**
       * 图标所在图片裁剪大小
       * - 若未设置，则使用图片大小
       */
      clipSize?: PixelLike;
      /**
       * 图标所用图片的取图地址
       * - 默认为蓝色图钉图片
       */
      image?: string;
      /**
       * 图标所用图片的大小
       * - 可用于实现高清屏的高清效果
       */
      imageSize?: SizeLike;
      /**
       * 图标所用图片的偏移量
       * - 当 image 中指定了一个大图时，可通过 `size` 和 `imageOffset` 配合，显示图标的指定范围
       */
      imageOffset?: Pixel;
    }
  }

  /**
   * 表示点标记的图标
   * - 用于添加复杂点标记，即在普通点标记的基础上，添加 Icon 类，通过在 Icon 表示的大图上截取其中一部分作为标注的图标。[相关示例](https://lbs.amap.com/api/javascript-api/example/marker/custom-icon/)
   * - 构造点覆盖物图标，通过 IconOptions 设置图标属性
   *
   * @class Icon
   */
  class Icon {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Icon.Options} options 构造参数
     */
    public constructor(options?: Icon.Options);

    /** 获取图标尺寸 */
    public getSize(): Vector;
    /** 设置图标尺寸 */
    public setSize(size: SizeLike): void;

    /** 获取图标的图片地址 */
    public getImage(): string;
    /** 设置图标的图片地址 */
    public setImage(url: string): void;

    /** 获取图标的偏移量 */
    public getImageOffset(): Pixel;
    /** 设置图标的偏移量 */
    public setImageOffset(pixel: PixelLike): void;

    /** 获取图标图片大小 */
    public getImageSize(): Size;
    /** 设置图标图片大小 */
    public setImageSize(size: SizeLike): void;
  }
}
