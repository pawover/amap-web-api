declare namespace AMapUI {
  namespace PointSimplifier {
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
       * - 自身的格式没有强制要求，只要能索引或者包含点的相关信息即可
       */
      data?: DataItem[];
      /**
       * 是否在绘制后自动调整地图视野以适合全部轨迹
       *
       * @default true
       */
      autoSetFitView?: boolean;
      /** 绘制引擎的构造类（Function），默认为内置的 Canvas 引擎 */
      renderConstructor?: typeof PointSimplifier.Render.Canvas | typeof PointSimplifier.Render.Canvas.GroupStyleRender;
      /** 绘制引擎的构造参数 */
      renderOptions?: RenderOptions<DataItem>;
      /**
       * 四叉树叶子节点中包含的点的最大数量，超过该数量则进行宽高等分，一分为四
       * - 通常来说，值越小，分叉的可能性越大，一方面，这有助于精细的划分高密度区域，另外一面，也增加了四叉树的节点数量（指数增长），从而有损性能
       *
       * @default 100
       */
      maxChildrenOfQuadNode?: number;
      /**
       * 四叉树的最大高度
       * - 超过该高度，即使数量超过 `maxChildrenOfQuadNode` 的限制，也不再分叉
       *
       * @default 16
       */
      maxDepthOfQuadTree?: number;
      /**
       * 点的范围矩形的最坏宽高比
       * - 取值小于1，大于 1 时会自动取倒数
       * - 四叉树的根节点是根据点的分布范围构建的，分叉之后的宽高比也与根节点一致，过宽或者过高的矩形可能会影响TopN区域的视觉观感（比如出现 100*1 的矩形）
       * - 宽高比小于该阈值时会对范围矩形做一定的扩充，缩小宽和高的差距，使其更加“周正”
       *
       * @default 0.6
       */
      badBoundsAspectRatio?: number;
      /**
       * 返回数据项中的经纬度信息
       * @param  {DataItem} dataItem 数据项
       * @param  {number} dataIndex 数据项索引
       * @return {string | null} 经纬度信息
       */
      getPosition: (dataItem: DataItem, dataIndex: number) => AMap.LngLatLike;
      /**
       * 返回鼠标悬停时的显示内容
       * @param  {DataItem} dataItem 数据项
       * @param  {number} dataIndex 数据项索引
       * @return {string | null} 显示内容，无内容时返回 null
       */
      getHoverTitle?: (dataItem: DataItem, dataIndex: number) => string | null;
      /**
       * 数据项的优先级比较函数
       * - 用于排序，排序后的数组，靠前的优先绘制
       * @param  {DataItem} a 数据项 a
       * @param  {DataItem} b 数据项 b
       * @param  {number} aIndex 数据项索引 aIndex
       * @param  {number} bIndex 数据项索引 bIndex
       * @return {number} `-1` `0` `1`
       */
      compareDataItem?: (a: DataItem, b: DataItem, aIndex: number, bIndex: number) => -1 | 0 | 1;
    }
    /** 绘制引擎的构造参数 */
    interface RenderOptions<DataItem> extends GroupStyleRender<DataItem> {
      /**
       * 是否开启事件监听
       * - 事件监听本身对性能有一定的损耗，如果不需要，可以关闭
       *
       * @default true
       */
      eventSupport?: boolean;
      /**
       * 是否绘制四叉树
       * - 通常在开发调试阶段开启
       * - 开启后可以通过 `quadTreeStyle` 参数调整样式
       *
       * @default false
       */
      drawQuadTree?: boolean;
      /**
       * 四叉树的样式
       * - `drawQuadTree` 开启时有效
       */
      quadTreeStyle?: {
        fillStyle?: PointStyle['fillStyle'];
        lineWidth?: PointStyle['lineWidth'];
        strokeStyle?: PointStyle['strokeStyle'];
      };
      /**
       * 是否绘制位置点
       * - 通常在开发调试阶段开启，辅助设定点的绘制区域的偏移（比如圆形的定位点在中心，而水滴形状的定位点在底部中心位置）
       * - 开启后可以通过 `pointPositionStyle` 参数调整样式
       *
       * @default false
       */
      drawPositionPoint?: boolean;
      /**
       * 定位点的样式
       * - `drawPositionPoint` 开启时有效，取值参见 `pointStyle`
       * - 定位点有助于辅助设定 pointStyle 中的 offset
       */
      pointPositionStyle?: PointStyle;
      /**
       * 是否绘制位置被挤占的点
       * - 开启后可以通过 `shadowPointStyle` 参数调整样式
       * - 该功能有助于直观的分辨哪些点的空间被挤占，但是绘制的点的数量将大幅增加（相当于规避了占位检测的过滤功能），建议谨慎开启
       *
       * @default false
       */
      drawShadowPoint?: boolean;
      /**
       * 位置被挤占的点的样式
       * - `drawShadowPoint` 开启时有效，取值参见 `pointStyle`
       */
      shadowPointStyle?: PointStyle;
      /** 点的样式 */
      pointStyle?: PointStyle;
      /**
       * 鼠标悬浮时绘制的覆盖点的样式
       * - 取值参见 `pointStyle`
       */
      pointHoverStyle?: PointStyle;
      /**
       * 点的 “硬核空间” 样式
       * - 取值参见 `pointStyle`
       * - 默认不显示 `fillStyle` `strokeStyle` 以及 `content`
       */
      pointHardcoreStyle?: PointStyle;
      /**
       * TopN 区域的样式
       * - TopN 选取：在高密度区域，排序选出高优先级的N个点，其余点抛弃
       * - 取值参见 `pointStyle`，但有以下不同之处：
       *   1. `width` `height` 属性无效，由四叉树节点自身决定
       *   2. `content` 为 `circle` 时，`circle` 的直径为 width 和 height 中的较小值
       *   3. 增加属性 `autoGlobalAlphaAlpha`，标识不透明度的范围 `[min, max]`，默认为 `[0.1, 1]`。具体数值由 getAreaScore 计算，按10段等分，分数高的不透明度也高。如不需要该效果，可以设置为 false
       */
      topNAreaStyle?: PointStyle & { autoGlobalAlphaAlpha: [number, number] | false };
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
       * 根据密度计算TopN区域的分数，范围为1-10，就近取整。
       * @param  {number} minScore 最小取值，默认 `1`
       * @param  {number} maxScore 最大取值，默认 `10`
       * @param  {x:number, y:number, width:number, height:number} bounds 区域的边界信息
       * @param  {number} descendantsNum 该区域包含的点的总数
       * @param  {width:number, height:number} pointSize 点的尺寸，源自参数 `pointStyle`
       * @return {number}
       */
      getAreaScore?: (
        minScore: number,
        maxScore: number,
        bounds: { x: number; y: number; width: number; height: number },
        descendantsNum: number,
        pointSize: { width: number; height: number },
      ) => number;
      /**
       * 设置一个面积阈值，当四叉树的节点区域小于该阈值时，会进行 TopN 选取
       * - 推荐使用一个视觉上可分辨的较小面积，默认 10*10
       * @param  {number} zoom 当前地图实例的 `zoom` 值
       * @param  {width:number, height:number} pointSize 点的尺寸，源自参数 `pointStyle`
       * @return {number} 面积阈值
       */
      getAreaSizeForTopSelect?: (zoom: number, pointSize: { width: number; height: number }) => number;
      /**
       * 设置某个区域内按优先级（由 compareDataItem 确定）选取的点的数量
       * @param {number} zoom 当前地图实例的 `zoom` 值
       * @param {x:number, y:number, width:number, height:number} bounds 区域的边界信息
       * @param {number} descendantsNum 该区域包含的点的总数
       * @param {width:number, height:number} pointSize 点的尺寸，源自参数 `pointStyle`
       * @return {number} 选取的数量
       */
      getNumForTopSelect?: (
        zoom: number,
        bounds: { x: number; y: number; width: number; height: number },
        descendantsNum: number,
        pointSize: { width: number; height: number },
      ) => number;
    }
    interface GroupStyleRender<DataItem> {
      /**
       * 获取某个数据项的分组 Id
       * @param  {PD} dataItem 数据项
       * @param  {number} dataIndex 数据项索引
       * @return {string} 返回该数据项对应的分组 Id
       */
      getGroupId?: (dataItem: DataItem, dataIndex: number) => unknown;
      /** 设置或获取样式配置 */
      groupStyleOptions?: Recordable<Key, GroupPointStyle | undefined> | ((id: unknown) => GroupPointStyle | undefined);
    }
    interface GroupPointStyle {
      /** 点的样式 */
      pointStyle?: PointStyle;
      /** 点的 “硬核空间” 的样式 */
      pointHardcoreStyle?: PointStyle;
      /** 定位点的样式 */
      pointPositionStyle?: PointStyle;
    }
    /** 绘制属性 */
    interface PointStyle {
      /** 绘制方式 */
      content?: 'rect' | 'circle' | 'none' | RenderFunction;
      /** 绘制区域宽度 */
      width?: number;
      /** 绘制区域高度 */
      height?: number;
      /**
       * 绘制区域相对于定位点的偏移
       * - 可以使用绝对数值，也可以使用百分比，例如 `['-50%', '-100%']`
       * - 百分比分别相对于 width 和 height
       */
      offset?: [number, number] | [`${string}%`, `${string}%`];
      /** 描边宽度 */
      lineWidth?: number;
      /** 填充色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
      fillStyle?: string;
      /** 描边色，如 `"red"`, `"rgb(255,0,0)"`, `"rgba(0,0,0,1)"` */
      strokeStyle?: string;
    }
    /**
     * 根据矩形范围，描绘出点的形状路径或者绘制图片，注意：
     * 1. 该函数通常只是描绘路径（使用 moveTo,lineTo, arc, arcTo等），尽量不要fill或者stroke，所有点的路径描绘完成后，引擎自己会在尾部调用fill以及stroke，一次性绘出所有路径。
     * 2. x, y, width, height 的数值与视觉上的数值在高清屏幕时（window.devicePixelRatio>1）会有差异，比如pointStyle.width = 4, 如果屏幕的devicePixelRatio=2，那么content函数接收的width参数就会是8。因此，不要在该函数中使用固定数值。
     * PointSimplifier同时提供了一个快捷方法用于创建图片内容的content（function）：PointSimplifier.Render.Canvas.getImageContent，该函数的返回值直接赋给content即可。
     * 图片的绘制性能相对较差，建议优先考虑形状
     *
     * @param {CanvasRenderingContext2D} canvasContext 绘制引擎
     * @param {number} x 绘制区域左上角横坐标（相对于map容器）
     * @param {number} y 绘制区域左上角纵坐标（相对于map容器）
     * @param {number} width 绘制区域的宽度
     * @param {number} height 绘制区域的高度
     */
    type RenderFunction = (
      canvasContext: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
    ) => void;
  }

  /**
   * 海量数据 - 点
   *
   * @class PointSimplifier
   * @template DataItem 单个数据模型，自身的格式没有强制要求，只要能索引或者包含点的相关信息即可
   */
  class PointSimplifier<DataItem> {
    /** 是否支持绘制 canvas */
    public static readonly supportCanvas: boolean;
    public static readonly Render: {
      Canvas: {
        GroupStyleRender: PointSimplifier.GroupStyleRender<unknown>;
        getImageContent: (
          imageSrc: string,
          onLoad?: Fn,
          onError?: Fn,
        ) => NonNullable<PointSimplifier.PointStyle['content']>;
      };
    };

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {PointSimplifier.Options<DataItem>} options 构造参数
     */
    public constructor(options?: PointSimplifier.Options<DataItem>);

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
     * - 根据 `autoSetFitView` 字段决定是否在绘制后自动调整地图视野以适合全部轨迹
     *
     * @public
     * @param {DataItem[]} data 数据源
     */
    public setData(data: DataItem[]): void;
    /**
     * 设定数据源数组，并重新绘制
     * - data 为空时将清除显示内容
     *
     * @public
     * @param {DataItem[]} data 数据源
     */
    public _buildData(data: DataItem[]): void;
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
    public getOptions(): PointSimplifier.Options<DataItem>;
    /** 获取绘制引擎 */
    public getRender(): CanvasRenderingContext2D;
    /** 获取绘制引擎的构造参数 */
    public getRenderOptions(): PointSimplifier.RenderOptions<DataItem>;
    /** 获取数据总数 */
    public getTotalPointsNum(): number;
    /** 根据索引获取数据项 */
    public getDataItemByIndex(index: number): DataItem | undefined;
    /** 获取单一事件的监听数量 */
    public listenerLength(eventName: PointEventList): number;

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
    public on<E extends PointEventList>(
      eventName: E | `${E} ${E}` | `${E} ${E} ${E}`,
      callback: (
        e: { type: E; target: AMap.Map; originalEvent: AMap.MapsEvent<'click' | 'mousemove', AMap.Map> },
        info: { index: number; data: DataItem },
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
