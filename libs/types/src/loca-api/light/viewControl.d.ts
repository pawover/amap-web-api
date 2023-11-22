declare namespace Loca {
  namespace ViewControl {
    /** 镜头动画配置参数 */
    interface AnimatesConfigs {
      /** 地图中心点动画 */
      center?: Omit<Animate.Options<AMap.LngLatLike>, "control"> & {
        /** 过渡中的轨迹控制点，地图上的经纬度 */
        control: AMap.LngLatLike[];
      };
      /** 俯仰角动画 */
      pitch?: Animate.Options<number>;
      /** 缩放等级动画 */
      zoom?: Animate.Options<number>;
      /** 旋转动画 */
      rotation?: Animate.Options<number>;
    }
    /** 轨迹动画配置参数 */
    interface TrackAnimateConfig {
      /** 动画轨迹 */
      path?: AMap.LngLatLike[];
      /** 在拐弯处每秒旋转多少度 */
      rotationSpeed?: number;
      /** 动画时间控制点 */
      timing?: number[];
      /** 完成时间，毫秒（ms） */
      duration?: number;
    }
  }

  /**
   * 视角控制器
   * - 支持连续的视角动画过渡控制
   * - 和 loca 一起初始化，会在 loca.viewControl 属性上挂载，不需要使用者主动创建
   * - 如有需要，请直接使用 loca 实例上的 `viewControl` 属性
   *
   * @class ViewControl
   */
  class ViewControl {
    /**
     * 添加镜头动画
     * - 如果传入了多个镜头动画配置，那么动画会按次序依次执行
     * - `timing` 时间字段和 `control` 控制点代表的贝塞尔曲线
     * - [参考](https://cubic-bezier.com)
     *
     * @public
     * @param {?ViewControl.AnimatesConfigs[]} [configs] 镜头动画配置
     * @param {?() => void} [callback] 所有动画完成后的回调函数
     */
    public addAnimates(configs?: ViewControl.AnimatesConfigs[], callback?: () => void): void;
    /**
     * 添加一个镜头轨迹动画，镜头会按照指定的路径进行追踪
     *
     * @public
     * @param {?ViewControl.TrackAnimateConfig} [config] 轨迹动画配置
     * @param {?() => void} [callback] 动画完成后的回调函数
     */
    public addTrackAnimate(config?: ViewControl.TrackAnimateConfig, callback?: () => void): void;
    /** 清除所有动画 */
    public clearAnimates(): void;
    /** 暂停所有动画 */
    public pauseAnimate(): void;
    /** 恢复暂停的动画，当调用过 `pauseAnimate()` 方法暂停动画播放之后，用此方法来恢复动画的继续播放 */
    public resumeAnimate(): void;
  }
}
