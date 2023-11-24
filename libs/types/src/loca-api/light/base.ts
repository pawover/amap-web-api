declare namespace Loca {
  /** 光源相关 */
  namespace Light {
    /** 光源属性 */
    interface Options {
      /**
       * 光源的颜色
       */
      color?: string;
      /**
       * 光源的位置
       */
      position?: [number, number, number];
      /**
       * 光源照射的强度
       * - 建议值: `0` ~ `1`
       */
      intensity?: number;
      /**
       * 光源照射的目标位置
       */
      target?: [number, number, number];
      /**
       * 光源照射的最远距离
       * - 从光源到光照强度为 `0` 的位置，为 `0` 时光不会消失
       */
      distance?: number;
    }
  }
}
