declare namespace Loca {
  namespace PointLight {
    /** 点光源属性 */
    interface Options extends Light.Options {
      /** 坐标位置 */
      position?: [number, number, number];
      /** 光源能照射的最远距离（从光源到光照强度为 0 的位置，0 就是光不会消失） */
      distance?: number;
    }
  }

  /**
   * 光源 - 点光源
   * - 对于可以接受光照的图层（如 PolygonLayer 等）会增加点光源的影响
   * - 点光源通常用来突出展示场景中的某些物体
   * - position 属性和平行光不一样，x和y是地图上的经纬度位置，z是高度，单位：米，比如北京上空一万米的位置放一个点光源：[116.39079, 39.90624, 10000]
   * - distance 属性代表光源能照射的最远距离
   *
   * @class PointLight
   */
  class PointLight {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?PointLight.Options} [options] 点光源属性
     * @param {?Container} [loca] 如果传入将自动添加光源到 loca
     */
    public constructor(options?: PointLight.Options, loca?: Container);
  }
}
