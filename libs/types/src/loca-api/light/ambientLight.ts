declare namespace Loca {
  namespace AmbientLight {
    /** 环境光属性 */
    interface Options extends Light.Options {}
  }

  /**
   * 光源 - 环境光
   * - 对于可以接受光照的图层（如 PolygonLayer 等）会增加环境光的影响
   * - 环境光只能有一个，多余的会被忽略
   *
   * @class AmbientLight
   */
  class AmbientLight {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?AmbientLight.Options} [options] 环境光属性
     * @param {?Container} [loca] 如果传入将自动添加光源到 loca
     */
    public constructor(options?: AmbientLight.Options, loca?: Container);
  }
}
