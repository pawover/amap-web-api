declare namespace Loca {
  namespace DirectionalLight {
    /** 平行光属性 */
    interface Options extends Light.Options {
      /** 坐标位置 */
      position?: [number, number, number];
      /** 光射向的目标位置 */
      target?: [number, number, number];
    }
  }

  /**
   * 光源 - 平行光
   * - 对于可以接受光照的图层（如 PolygonLayer 等）会增加平行光的影响
   * - 平行光一般用来模拟太阳的光照。 它的方向由 `position` 射向 `target`
   * - `position` 和 `target` 的格式为 [x，y，z（高度，单位：米）]（0、1组成的十字象限）
   *   - 例如: [1, 1, 1000] 代表 x:1, y:1, 高度1000米
   *   - 如果模拟一个正南方向的平行光，可以设置 target: [0,0,0], position: [0,-1,0]
   *
   * @class DirectionalLight
   */
  class DirectionalLight {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?DirectionalLight.Options} [options] 平行光属性
     * @param {?Container} [loca] 如果传入将自动添加光源到 loca
     */
    public constructor(options?: DirectionalLight.Options, loca?: Container);
  }
}
