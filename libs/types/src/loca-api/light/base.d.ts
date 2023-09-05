declare namespace Loca {
  /** 光源 */
  type Lights = AmbientLight | DirectionalLight | PointLight;

  /** 光源相关 */
  namespace Light {
    /** 光源属性 */
    interface Options {
      /** 环境光颜色 */
      color?: string;
      /** 光照强度，建议值: `0` ~ `1` */
      intensity?: number;
    }
  }
}
