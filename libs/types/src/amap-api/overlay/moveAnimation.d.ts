declare namespace AMap {
  namespace MoveAnimation {
    /**
     * 时间函数回调
     * @param {number} passedTime 已经过去的时长
     */
    type EasingCallback = (passedTime: number) => number;
    /**
     * MoveAnimation 回调函数
     * @param {number} index 运行到点的索引
     * @param {LngLatLike} data 当前点经纬度
     */
    type AnimationCallback = (index: number, data: LngLatLike) => number;
    /** 动画参数 */
    interface MoveToOptions {
      /**
       * 每段动画持续时长
       *
       * @unit 毫秒
       * @unitSymbol ms
       */
      duration?: number | AnimationCallback;
      /**
       * 每段动画速度
       *
       * @deprecated 已弃用
       */
      speed?: number | AnimationCallback;
      /**
       * easing 时间函数
       */
      easing?: EasingCallback;
      /**
       * 覆盖物是否沿路径旋转
       *
       * @default true
       */
      autoRotation?: boolean;
    }
    /** 动画参数 */
    interface MoveAlongOptions extends MoveToOptions {
      /**
       * 动画是否循环
       *
       * @default false
       */
      circlable?: boolean;
      /**
       * 延迟动画时长
       */
      delay?: number | AnimationCallback;
      /**
       * 每段完整动画间隔时长
       *
       * @unit 毫秒
       * @unitSymbol ms
       */
      aniInterval?: number;
    }
  }

  /**
   * 标记动画
   * - 用于实现点标记沿线段或者路径轨迹移动的动画基类，可用于满足轨迹回放、实时轨迹等场景
   * - MoveAnimation 无需单独声明或初始化，Marker、Text、LabelMarker 均已继承了 MoveAnimation 的实现
   *
   * @class MoveAnimation
   */
  class MoveAnimation {
    /**
     * 开启标记动画
     */
    public startMove(): void;
    /**
     * 停止标记动画
     */
    public stopMove(): void;
    /**
     * 重启标记动画
     */
    public resumeMove(): void;
    /**
     * 标记动画 - 标记移动到指定位置
     *
     * @public
     * @param {LngLatLike} lnglat 指定位置
     * @param {?MoveAnimation.MoveToOptions} [options] 动画参数
     */
    public moveTo(lnglat: LngLatLike, options: MoveAnimation.MoveToOptions): void;
    /**
     * 标记动画 - 标记沿指定路径移动
     *
     * @public
     * @param {(LngLatLike[])} path 指定路径
     * @param {?MoveAnimation.MoveAlongOptions} [options] 动画参数
     */
    public moveAlong(path: LngLatLike[], options: MoveAnimation.MoveAlongOptions): void;
  }
}
