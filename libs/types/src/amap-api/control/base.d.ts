declare namespace AMap {
  namespace Control {
    interface Options {
      /**
       * 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
       */
      position?:
        | ('LT' | 'RT' | 'LB' | 'RB')
        | {
            top?: number;
            right?: number;
            bottom?: number;
            left?: number;
          };
      /**
       * 相对于地图容器左上角的偏移量，正数代表向右下偏移
       *
       * @default [10, 10]
       */
      offset?: PixelLike;
    }
  }

  /**
   * 地图控件基类，可扩展做自定义地图控件
   */
  abstract class Control {
    /**
     * 构造函数
     *
     * @constructor
     * @protected
     * @param {?Control.Options} [options] 构造参数
     */
    protected constructor(options?: Control.Options);

    /** 添加控件到地图上 */
    public addTo(map: Map): void;
    /** 从地图上移除控件 */
    public remove(map: Map): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;
  }
}
