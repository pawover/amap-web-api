declare namespace AMap {
  namespace GLCustomLayer {
    interface Options extends Omit<CustomLayer.Options, "alwaysRender "> {
      /** 初始化的时候，开发者可以在这个函数参数里面获取 gl 上下文，进行一些初始化的操作 */
      init: (gl: unknown) => void;
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
