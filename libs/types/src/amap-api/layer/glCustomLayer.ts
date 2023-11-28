declare namespace AMap {
  namespace GLCustomLayer {
    interface Options extends Omit<CustomLayer.Options, "alwaysRender "> {
      /**
       * 初始化函数
       * @param webGL 基于 OpenGL ES 2.0 的绘图上下文
       */
      init: (webGL: WebGLRenderingContext) => void;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: "complete" }) => void;
    }
  }

  /**
   * 图层 - 3D 自定义图层
   *
   * @class GLCustomLayer
   * @extends {Layer<GLCustomLayer.Options>} 抽象类 - 图层
   */
  class GLCustomLayer extends Layer<GLCustomLayer.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {GLCustomLayer.Options} options 构造参数
     */
    public constructor(options?: GLCustomLayer.Options);
  }
}
