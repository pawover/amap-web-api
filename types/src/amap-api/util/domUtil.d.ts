declare namespace AMap {
  namespace DomUtil {
    /**
     * 获取 DOM 元素的样式 key 的值
     *
     * @template K extends keyof CSSStyleDeclaration
     * @param {HTMLElement} element DOM 元素
     * @param {K} key css 样式名称
     * @returns {CSSStyleDeclaration[K]} css 样式
     */
    function getStyle<K extends keyof CSSStyleDeclaration>(element: HTMLElement, key: K): CSSStyleDeclaration[K];
    /**
     * 获取 DOM 元素的大小
     * - AMap Web API 1.x 中参数为 `HTMLElement | string` 类型，支持传入元素 ID，返回 `AMap.Size`
     * - AMap Web API 2.x 中参数为 `HTMLElement` 类型，返回宽高组成的数组 `[width, height]`
     */
    const getViewport: ((element: HTMLElement | string) => Size) | ((element: HTMLElement) => [number, number]);
    /**
     * 获取 DOM 元素距离窗口左上角的距离
     * - AMap Web API 1.x 中返回 `AMap.Pixel`
     * - AMap Web API 2.x 中返回距离组成的数组 `[x, y]`
     */
    const getViewportOffset: ((element: HTMLElement) => Pixel) | ((element: HTMLElement) => [number, number]);
    /**
     * 在 父元素 `parent` 内部创建一个类名为 `className` 的标签类型为 `tagName` 的元素
     * - AMap Web API 2.x 中支持参数 `position` 设置插入位置
     */
    const create:
      | (<K extends keyof HTMLElementTagNameMap>(
          tagName: K,
          parent?: HTMLElement,
          className?: string,
        ) => HTMLElementTagNameMap[K])
      | (<K extends keyof HTMLElementTagNameMap>(
          tagName: K,
          parent?: HTMLElement,
          className?: string,
          position?: 'after' | 'before',
        ) => HTMLElementTagNameMap[K]);
    /**
     * 为 DOM 元素添加类名
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     */
    function addClass(element: HTMLElement, className: string): void;
    /**
     * 为 DOM 元素删除类名
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     */
    function removeClass(element: HTMLElement, className: string): void;
    /**
     * 为 DOM 元素 添加/删除 类名
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     * @param {?boolean} [isAdd] 是否添加，默认 `false`
     */
    function toggleClass(element: HTMLElement, className: string, isAdd?: boolean): void;
    /**
     * 为 DOM 元素设置类名
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     */
    function setClass(element: HTMLElement, className: string): void;
    /**
     * 检测 DOM 元素是否包含类名
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     * @returns {boolean} 是否包含
     */
    function hasClass(element: HTMLElement, className: string): boolean;
    /**
     * 为 DOM 元素设置不透明度
     *
     * @param {HTMLElement} element DOM 元素
     * @param {number} opacity 不透明度
     */
    function setOpacity(element: HTMLElement, opacity: number): void;
    /**
     * 将 DOM 元素以 center 为中心旋转一个角度，center 默认以元素左上角为坐标原点
     *
     * @param {HTMLElement} element DOM 元素
     * @param {number} deg 旋转角度
     * @param {?PixelLike} [origin] 旋转中心
     */
    function rotate(element: HTMLElement, deg: number, origin?: PixelLike): void;
    /**
     * 为 DOM 元素设置 css 样式
     *
     * @param {(HTMLElement | HTMLElement[])} element DOM 元素
     * @param {Partial<CSSStyleDeclaration>} style css 样式
     * @returns {typeof DomUtil} this
     */
    function setCss(element: HTMLElement | HTMLElement[], style: Partial<CSSStyleDeclaration>): typeof DomUtil;
    /**
     * 清空 DOM 元素
     *
     * @param {HTMLElement} element DOM 元素
     */
    function empty(element: HTMLElement): void;
    /**
     * 将 DOM 元素从父节点删除
     *
     * @param {HTMLElement} element DOM 元素
     */
    function remove(element: HTMLElement): void;
    /**
     * 为 DOM 元素设置文本内容
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} text 文本内容
     */
    function fillText(element: HTMLElement, text: string): void;
    /**
     * 获取距离 Dom 元素最近的具有指定类名的元素
     *
     * @param {HTMLElement} element DOM 元素
     * @param {string} className 类名
     * @returns {(HTMLElement | null)}
     */
    function closest(element: HTMLElement, className: string): HTMLElement | null;
  }
}
