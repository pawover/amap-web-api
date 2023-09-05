declare namespace Loca {
  namespace Animate {
    interface Options<V> {
      /** 动画的值 */
      value?: V;
      /** 控制器，x是0～1的起始区间，y是参数的值 */
      control?: [number, number][];
      /** 动画时间控制点 */
      timing?: number[];
      /** 过渡时间，毫秒（ms） */
      duration?: number;
    }
    /** Easing 函数 */
    type Easing =
      | 'Linear'
      | 'QuadraticIn'
      | 'QuadraticOut'
      | 'QuadraticInOut'
      | 'CubicIn'
      | 'CubicOut'
      | 'CubicInOut'
      | 'QuarticIn'
      | 'QuarticOut'
      | 'QuarticInOut'
      | 'QuinticIn'
      | 'QuinticOut'
      | 'QuinticInOut'
      | 'SinusoidalIn'
      | 'SinusoidalOut'
      | 'SinusoidalInOut'
      | 'ExponentialIn'
      | 'ExponentialOut'
      | 'ExponentialInOut'
      | 'CircularIn'
      | 'CircularOut'
      | 'CircularInOut'
      | 'ElasticIn'
      | 'ElasticOut'
      | 'ElasticInOut'
      | 'BackIn'
      | 'BackOut'
      | 'BackInOut'
      | 'BounceIn'
      | 'BounceOut'
      | 'BounceInOut';
  }

  /**
   * 帧控制器
   * - 用于控制地图渲染，对于一些支持动画效果的图层（比如Scatter、PulseLine），需要使用 animate 启动动画
   * - 和 loca 一起初始化，会在 loca.animate 属性上挂载，不需要使用者主动创建
   * - 如有需要，请直接使用 loca 实例上的 `viewControl` 属性
   *
   * @class Animate
   */
  class Animate {
    /** 启动帧 */
    public start(): void;
    /** 暂停帧 */
    public pause(): void;
    /** 停止帧 */
    public stop(): void;
  }
}
