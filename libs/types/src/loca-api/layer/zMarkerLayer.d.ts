declare namespace Loca {
  namespace ZMarkerLayer {
    interface Options extends Layer.Options {}
    interface StyleOptions {
      /**
       * 点的单位，会影响半径和边宽度
       * - `px` 像素
       * - `meter` 地理单位米
       *
       * @default "px"
       */
      unit?: 'px' | 'meter';
      /**
       * `Marker` 的旋转角度，以正北方向为起点，顺时的针角度
       * - 可以通过回调为每个点设置不同的旋转角
       *
       * @unit 角度
       * @default 0
       */
      rotation?: number | Fn;
      /**
       * 是否让每个 `Marker` 总是朝向视角方向
       *
       * @default false
       */
      alwaysFront?: boolean;
      /**
       * 每个 `Marker` 的海拔高度，单位是米，可以通过函数回调对每个 `Marker` 设置不同的海拔
       * - 如果坐标数据中有第三维度的海拔值，将会自动获取坐标中的值
       * - 单位取决于属性 `unit` 的值
       * @default 0
       */
      altitude?: number | Fn;
    }
  }

  /**
   * 图层 - 垂直标记
   * - 垂直于大地表面
   * - 支持传入自定义 DOM 进行绘制
   * - 可以展示与数据相关的文字、图片信息
   * - 支持永远朝向屏幕的特性，非常适合对文字类信息的展示
   *
   * @class ZMarkerLayer
   * @extends {Layer<ZMarkerLayer.StyleOptions>} 抽象类 - 图层
   */
  class ZMarkerLayer extends Layer<ZMarkerLayer.StyleOptions> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?ZMarkerLayer.Options} [options] 构造参数
     */
    public constructor(options?: ZMarkerLayer.Options);

    /** 获取图层标注 */
    public getLabelsLayer(): AMap.LabelsLayer | null;
    /** 获取图层基础设置 */
    public getLayerOptions(): { opacity: number; zooms: [number, number]; visible: boolean; zIndex: number };
    /** 获取初始动画状态 */
    public getInitialAnimateState(): Record<'altitude' | 'rotation', Record<'time' | 'type' | 'value', number[]>>;
    /** 清除图层动画效果，恢复初始状态 */
    public clearAnimate(): void;
  }
}
