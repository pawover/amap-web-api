declare namespace AMap {
  namespace VideoLayer {
    interface Options extends MediaLayer.Options {
      /** 需要显示的 Video 的 Url，可使用同一视频的不同视频格式的 url 的数组来实现视频的浏览器兼容 */
      url?: string | string[];
      /** 加载完成是否自动播放 */
      autoplay?: boolean;
      /** 是否循环播放 */
      loop?: boolean;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 视频图层
   *
   * @deprecated AMap Web API 2.0 中已废弃
   * @class VideoLayer
   * @extends {MediaLayer<VideoLayer.Options, HTMLVideoElement>} 抽象类 - 媒体图层
   */
  class VideoLayer extends MediaLayer<VideoLayer.Options, HTMLVideoElement> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?VideoLayer.Options} [options] 构造参数
     */
    public constructor(options?: VideoLayer.Options);

    /**
     * 获取 Video 的 Url
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getVideoUrl(): string | string[] | undefined;
    /**
     * 设置 Video 的 Url
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public setVideoUrl(Url: string | string[]): void;
  }
}
