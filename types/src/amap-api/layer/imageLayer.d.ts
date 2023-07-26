declare namespace AMap {
  namespace ImageLayer {
    interface Options extends MediaLayer.Options {
      /** 图片地址链接 */
      url: string;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 图片
   *
   * @class ImageLayer
   * @extends {MediaLayer<ImageLayer.Options, HTMLImageElement>} 抽象类 - 媒体图层
   */
  class ImageLayer extends MediaLayer<ImageLayer.Options, HTMLImageElement> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {ImageLayer.Options} options 构造参数
     */
    public constructor(options?: ImageLayer.Options);

    /** 获取 Image 的 url  */
    public getImageUrl(): string;
    /** 设置 Image 的 url  */
    public setImageUrl(url: string): void;
  }
}
