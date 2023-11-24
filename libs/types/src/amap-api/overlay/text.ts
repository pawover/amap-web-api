declare namespace AMap {
  namespace Text {
    interface Options extends Marker.Options {
      /**
       * 标记显示的文本内容
       */
      text?: string;
      /**
       * 标记样式信息
       * - 格式同 css 属性，如:`{ backgroundColor: 'red' }`
       */
      style?: Partial<CSSStyleDeclaration>;
    }
    interface Events extends Marker.Events {}
  }

  /**
   * 标记 - 文本
   *
   * @class Text
   * @extends {Marker} 标记 - 点
   */
  class Text extends Marker {
    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Text.Options} options 构造参数
     */
    public constructor(options?: Text.Options);

    /** 获取标记内容 */
    public getText(): string | undefined;
    /** 设置标记内容 */
    public setText(text: string): void;

    /** 设置标记样式信息 */
    public setStyle(style: Text.Options["style"]): void;
  }
}
