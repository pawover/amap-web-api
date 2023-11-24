declare namespace AMap {
  namespace HawkEye {
    interface Options extends Omit<Control.Options, "position"> {
      /**
       * 是否随主图视口变化移动
       *
       * @default true
       */
      autoMove?: boolean;
      /**
       * 是否显示视口矩形
       *
       * @default true
       */
      showRectangle?: boolean;
      /**
       * 是否显示打开关闭的按钮
       *
       * @default true
       */
      showButton?: boolean;
      /**
       * 默认是否展开
       *
       * @default true
       */
      isOpen?: boolean;
      /**
       * 缩略图要显示的地图自定义样式
       */
      mapStyle?: `amap://styles/${string}`;
      /**
       * 缩略图要显示的图层类型，默认为基础二维图层
       */
      layers?: MapLayerType[];
      /**
       * 缩略图的宽度，同 CSS 属性值
       *
       * @default "150px"
       */
      width?: string;
      /**
       * 缩略图的高度，同 CSS 属性值
       *
       * @default "180px"
       */
      height?: string;
      /**
       * 缩略图距离地图右下角的像素距离，如 [2,2]
       *
       * @default [0, 0]
       */
      offset?: [number, number];
      /**
       * 缩略图的边框样式，同 CSS 属性值，如 "double solid solid double"
       *
       * @default "double solid solid double"
       */
      borderStyle?: string;
      /**
       * 缩略图的边框颜色，同 CSS 属性值
       *
       * @default "silver"
       */
      borderColor?: string;
      /**
       * 缩略图的边框圆角，同 CSS 属性值
       *
       * @default "0px"
       */
      borderRadius?: string;
      /**
       * 缩略图的边框宽度，同 CSS 属性值
       *
       * @default "3px"
       */
      borderWidth?: string;
      /**
       * 缩略图按钮的宽度和高度，同 CSS 属性值
       *
       * @default "12px"
       */
      buttonSize?: string;
    }
  }

  /**
   * 地图控件 - 鹰眼
   * - 用于显示缩略地图，显示于地图右下角，可以随主图的视口变化而变化，也可以配置成固定位置实现类似于南海附图的效果
   *
   * @class HawkEye
   * @extends {Control} 地图控件基类
   */
  class HawkEye extends Control {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?HawkEye.Options} [options] 构造参数
     */
    public constructor(options?: HawkEye.Options);

    /** 打开鹰眼控件 */
    public open(): void;
    /** 关闭鹰眼控件 */
    public close(): void;
  }
}
