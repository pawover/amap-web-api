declare namespace AMap {
  namespace ContextMenu {
    interface Options {
      /** 右键菜单显示的位置 */
      position?: LngLatLike;
      /** 显示内容，可以是字符串或者 HTML DOM 对象 */
      content?: string | HTMLElement;
      /** 禁用右键菜单 */
      disabled?: boolean;
    }
    interface Events {
      /** 打开 */
      onOpen?: (event: MapsEvent<'open', undefined>) => void;
      /** 关闭 */
      onClose?: (event: MapsEvent<'close', undefined>) => void;
    }
  }

  /**
   * 右键菜单
   *
   * @class ContextMenu
   * @extends {Event<'open' | 'close'>}
   */
  class ContextMenu extends Event<'open' | 'close'> {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {ContextMenu.Options} options 构造参数
     */
    public constructor(options?: ContextMenu.Options);

    public className: 'AMap.ContextMenu';
    public type: 'AMap.ContextMenu';

    /** 打开右键菜单 */
    public open(map: Map, position: LngLatLike): void;
    /** 关闭右键菜单 */
    public close(): void;
    /**
     * 右键菜单中添加一个菜单项
     *
     * @public
     * @param {string} label 菜单显示文本
     * @param {?(event: MouseEvent) => void} fn 点击后执行的操作
     * @param {?number} index 当前菜单项在右键菜单中的排序位置，以 0 开始
     */
    public addItem(label: string, fn?: (event: MouseEvent) => void, index?: number): void;
    /**
     * 右键菜单中删除一个菜单项
     *
     * @public
     * @param {string} label 菜单显示文本
     * @param {?(event: MouseEvent) => void} fn 点击后执行的操作
     */
    public removeItem(label: string, fn?: (event: MouseEvent) => void): void;
  }
}
