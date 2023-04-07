declare namespace AMap {
  namespace Overlay {
    interface Options {
      /**
       * 所属地图
       *
       * @deprecated AMap Web API 2.0 中已废弃
       */
      map?: Map;
      /**
       * 是否将覆盖物的事件冒泡到地图上
       * - 自 v1.3 新增
       *
       * @default false
       */
      bubble?: boolean;
      /**
       * 是否可点击覆盖物
       *
       * @default true
       */
      clickable?: boolean;
      /**
       * 指定鼠标悬停时的鼠标样式，自定义 cursor
       * - IE 仅支持 `cur`/`ani`/`ico` 格式
       * - Opera 不支持自定义 cursor
       */
      cursor?: CursorStyle;
      /**
       * 是否支持拖拽覆盖物
       *
       * @default false
       */
      draggable?: boolean;
      /**
       * 用户自定义属性，支持 AMap Web API 任意数据类型
       * - 可将自定义数据保存在该属性上，方便后续操作使用
       */
      extData?: unknown;
      /**
       * 显示层级
       * - 地图上存在多个覆盖物叠加时，通过该属性使级别较高的覆盖物在上层显示
       */
      zIndex?: number;
    }
    interface BaseGeometryOptions {
      /**
       * 轮廓线颜色，使用 16 进制颜色代码赋值
       *
       * @default "#00D3FC"
       */
      strokeColor?: RGB_HEX;
      /**
       * 轮廓线透明度，取值范围 `0` ~ `1` ，`0` 表示完全透明，`1` 表示不透明
       *
       * @default 0.5
       */
      strokeOpacity?: number;
      /**
       * 轮廓线宽度
       *
       * @default 2
       */
      strokeWeight?: number;
      /**
       * 轮廓线样式
       * - 实线 `solid`，虚线 `dashed`
       *
       * @default "solid"
       */
      strokeStyle?: 'solid' | 'dashed';
      /**
       * 勾勒形状轮廓的虚线和间隙的样式，此属性在 strokeStyle 为 `dashed` 时有效，此属性在 IE9 及以上版本浏览器有效
       * - 实线：[0,0,0]
       * - 虚线：[10,10],[10,10]，表示 10 个像素的实线 + 10 个像素的空白（如此反复）组成的虚线
       * - 点画线：[10,2,10],[10,2,10]，表示 10 个像素的实线和 2 个像素的空白 + 10 个像素的实线和 10 个像素的空白（如此反复）组成的虚线
       */
      strokeDasharray?: number[] | number[][];
    }
    interface LineGeometryOptions extends BaseGeometryOptions {
      /**
       * 是否显示描边
       *
       * @default false
       */
      isOutline?: boolean;
      /**
       * 线条描边颜色，此项仅在 `isOutline` 为 `true` 时有效
       *
       * @default "#00B2D5"
       */
      outlineColor?: RGB_HEX;
      /**
       * 两端线帽的绘制样式，可选值：`butt` 无头、`round` 圆头、`square` 方头
       *
       * @default "butt"
       */
      lineCap?: 'butt' | 'round' | 'square';
      /**
       * 拐点的绘制样式，可选值：`miter` 尖角、`round` 圆角、`bevel` 斜角
       *
       * @default "miter"
       */
      lineJoin?: 'miter' | 'round' | 'bevel';
      /**
       * 是否延路径显示白色方向箭头，建议线宽度大于 6 时使用
       *
       * @default false
       */
      showDir?: boolean;
      /**
       * 方向箭头颜色
       *
       * @default "#ffffff"
       */
      dirColor?: RGB_HEX;
      /**
       * 方向箭头图片
       */
      dirImg?: HTMLImageElement | HTMLCanvasElement;
      /**
       * 描边的宽度
       *
       * @default 1
       */
      borderWeight?: number;
      /**
       * 是否绘制大地线
       *
       * @default false
       */
      geodesic?: boolean;
    }
    interface PlaneGeometryOptions extends BaseGeometryOptions {
      /**
       * 填充颜色，使用 16 进制颜色代码赋值，如：#00B2D5
       *
       * @default "#00B2D5"
       */
      fillColor?: RGB_HEX;
      /**
       * 填充透明度，取值范围 `0` ~ `1`，`0` 表示完全透明，`1` 表示不透明
       *
       * @default 0.5
       */
      fillOpacity?: number;
    }
  }

  /**
   * 抽象类 - 覆盖物
   *
   * @abstract
   * @class Overlay
   * @extends {Event<OverlayEventList>} 类 - 地图事件
   */
  abstract class Overlay extends Event<OverlayEventList> implements GetSet.Maps, GetSet.Height {
    public getMap: () => Map | null;
    public setMap: (map: Map | null) => void;

    /** @deprecated AMap Web API 2.0 中已废弃 */
    public getHeight: () => number | string;
    /** @deprecated AMap Web API 2.0 中已废弃 */
    public setHeight: (height?: number | string) => void;

    /**
     * 重置覆盖物
     * @param {?(LngLatLike[] | LngLatLike[][])} [path] 默认为初始数据
     */
    public init: ((path?: LngLatLike[] | LngLatLike[][]) => void) | undefined;
    /**
     * 重置覆盖物
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public reset: (() => void) | undefined;

    /** 销毁覆盖物 */
    public destroy(): void;
    /** 移除覆盖物 */
    public remove(): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;

    /**
     * 获取显示状态
     * @deprecated AMap Web API 2.0 中已废弃
     */
    public getVisible(): boolean;
  }
}
