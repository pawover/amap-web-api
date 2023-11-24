declare namespace AMap {
  namespace MarkerCluster {
    interface Options {
      /**
       * 聚合计算时网格的像素大小
       *
       * @default 60
       */
      gridSize?: number;
      /**
       * 最大的聚合级别，大于该级别就不进行相应的聚合
       * - 默认值为 18，即小于 18 级的级别均进行聚合，18 及以上级别不进行聚合
       *
       * @default 18
       */
      maxZoom?: number;
      /**
       * 聚合点的图标位置是否是所有聚合内点的中心点
       * - 数据中如果含有权重值，以权重高的点为中心进行聚合
       *
       * @default true
       */
      averageCenter?: boolean;
      /**
       * 地图缩放过程中是否聚合
       *
       * @default false
       */
      clusterByZoomChange?: boolean;
      /**
       * 指定聚合后的点标记的图标样式
       * - 可缺省，缺省时为默认样式数据元素分别对应聚合量在 1-10,11-100,101-1000… 的聚合点的样式
       * - 当用户设置聚合样式少于实际叠加的点数，未设置部分按照系统默认样式显示
       */
      styles?: StyleOptions[];
      /**
       * 自定义聚合点的绘制，由开发者自己实现
       * - API 将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了 `renderClusterMarker` 后，`styles` 属性无效
       * - 该函数的参数包含如下属性：
       *   1. count: 当前聚合点下聚合的 Marker 的数量
       *   2. marker: 当前聚合点显示的 Marker
       */
      renderClusterMarker?: (options: { count: number; marker: Marker }) => unknown;
      /**
       * 自定义非聚合点的绘制，由开发者自己实现
       * - API 将在绘制每个非聚合点的时候调用这个方法
       * - 该函数的参数包含如下属性：
       *   1. marker: 非聚合点 Marker 对象
       */
      renderMarker?: (options: { marker: Marker }) => unknown;
    }
    interface StyleOptions {
      /**
       * 图标显示图片的 url 地址
       * - 必填
       */
      url: string;
      /**
       * 图标显示图片的大小
       * - 必填
       */
      size: SizeLike;
      /**
       * 图标定位在地图上的位置相对于图标左上角的偏移值
       *
       * @default [0,0]
       */
      offset?: PixelLike;
      /**
       * 图片相对于可视区域的偏移值
       * - 此功能的作用等同 CSS 中的 `background-position` 属性
       *
       * @default [0,0]
       */
      imageOffset?: PixelLike;
      /**
       * 文字的颜色
       *
       * @default "#000000"
       */
      textColor?: string;
      /**
       * 文字的大小
       *
       * @default 10
       */
      textSize?: number;
    }
    interface DataOptions {
      lnglat: LngLat[];
      weight?: number;
    }
  }

  /**
   * 标记 - 聚合点
   * - 用于展示大量点标记，将点标记按照距离进行聚合，以提高绘制性能
   * - 聚合点支持用户自定义样式，以插件形式调用
   *
   * @class MarkerCluster
   * @extends {Event<'click'>} 类 - 地图事件
   * @implements {Accessor.Map} 所属地图
   */
  class MarkerCluster extends Event<"click"> implements Accessor.Map {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Map} map 地图实例
     * @param {MarkerCluster.DataOptions[]} dataOptions 数据
     * @param {MarkerCluster.Options} options 构造参数
     */
    public constructor(map: Map, dataOptions: MarkerCluster.DataOptions[], options: MarkerCluster.Options);

    public getMap: Required<Accessor.Map>["getMap"];
    public setMap: Required<Accessor.Map>["setMap"];

    /** 获取聚合点的总数量 */
    public getClustersCount(): number;
    /** 获取聚合点数据源 `points` 长度 */
    public getUserDataLen(): number;

    /** 获取单个聚合点位置是否是聚合内所有标记的平均中心 */
    public isAverageCenter(): boolean;
    /** 设置聚合点位置是否是所有聚合点的中心 */
    public setAverageCenter(averageCenter: boolean): void;

    /** 在原数据基础上添加数据 */
    public addData(dataOptions: MarkerCluster.DataOptions[]): void;
    /** 设置聚合点数据源 */
    public setData(dataOptions: MarkerCluster.DataOptions[]): void;

    /** 获取聚合网格的像素大小 */
    public getGridSize(): number;
    /** 设置聚合网格的像素大小 */
    public setGridSize(gridSize: number): void;

    /** 获取最大聚合级别 */
    public getMaxZoom(): number;
    /** 设置最大聚合级别 */
    public setMaxZoom(zoom: number): void;

    /** 获取聚合点样式信息 */
    public getStyles(): MarkerCluster.StyleOptions[];
    /** 设置聚合点样式信息 */
    public setStyles(styles: MarkerCluster.StyleOptions[]): void;
  }
}
