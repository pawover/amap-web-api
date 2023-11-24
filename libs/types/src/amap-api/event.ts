declare namespace AMap {
  /** 地图事件名称列表 */
  type MapEventType =
    // 地图容器尺寸改变，Map 的 resizeEnable 开启时该事件才会正确触发
    | "resize"
    // 地图加载完成
    | "complete"
    // 地图缩放等级改变
    | "zoomchange"
    | "zoomstart"
    | "zoomend"
    // 地图中心点移动
    | "mapmove"
    | "movestart"
    | "moveend"
    // 鼠标点击事件
    | "click"
    | "dblclick"
    | "rightclick"
    // 鼠标移动事件
    | "mousemove"
    | "mouseover"
    | "mouseout"
    | "mouseup"
    | "mousedown"
    | "mousewheel"
    // 热点事件
    | "hotspotclick"
    | "hotspotover"
    | "hotspotout"
    // 拖拽事件
    | "dragstart"
    | "dragend"
    | "dragging"
    // 旋转事件
    | "rotatechange"
    | "rotatestart"
    | "rotateend"
    // 触屏点击
    | "touchstart"
    | "touchmove"
    | "touchend";

  /** 覆盖物事件名称列表 */
  type OverlayEventType =
    // Marker、Text 类对象发生移动
    | "moving"
    | "moveend"
    | "movealong"
    // 矢量图形显示、隐藏
    | "hide"
    | "show"
    // 鼠标按下及移动等
    | "click"
    | "dblclick"
    | "rightclick"
    | "mousemove"
    | "mouseover"
    | "mouseout"
    | "mouseup"
    | "mousedown"
    | "mousewheel"
    // 拖拽事件
    | "dragstart"
    | "dragend"
    | "dragging"
    // 触屏点击
    | "touchstart"
    | "touchmove"
    | "touchend";

  /** 服务事件名称列表 */
  type ServiceEventType =
    | "choose"
    | "select"
    | "complete"
    | "error"
    | "selectChanged"
    | "listElementClick"
    | "markerClick";

  /** 编辑器事件名称列表 */
  type EditorEventType = "adjust" | "move" | "addnode" | "removenode" | "add" | "end";
  /** 右键菜单事件名称列表 */
  type ContextMenuEventType = "open" | "close";
  /** 工具事件名称列表 */
  type ToolEventType = "draw";
  /** 事件名称列表 */
  type EventType =
    | MapEventType
    | OverlayEventType
    | ContextMenuEventType
    | ServiceEventType
    | EditorEventType
    | ToolEventType;

  interface EventLike {
    on: Fn;
    off: Fn;
    emit: Fn;
  }

  /**
   * 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，包含以下字段：
   * - `type` 事件类型
   * - `lnglat` 发生事件时光标所在处的经纬度坐标
   * - `pixel` 发生事件时光标所在处的像素坐标
   * - `target` 触发事件的目标对象
   */
  interface MapsEvent<T extends EventType, I> {
    /** 事件类型 */
    type: T;
    /** 触发事件的目标对象 */
    target?: T extends "draw" ? never : I;
    /** 发生事件时光标所在处的经纬度坐标 */
    lnglat?: PointLike;
    /** 发生事件时光标所在处的像素坐标 */
    pixel?: Pixel;
    /** 原始事件 */
    originEvent?: Recordable;
    /** 矢量索引 */
    vectorIndex?: number;
    /** 墨卡托坐标 */
    pos?: Vector;
    /** 数据 */
    data?: unknown;
    /** 鼠标工具创建的对象 */
    obj?: T extends "draw" ? I : never;
  }

  /** 共同部分事件定义 */
  interface EventCommon<I> {
    /** 隐藏 */
    onHide?: (event?: MapsEvent<"hide", I>) => void;
    /** 显示 */
    onShow?: (event?: MapsEvent<"show", I>) => void;
    /** 鼠标左键单击 */
    onClick?: (event?: MapsEvent<"click", I>) => void;
    /** 鼠标左键双击 */
    onDblClick?: (event?: MapsEvent<"dblclick", I>) => void;
    /** 鼠标右键单击 */
    onRightClick?: (event?: MapsEvent<"rightclick", I>) => void;
    /** 鼠标按下 */
    onMouseDown?: (event?: MapsEvent<"mousedown", I>) => void;
    /** 鼠标抬起 */
    onMouseUp?: (event?: MapsEvent<"mouseup", I>) => void;
    /** 鼠标经过 */
    onMouseOver?: (event?: MapsEvent<"mouseover", I>) => void;
    /** 鼠标移出 */
    onMouseOut?: (event?: MapsEvent<"mouseout", I>) => void;
    /** 鼠标移动 */
    onMouseMove?: (event?: MapsEvent<"mousemove", I>) => void;
    /** 触摸开始，仅移动设备 */
    onTouchStart?: (event?: MapsEvent<"touchstart", I>) => void;
    /** 触摸移动中，仅移动设备 */
    onTouchMove?: (event?: MapsEvent<"touchmove", I>) => void;
    /** 触摸结束，仅移动设备 */
    onTouchEnd?: (event?: MapsEvent<"touchend", I>) => void;
  }

  /** 编辑器事件定义 */
  interface EventEditor<I> {
    /** 增加一个节点时触发此事件 */
    onAddNode?: (event?: MapsEvent<"addnode", I>) => void;
    /** 移除一个节点时触发此事件 */
    onRemoveNode?: (event?: MapsEvent<"removenode", I>) => void;
    /** 调整一个节点时触发此事件 */
    onAdjust?: (event?: MapsEvent<"adjust", I>) => void;
    /** 移动覆盖物时触发此事件 */
    onMove?: (event?: MapsEvent<"move", I>) => void;
    /** 创建一个覆盖物之后触发该事件，target 即为创建对象。当 editor 编辑对象为空时，调用 open 接口，再点击一次屏幕就会创建新的覆盖物对象 */
    onAdd?: (event?: MapsEvent<"add", I>) => void;
    /** 调用 close 之后触发该事件，target 即为编辑后的覆盖物对象 */
    onEnd?: (event?: MapsEvent<"end", I>) => void;
  }

  /** 拖拽事件定义 */
  interface EventDrag<I> {
    /** 开始拖拽 */
    onDragStart?: (event?: MapsEvent<"dragstart", I>) => void;
    /** 拖拽停止 */
    onDragEnd?: (event?: MapsEvent<"dragend", I>) => void;
    /** 拖拽中 */
    onDragging?: (event?: MapsEvent<"dragging", I>) => void;
  }

  /** 信息窗体事件定义 */
  interface EventInfoWindow {
    /**
     * 打开
     * - 注意：`open` 事件可能会触发不正确，多次触发并且没有提供回调参数，请以提供了回调参数 `{type: 'open'}` 的为准
     */
    onOpen?: (event?: MapsEvent<"open", undefined>) => void;
    /**
     * 关闭
     * - 注意：`close` 事件可能会触发不正确，多次触发并且没有提供回调参数，请以提供了回调参数 `{type: 'close'}` 的为准
     */
    onClose?: (event?: MapsEvent<"close", undefined>) => void;
  }

  /**
   * 抽象类 - 事件发射器
   *
   * @deprecated AMap Web API 2.x 中已废弃
   * @abstract
   * @class EventEmitter
   */
  abstract class EventEmitter {
    /**
     * 添加事件绑定
     * - 多次绑定时，当 eventName、callback、context 有任意一个不一样就会再次绑定
     *
     * @public
     * @template C = this
     * @param {string} type 事件名称
     * @param {(this: C, event: unknown) => void} callback 事件回调函数
     * @param {?C} [context] 事件回调中的上下文
     * @param {?boolean} [once] 是否只触发一次
     * @param {?boolean} [unshift] 是否更改事件顺序
     * @returns {this}
     */
    public on<C = this>(
      type: string,
      callback: (this: C, event: unknown) => void,
      context?: C,
      once?: boolean,
      unshift?: boolean,
    ): this;
    /**
     * 解除事件绑定
     * - 只有当 `off` 与 `on` 的 eventName、callback、context 完全一致时才能有效移除监听
     *
     * @public
     * @template C = this
     * @param {string} type 事件名称
     * @param {(((this: C, event: unknown) => void) | 'mv')} callback 事件回调函数
     * @param {?C} [context] 事件上下文
     * @returns {this}
     */
    public off<C = this>(type: string, callback: ((this: C, event: unknown) => void) | "mv", context?: C): this;
    /**
     * 触发事件
     *
     * @public
     * @param {string} type 事件名称
     * @param {?unknown} [params] 额外参数
     * @returns {this}
     */
    public emit(type: string, params?: unknown): this;
  }

  /**
   * 类 - 地图事件
   *
   * @class Event
   * @template T extends EventList
   */
  class Event<T extends EventType> {
    /**
     * 添加事件绑定
     *
     * @public
     * @static
     * @template I
     * @template T extends EventList
     * @param {I} instance 需绑定事件的实例
     * @param {T} type 事件类型
     * @param {?(event?: MapsEvent<T, I>) => void} [callback] 回调函数
     */
    public static addListener<I, T extends EventType>(
      instance: I,
      type: T,
      callback?: (event?: MapsEvent<T, I>) => void,
    ): void;
    /**
     * 为 DOM 元素添加事件绑定
     *
     * @public
     * @static
     * @template T extends keyof HTMLElementTagNameMap
     * @template E extends keyof HTMLElementEventMap
     * @template I = HTMLElementTagNameMap[T]
     * @param {I} instance 需绑定事件的 DOM 元素
     * @param {E} type 事件类型
     * @param {?(listener: HTMLElementEventMap[E]) => void} [callback] 回调函数
     */
    public static addDomListener<
      T extends keyof HTMLElementTagNameMap,
      E extends keyof HTMLElementEventMap,
      I = HTMLElementTagNameMap[T],
    >(instance: I, type: E, callback?: (listener: HTMLElementEventMap[E]) => void): void;
    /**
     * 清空实例上某一类型事件绑定
     *
     * @public
     * @static
     * @template I
     * @template T extends EventList
     * @param {I} instance 需清空事件的实例
     * @param {T} type 事件类型
     */
    public static clearListeners<I, T extends EventType>(instance: I, type: T): void;
    /**
     * 触发非 DOM 事件
     * - 触发非DOM事件eventName时，extArgs将扩展到事件监听函数（handler）接受到的event参数中
     *
     * @public
     * @static
     * @template I
     * @template T extends EventList
     * @param {I} instance 需触发事件的实例
     * @param {T} type 事件类型
     * @param {unknown} data 额外数据
     */
    public static trigger<I, T extends EventType>(instance: I, type: T, data: unknown): void;
    public static extend(types: string | string[], from: EventLike, target: EventLike): void;
    /**
     * 添加事件监听函数
     *
     * @public
     * @param {T | T[]} type 事件名称
     * @param {(event?: MapsEvent<T>) => void} callback 回调函数
     */
    public on<I = unknown>(type: T | T[], callback: (event?: MapsEvent<T, I>) => void): void;
    /**
     * 移除事件监听函数
     *
     * @public
     * @param {T | T[]} type 事件名称
     * @param {(event?: MapsEvent<T>) => void} callback 回调函数
     */
    public off<I = unknown>(type: T | T[], callback: (event?: MapsEvent<T, I>) => void): void;
    /**
     * 判断当前实例是否已经绑定了某个事件回调
     *
     * @public
     * @param {T} type 事件名称
     * @param {(event?: MapsEvent<T>) => void} callback 回调函数
     * @param {unknown} context 事件上下文
     * @returns {boolean}
     */
    public hasEvents(type: T, callback: (event?: MapsEvent<T, unknown>) => void, context?: unknown): boolean;
    /**
     * 清除当前实例某一类型的全部事件回调
     * @param type 事件类型，如果此参数为空，清除实例上的所有绑定的事件回调
     */
    /**
     * 清除当前实例某一类型的事件处理函数
     *
     * @public
     * @param {?T} [type] 事件名称，参数为空时，清除实例上的所有绑定的事件处理函数
     * @returns {unknown}
     */
    public clearEvents(type?: T): unknown;
    /**
     * 触发当前实例事件
     *
     * @public
     * @param {T} type 事件名称
     * @param {?unknown} [params] 额外参数
     */
    public emit(type: T, params?: unknown): unknown;
  }

  /**
   * 类 - 地图事件
   *
   * @deprecated AMap Web API 2.x 中已废弃
   * @class event
   */
  class event {
    /**
     * 为 DOM 对象添加事件绑定
     * - 给 DOM 对象注册事件，并返回 `eventListener`
     * - 运行 `AMap.event.removeListener(eventListener)` 可以删除该事件的监听器
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @template N extends keyof HTMLElementTagNameMap
     * @template E extends keyof HTMLElementEventMap
     * @template C = HTMLElementTagNameMap[N]
     * @param {HTMLElementTagNameMap[N]} instance 需绑定事件的 DOM 对象
     * @param {E} type 事件类型
     * @param {?(this: C, event: HTMLElementEventMap[E]) => void} [callback] 回调函数
     * @param {?C} [context] 事件上下文（缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）
     * @returns {EventListener}
     */
    public static addDomListener<
      N extends keyof HTMLElementTagNameMap,
      E extends keyof HTMLElementEventMap,
      C = HTMLElementTagNameMap[N],
    >(
      instance: HTMLElementTagNameMap[N],
      type: E,
      callback?: (this: C, event: HTMLElementEventMap[E]) => void,
      context?: C,
    ): EventListener & { type: 0 };
    /**
     * 为 DOM 对象添加一次性事件绑定
     * - 给 DOM 对象注册一次性事件，并返回 `eventListener`
     * - 运行 `AMap.event.removeListener(eventListener)` 可以删除该事件的监听器
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @template N extends keyof HTMLElementTagNameMap
     * @template E extends keyof HTMLElementEventMap
     * @template C = HTMLElementTagNameMap[N]
     * @param {HTMLElementTagNameMap[N]} instance 需绑定事件的 DOM 对象
     * @param {E} type 事件类型
     * @param {?(this: C, event: HTMLElementEventMap[E]) => void} [callback] 回调函数
     * @param {?C} [context] 事件上下文（缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）
     * @returns {EventListener}
     */
    public static addDomListenerOnce<
      N extends keyof HTMLElementTagNameMap,
      E extends keyof HTMLElementEventMap,
      C = HTMLElementTagNameMap[N],
    >(
      instance: HTMLElementTagNameMap[N],
      type: E,
      callback?: (this: C, event: HTMLElementEventMap[E]) => void,
      context?: C,
    ): EventListener & { type: 0 };
    /**
     * 添加事件绑定
     * - 给对象注册一次性事件，并返回 `eventListener`
     * - 运行 `AMap.event.removeListener(eventListener)` 可以删除该事件的监听器
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @template I extends EventEmitter
     * @template C = I
     * @param {I} instance 需绑定事件的实例
     * @param {EventType} type 事件类型
     * @param {?(this: C, event: unknown) => void} [callback] 回调函数
     * @param {?C} [context] 事件上下文（缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）
     * @returns {(EventListener & { type: 1 })}
     */
    public static addListener<I extends EventEmitter, C = I>(
      instance: I,
      type: EventType,
      callback?: (this: C, event: unknown) => void,
      context?: C,
    ): EventListener & { type: 1 };
    /**
     * 添加一次性事件绑定
     * - 给对象注册一次性事件，并返回 `eventListener`
     * - 运行 `AMap.event.removeListener(eventListener)` 可以删除该事件的监听器
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @template I extends EventEmitter
     * @template C = I
     * @param {I} instance 需绑定事件的实例
     * @param {EventType} type 事件类型
     * @param {?(this: C, event: unknown) => void} [callback] 回调函数
     * @param {?C} [context] 事件上下文（缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）
     * @returns {(EventListener & { type: 1 })}
     */
    public static addListenerOnce<I extends EventEmitter, C = I>(
      instance: I,
      type: EventType,
      callback?: (this: C, event: unknown) => void,
      context?: C,
    ): EventListener & { type: 1 };
    /**
     * 移除事件绑定
     * - 删除由 event.addDomListener 和 event.addListener 传回的指定侦听器
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @param {(EventListener & { type: 0 | 1 })} listener
     */
    public static removeListener(listener: EventListener & { type: 0 | 1 }): void;
    /**
     * 清除事件
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     */
    public static clearListeners(...args: any[]): void;
    /**
     * 清除事件
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     */
    public static clearInstanceListeners(...args: any[]): void;
    /**
     * 触发非 DOM 事件
     * - 触发非 DOM 事件 eventName，data 将扩展到事件监听函数 `callback` 接受到的 event 参数中
     * - 如传入 `data: {m:10,p:2}` 时，eventName 监听函数 `callback` 可以接收到包含 m,p 两个 key 值的 event 对象
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @public
     * @param {EventEmitter} instance 触发对象
     * @param {EventType} type 事件名称
     * @param {?unknown} [params] 额外参数
     */
    public static trigger(instance: EventEmitter, type: EventType, params?: unknown): void;
  }
}
