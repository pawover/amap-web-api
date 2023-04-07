declare namespace AMap {
  namespace HeatMap {
    interface Options extends Heatmap.Options {}
    interface DataSet extends Heatmap.DataSet {}
    interface Heatmap3DOptions extends Heatmap.Heatmap3DOptions {}
  }

  namespace Heatmap {
    interface Options extends Omit<Layer.Options, 'opacity'> {
      /**
       * 热力图中单个点的半径
       *
       * @unit 像素
       * @unitSymbol px
       * @default 30
       */
      radius?: number;
      /**
       * 热力图中单个点的模糊程度
       * - 越小越平滑，越大越模糊，取值范围 `0` ~ `1`
       */
      blur?: number;
      /**
       * 热力图渐变区间
       * - 热力图按照设置的颜色及间隔显示热力图，例 `{0.4: 'rgb(0, 255, 255)', 0.85: 'rgb(100, 0, 255)'}` 其中 key 表示间隔位置，取值范围： [0,1]，value 为颜色值
       * - 默认 heatmap.js 标准配色方案
       */
      gradient?: Recordable<number, string>;
      /**
       * 热力图透明度
       * - 分别对应 heatmap.js 的 `minOpacity` 和 `maxOpacity`
       *
       * @default [0,1]
       */
      opacity?: [number, number];
      /** 3D 热力图属性 */
      '3d'?: Heatmap3DOptions;
    }
    /** 热力图数据集 */
    interface DataSet {
      /**
       * 坐标数据集
       *
       */
      data: `http://${string}` | `https://${string}` | LngLatLike[] | { lng: number; lat: number; count: number }[];
      /**
       * 权重的最大值
       * - 不填则取数据集 `count` 最大值
       */
      max?: number;
      /**
       * 数据格式转换函数
       * - 当 jsonp 返回结果和官方结构不一致的时候，可以传递一个函数用来进行数据格式转换
       */
      dataParser?: (
        data: LngLatLike[] | { lng: number; lat: number; count: number },
      ) => LngLatLike[] | { lng: number; lat: number; count: number };
    }
    interface Heatmap3DOptions {
      /**
       * 高度缩放因子，表示在单位高度上的缩放比例
       *
       * @default 1
       */
      heightScale?: number;
      /**
       * 影响高度平滑度的贝塞尔曲线因子
       *
       * @default [0.5,0,1,0.5]
       */
      heightBezier?: number[];
      /**
       * 取样精度，越小越平滑，越大性能越高
       *
       * @default 4
       */
      gridSize?: number;
      /**
       * 是否绘制网格线
       *
       * @default false
       */
      drawGridLine?: boolean;
    }
  }

  /**
   * 图层 - 热力图
   *
   * @class HeatMap
   * @extends {Heatmap} 图层 - 热力图
   */
  class HeatMap extends Heatmap {}
  /**
   * 图层 - 热力图
   *
   * @deprecated AMap Web API 2.0 中已废弃
   * @class Heatmap
   * @implements {GetSet.Maps} 所属地图
   * @implements {GetSet.Options<Heatmap.Options>} 属性配置
   */
  class Heatmap implements GetSet.Maps, GetSet.Options<Heatmap.Options> {
    public getMap: () => Map | null;
    public setMap: (map: Map | null) => void;

    public getOptions: () => Heatmap.Options;
    public setOptions: (options: Heatmap.Options) => void;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Map} map 地图实例
     * @param {Heatmap.Options} options 构造参数
     */
    public constructor(map: Map, options: Heatmap.Options);

    /** 获取是否 3D 模式 */
    public is3DMode(): boolean;
    /** 向热力图数据集中添加坐标点，`count` 不填写时默认 `1` */
    public addDataPoint(longitude: string, latitude: string, count: number): void;
    /** 获取热力图的 Alpha 色 */
    public getColorByAlpha(): [number, number, number, number];

    /** 将热力图添加至地图 */
    public addToMap(map: Map): void;
    /** 将热力图从地图中移除 */
    public removeFromMap(): void;

    /** 获取热力图数据集 */
    public getDataSet(): Heatmap.DataSet;
    /** 设置热力图数据集 */
    public setDataSet(dataSet: Heatmap.DataSet): void;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;
  }
}
