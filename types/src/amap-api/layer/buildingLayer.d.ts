declare namespace AMap {
  namespace BuildingLayer {
    interface Options extends Buildings.Options {}
    /** 楼块图层 - 样式配置选项 */
    interface StyleOptions extends Buildings.StyleOptions {}
    /** 围栏信息 */
    interface StyleArea extends Buildings.StyleArea {}
    interface Events extends Buildings.Events {}
  }

  namespace Buildings {
    interface Options extends Layer.Options {
      /**
       * 楼块侧面颜色，支持 rgba、rgb、十六进制等
       *
       * @default [0.94,0.94,0.94,0.9]
       */
      wallColor?: string[] | string;
      /**
       * 楼块顶面颜色，支持 rgba、rgb、十六进制等
       *
       * @default [0.89,0.89,0.86,0.9]
       */
      roofColor?: string[] | string;
      /**
       * 楼块的高度系数因子，默认为 1，也就是正常高度，3D模式下生效
       *
       * @default 1
       */
      heightFactor?: number;
      /**
       * 深度测试
       *
       * @default true
       */
      depthTest?: boolean;
      /** 楼块的围栏和样式设置 */
      styleOpts?: StyleOptions;
    }
    /** 楼块图层 - 样式配置选项 */
    interface StyleOptions {
      /** 是否隐藏围栏之外的楼块 */
      hideWithoutStyle?: boolean;
      /** 围栏信息数组 */
      areas?: StyleArea[];
    }
    /** 围栏信息 */
    interface StyleArea {
      areas?: StyleArea;
      /** 是否隐藏围栏之外的楼块 */
      rejectTexture?: boolean;
      /** 是否显示 */
      visible?: boolean;
      /** 围栏经纬度列表 */
      path?: number[];
      /** 围栏区域内楼块顶面颜色，支持 rgba、rgb、十六进制等 */
      color1?: string[] | string;
      /** 围栏区域内楼块侧面颜色，支持 rgba、rgb、十六进制等 */
      color2?: string[] | string;
    }
    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 楼块
   * - 楼块图层专门用来展示矢量的建筑物层，与标准图层中的楼块要素的效果相同，所以使用时应先通过 `features` 属性隐藏地图的默认楼块
   * - 二者区别在于，楼块图层显示的级别范围较标准图层中的楼块大，可以用来实现一些特殊的效果，3D 视图下还可以为楼块指定高度比例系数 `heightFactor`
   * - 与其他图层不同，楼块图层的有效级别范围为 `[17, 20]`
   *
   * @class BuildingLayer
   * @extends {Buildings} 图层 - 楼块
   */
  class BuildingLayer extends Buildings {}
  /**
   * 图层 - 楼块
   * - 楼块图层专门用来展示矢量的建筑物层，与标准图层中的楼块要素的效果相同，所以使用时应先通过 `features` 属性隐藏地图的默认楼块
   * - 二者区别在于，楼块图层显示的级别范围较标准图层中的楼块大，可以用来实现一些特殊的效果，3D 视图下还可以为楼块指定高度比例系数 `heightFactor`
   * - 与其他图层不同，楼块图层的有效级别范围为 `[17, 20]`
   *
   * @class BuildingLayer
   * @extends {Layer<Buildings.Options>} 抽象类 - 图层
   */
  class Buildings extends Layer<Buildings.Options> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {?Buildings.Options} [options] 构造参数
     */
    public constructor(options?: Buildings.Options);

    /** 按区域设置楼块的颜色 */
    public setStyle(style: Buildings.StyleOptions): void;
  }
}
