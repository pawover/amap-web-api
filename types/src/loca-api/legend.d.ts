declare namespace Loca {
  namespace Legend {
    interface Options {
      /**
       * 传入参数时, 默认会把图例添加到 `locaContainer` 上
       *
       * @default null
       */
      loca?: Container | null;
      /**
       * 图例的标题样式
       *
       * @default {}
       */
      title?: Title;
      /**
       * 图例的样式
       *
       * @default {}
       */
      style?: Style;
      /**
       * 图例的值和颜色信息
       *
       * @default []
       */
      dataMap?: DataMapRow[];
    }
    /** 图例的标题样式 */
    interface Title {
      /**
       * 标题名
       *
       * @default "图例"
       */
      label?: string;
      /**
       * 标题文字大小
       *
       * @default "20px"
       */
      fontSize?: string;
      /**
       * 标题文字颜色
       *
       * @default "#ffffff"
       */
      fontColor?: RGB_HEX;
      /**
       * 标题文字粗细
       *
       * @default "bold"
       */
      fontWeight?: string;
      /**
       * 标题内填充
       *
       * @default "0 0 5px 0"
       */
      padding?: string;
      /**
       * 标题外边距
       *
       * @default "0"
       */
      margin?: string;
    }
    /** 图例的样式 */
    interface Style {
      /**
       * 图例的背景颜色
       *
       * @default "rgba(0, 0, 0, 0.7)"
       */
      backgroundColor?: string;
      /**
       * 图例的文字大小
       *
       * @default "14px"
       */
      fontSize?: string;
      /**
       * 图例的文字颜色
       *
       * @default "#ffffff"
       */
      fontColor?: RGB_HEX;
      /**
       * 图例的背板边角圆弧半径
       *
       * @default "0px"
       */
      borderRadius?: string;
      /**
       * 图例的相对定位
       *
       * @default "absolute"
       */
      position?: string;
      /**
       * 图例的顶部定位
       */
      top?: string;
      /**
       * 图例的底部定位
       */
      bottom?: string;
      /**
       * 图例的左边定位
       */
      left?: string;
      /**
       * 图例的右边定位
       */
      right?: string;
      /**
       * 图例的内填充
       *
       * @default "10px 15px"
       */
      padding?: string;
    }
    /** 图例的值和颜色信息 */
    interface DataMapRow {
      /** 显示的文本 */
      label: string;
      /** 色块图例 */
      color: string;
    }
  }

  /**
   * 图例
   * - 基础图例，可以表达颜色和数值或者种类的映射关系
   *
   * @class Legend
   */
  class Legend {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Legend.Options} [options] 构造参数
     */
    public constructor(options?: Legend.Options);
    /**
     * 设置图例样式
     *
     * @public
     * @param {?{ title?: Legend.Title; style?: Legend.Style }} [style] 样式参数
     */
    public setStyle(style?: { title?: Legend.Title; style?: Legend.Style }): void;
    /**
     * 将图例添加到地图上
     *
     * @public
     * @param {(Container | null)} loca locaContainer 实例
     */
    public addTo(loca: Container | null): void;
    /**
     * 将图例从地图上移除
     *
     * @public
     */
    public remove(): void;
  }
}
