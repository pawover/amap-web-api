declare namespace AMapUI {
  namespace PathSimplifier {
    interface Options<DataItem> {
      /** 地图实例 */
      map: AMap.Map;
      /**
       * 图层的叠加顺序
       * - 如果需要叠加在地图的最上层，可以设置一个较大的值
       *
       * @default 200
       */
      zIndex?: number;
      /**
       * 数据源
       * - 自身的格式没有强制要求，只要能索引或者包含轨迹的相关信息即可
       */
      data?: DataItem[];
      /**
       * 是否在绘制后自动调整地图视野以适合全部轨迹
       *
       * @default true
       */
      autoSetFitView?: boolean;
      /**
       * 点击轨迹节点或者轨迹节点间的连线时，选中该轨迹
       *
       * @default true
       */
      clickToSelectPath?: boolean;
      /**
       * 置顶选中的轨迹线；置顶的含义是，将该轨迹线的 zIndex 设置为索引最大值 +1
       *
       * @default true
       */
      onTopWhenSelected?: boolean;
      /** 绘制引擎的构造类（Function），默认为内置的 Canvas 引擎 */
      renderConstructor?: FunctionConstructor;
      /** 绘制引擎的构造参数 */
      renderOptions?: RenderOptions<DataItem>;
      /**
       * 返回轨迹数据中的路径信息
       *
       * @param  {DataItem} pathData 轨迹数据项
       * @param  {number} pathIndex 轨迹索引
       * @return {AMap.LngLatLike[]} 轨迹的节点坐标数组
       */
      getPath: (pathData: DataItem, pathIndex: number) => AMap.LngLatLike[];
      /**
       * 返回轨迹数据项的叠加顺序值，即 `zIndex`
       * - `zIndex` 较大的轨迹绘制在上层
       * - 如果 zIndex 值相同，则 `pathIndex` 较大的绘制在上层
       *
       * @param  {DataItem} pathData 轨迹数据项
       * @param  {number} pathIndex 轨迹索引
       * @return {number} 返回叠加顺序值
       */
      getZIndex?: (pathData: DataItem, pathIndex: number) => number;
      /**
       * 返回鼠标悬停时显示的 Title 内容
       *
       * @param  {DataItem} pathData 轨迹数据项
       * @param  {number} pathIndex 轨迹索引
       * @param  {number} pointIndex 轨迹节点索引，如果悬停在节点之间的连线区域，该值为-1
       * @return {string | null} 返回 Title 内容，无内容时可以返回 null
       */
      getHoverTitle?: (pathData: DataItem, pathIndex: number, pointIndex: number) => string | null;
    }
    /** 绘制引擎的构造参数 */
    interface RenderOptions<DataItem> extends Recordable {
      /**
       * 是否开启事件监听
       * - 事件监听本身对性能有一定的损耗，如果不需要，可以关闭
       *
       * @default true
       */
      eventSupport?: boolean;
      /**
       * 对轨迹线上不可见的节点，是否支持事件
       * - 参见 keyPointTolerance
       *
       * @default true
       */
      eventSupportInvisible?: boolean;
      /**
       * 轨迹线绘制的简化程度
       * - 该参数不宜设置过大，推荐范围 `1` ~ `5`
       * - 过大的参数会导致鼠标识别以及轨迹巡航偏离轨迹线
       *
       * @default 2
       */
      pathTolerance?: number;
      pathNearTolerance?: number;
      /**
       * 绘制中间节点的简化参数，取值规则如下：
       * 小于0, 不绘制任何中间节点；默认设置
       * 大于等于0，对简化过的绘制轨迹线做二次简化，结果以点的形式绘制
       */
      keyPointTolerance?: number;
      /**
       * 鼠标触发选择效果的范围
       */
      mousePickRadius?: number;
      /**
       * 绘制全部轨迹节点的阈值
       * - 如果地图视野内的轨迹节点的总数量小于该阈值，则绘制全部的节点
       * - 设置为 `-1` 则不开启，建议设置一个 1000 以内的数值
       *
       * @default -1
       */
      renderAllPointsIfNumberBelow?: number;
      /**
       * 轨迹线的样式
       */
      pathLineStyle?: PathLineStyle;
      /**
       * 鼠标悬浮时的轨迹线样式
       * - 属性继承 `pathLineStyle`
       * - 额外属性：
       *   - `disableIfSelected`，是否在轨迹线选中时禁用悬浮样式，默认 `true`
       */
      pathLineHoverStyle?: PathLineStyle & { disableIfSelected?: boolean };
      /**
       * 轨迹线处于选中状态时的样式
       * - 属性继承 `pathLineStyle`
       */
      pathLineSelectedStyle?: PathLineStyle;
      /**
       * 轨迹线上方向箭头的默认配置
       * - `true` 使用默认配置
       * - 属性继承 `pathLineStyle`，`pathLineStyle` 中可覆盖
       * - 额外属性：
       *   - `stepSpace` @type {number} 箭头排布的间隔，单位：像素
       *   - `width` @type {number} 箭头宽度，默认为所在轨迹线的 `lineWidth`
       */
      dirArrowStyle?: (PathLineStyle & { stepSpace: number; width: number }) | boolean;
      /** 轨迹节点的绘制样式
       * @type {KeyPointStyle}
       */
      keyPointStyle?: KeyPointStyle;
      /** 轨迹起点的绘制样式，属性继承 keyPointStyle */
      startPointStyle?: KeyPointStyle;
      /** 轨迹终点的绘制样式，属性继承 keyPointStyle */
      endPointStyle?: KeyPointStyle;
      /** 轨迹点在鼠标Hover时的样式 ，属性继承 keyPointStyle */
      keyPointHoverStyle?: KeyPointStyle;
      /** 选中状态下的轨迹线上的节点的样式， 属性继承 keyPointStyle */
      keyPointOnSelectedPathLineStyle?: KeyPointStyle;
      /**
       * 轨迹巡航器的默认样式
       * - [相关参考](https://lbs.amap.com/api/amap-ui/reference-amap-ui/mass-data/pathsimplifier#render)
       */
      pathNavigatorStyle?: {
        /** 巡航器形状宽度 */
        width?: number;
        /** 巡航器形状高度 */
        height?: number;
        /**
         * 初始旋转角度
         *
         * @default 0
         */
        initRotateDegree?: number;
        /**
         * 是否根据路径方向进行角度旋转（相对于正上方向）
         *
         * @default true
         */
        autoRotate?: boolean;
        /** 填充色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
        fillStyle?: string;
        /** 描边色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
        strokeStyle?: string;
        /** 描边宽度 */
        lineWidth?: string;
        /** 巡航器经过的路径的样式 */
        pathLinePassedStyle?: PathLineStyle;
        /** 巡航器的内容 */
        content: 'defaultPathNavigator' | 'circle' | 'none' | PointSimplifier.RenderFunction;
      };
      /** 鼠标悬浮时显示的 title 样式 */
      hoverTitleStyle?: {
        /** title 的位置，`left` 或者 `top` */
        position: 'left' | 'top';
        /** title 所用的 DOM 节点上的 classNames，多个用空格分开，可借此调整 DOM 节点的样式 */
        classNames: string;
        /** title 的 DOM 节点相对于定位点的偏移 */
        offset: [number, number];
      };
      /**
       * 根据轨迹索引和zoom返回样式配置
       *
       * @param  {object} pathItem 轨迹信息，包括轨迹索引和轨迹数据
       * @param  {number} pathItem.pathIndex 轨迹索引
       * @param  {DataItem} pathItem.pathData 轨迹数据
       * @param  {number} zoom 当前地图的缩放级别
       * @return {RenderOptions<DataItem>} 样式配置
       */
      getPathStyle?: (
        pathInfo: { pathIndex: number; pathData: DataItem },
        zoom: number,
      ) => Partial<RenderOptions<DataItem>>;
    }
    /** 轨迹节点的绘制样式 */
    interface KeyPointStyle {
      /** 点的半径 */
      radius?: number;
      /** 填充色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
      fillStyle?: string;
      /** 描边色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
      strokeStyle?: string;
      /** 描边宽度 */
      lineWidth?: number;
    }
    /** 轨迹线的样式 */
    interface PathLineStyle {
      /** 线宽度 */
      lineWidth?: number;
      /** 线颜色 */
      strokeStyle?: string;
      /** 描边宽度 */
      borderWidth?: number;
      /** 描边颜色 */
      borderStyle?: string;
      /**
       * 方向箭头样式，`lineWidth` >=4 时有效
       * - `true` 使用默认配置
       * - `object` dirArrowStyle
       *   - `stepSpace` @type {number} 箭头排布的间隔，单位：像素
       *   - `width` @type {number} 箭头宽度，默认为所在轨迹线的 `lineWidth`
       */
      dirArrowStyle?: (PathLineStyle & { stepSpace: number; width: number }) | boolean;
    }
  }

  /**
   * 海量数据 - 轨迹
   *
   * @class PathSimplifier
   * @template DataItem 单个数据模型，自身的格式没有强制要求，只要能索引或者包含轨迹的相关信息即可
   */
  class PathSimplifier<DataItem> {
    /** 是否支持绘制 canvas */
    public static readonly supportCanvas: boolean;
    /** 构造参数 */
    public readonly _opts: PathSimplifier.Options<DataItem>;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {PathSimplifier.Options<DataItem>} options 构造参数
     */
    public constructor(options?: PathSimplifier.Options<DataItem>);

    /** 重新绘制 */
    public render(): void;
    /**
     * 延时设定的毫秒后绘制
     * - 该时间段内重复调用只会触发一次
     * - 该函数适合短时间内多次触发绘制的场景
     *
     * @public
     * @param {?number} [delay] 默认 10
     */
    public renderLater(delay?: number): void;
    /**
     * 设定数据源数组，并重新绘制
     * - data 为空时将清除显示内容
     *
     * @public
     * @param {DataItem[]} data 数据源
     */
    public setData(data: DataItem[]): void;
    /**
     * 自动调整地图视野
     * - 适应轨迹索引对应的轨迹线
     * - 如果 pathIndex < 0, 则适应全部的轨迹线
     *
     * @public
     * @param {number} pathIndex 轨迹索引
     */
    public setFitView(pathIndex: number): void;
    /** 渲染数据准备完毕，开始渲染前触发 */
    public onRenderReady(callback: Fn): void;
    /** 判断图层是否处于隐藏状态 */
    public isHidden(): boolean;

    /** 获取图层显示的地图实例 */
    public getMap(): AMap.Map;
    /** 获取图层显示的地图实例的最大缩放比例 */
    public getMaxZoom(): number;
    /** 获取图层显示的地图实例的最小缩放比例 */
    public getMinZoom(): number;
    /** 获取图层显示的地图实例的缩放比例 */
    public getZooms(): [number, number];
    /** 获取图层的构造参数 */
    public getOptions(): PathSimplifier.Options<DataItem>;
    /** 获取绘制引擎 */
    public getRender(): CanvasRenderingContext2D;
    /** 获取绘制引擎的构造参数 */
    public getRenderOptions(): PathSimplifier.RenderOptions<DataItem>;
    /** 获取数据总数 */
    public getMaxPathIndex(): number;
    /** 获取数据项中的最大 zIndex */
    public getMaxZIndex(): number;
    /** 根据轨迹索引获取数据项 */
    public getPathData(pathIndex: number): number;
    /** 获取轨迹巡航器列表 */
    public getPathNavigators(): PathNavigator<DataItem>[];
    public getPixelOfMaxZoom(lnglat: AMap.LngLat): [number, number];
    /**
     * 是否置顶显示 pathIndex 对应的轨迹
     * - isTop 为 `true`，设置 zIndex 为 现存最大 zIndex + 1
     * - isTop 为 `false`，设置 zIndex 为 构造参数中 getZIndex 的返回值
     *
     * @public
     * @param {number} pathIndex 轨迹索引
     * @param {boolean} isTop
     */
    public toggleTopOfPath(pathIndex: number, isTop: boolean): void;

    /**
     * 创建轨迹巡航器
     *
     * @public
     * @param {number} pathIndex 关联的轨迹索引
     * @param {PathNavigator.Options} options 巡航器的配置选项
     * @returns {PathNavigator<DataItem>} 轨迹巡航器
     */
    public createPathNavigator(pathIndex: number, options: PathNavigator.Options): PathNavigator<DataItem>;
    /** 销毁所有轨迹巡航器 */
    public clearPathNavigators(): void;

    /** 根据轨迹索引获取轨迹数据项的 `zIndex` 值 */
    public getZIndexOfPath(pathIndex: number): number;
    /** 根据轨迹索引设置轨迹数据项的 `zIndex` 值 */
    public setZIndexOfPath(pathIndex: number, zIndex: number): void;

    /**
     * 获取处于选中状态的轨迹数据项
     * - 无选中时返回 `null`
     */
    public getSelectedPathData(): DataItem | null;
    /**
     * 获取处于选中状态的轨迹索引
     * - 无选中时返回 `-1`
     */
    public getSelectedPathIndex(): number;
    /**
     * 设置处于选中状态的轨迹索引
     * - 如果 pathIndex < 0，则清除选中状态
     */
    public setSelectedPathIndex(pathIndex: number): void;
    /** 根据轨迹索引判断轨迹是否处于选中状态 */
    public isSelectedPathIndex(pathIndex: number): boolean;

    /** 设置为可见 */
    public show(): void;
    /** 设置为隐藏 */
    public hide(): void;

    /**
     * 添加事件绑定
     * - 多个事件用空格分隔
     *
     * @public
     * @param {(string)} eventName 事件名称
     * @param {Function} callback 回调函数
     */
    public on<E extends PathEventList>(
      eventName: E | `${E} ${E}` | `${E} ${E} ${E}` | `${E} ${E} ${E} ${E}`,
      // | `${E} ${E} ${E} ${E} ${E}`
      // | `${E} ${E} ${E} ${E} ${E} ${E}`,
      callback: (
        e: { type: E; target: AMap.Map; originalEvent: AMap.MapsEvent<'click' | 'mousemove', AMap.Map> },
        info: { type: 'path' | 'point'; pointIndex?: number; pathIndex: number; pathData: DataItem },
      ) => void,
    ): void;
    /**
     * 解除事件绑定
     * - 多个事件用空格分隔
     *
     * @public
     * @param {...Parameters<typeof this.on>} args
     */
    public off(...args: Parameters<typeof this.on>): void;
  }
}
