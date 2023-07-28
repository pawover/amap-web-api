declare namespace AMap {
  namespace Util {
    /**
     * 类标识
     *
     * @deprecated AMap Web API 2.x 中已废弃
     */
    const CLASS_NAME: 'AMap.Util';
    /**
     * 将颜色名转换为 16进制6位 的 RGB 颜色值
     * - 例如将 `red` 转换为 `#ff0000`
     *
     * @template C extends string
     * @param {C} colorName 颜色名
     * @returns {(`#${string}` | C)} 颜色值
     */
    function colorNameToHex<C extends string>(colorName: C): `#${string}` | C;
    /**
     * 将 16进制的 RGB 颜色值转为 rgba(R,G,B,A)
     *
     * @template C extends `#` | string | [number, number, number] | [number, number, number, number]
     * @template R extends C extends `#${string}`
            ? C['length'] extends 7 | 9
              ? RGBA
              : never
            : C extends string
            ? C['length'] extends 6 | 8
              ? RGBA
              : never
            : RGBA
     * @param {C} color 16进制的 RGB 颜色值
     * @returns {R} rgba(R,G,B,A)
     */
    function color2Rgba<
      C extends `#${string}` | string | [number, number, number] | [number, number, number, number],
      R extends C extends `#${string}`
        ? C['length'] extends 7 | 9
          ? RGBA
          : never
        : C extends string
        ? C['length'] extends 6 | 8
          ? RGBA
          : never
        : RGBA,
    >(color: C): R;
    /**
     * 将 16进制的 RGB 颜色值转为 rgba(R,G,B,A) 对应值
     *
     * @template C extends `#` | string | [number, number, number] | [number, number, number, number]
     * @template R extends C extends `#${string}`
          ? C['length'] extends 7 | 9
            ? RGBA
            : never
          : C extends string
          ? C['length'] extends 6 | 8
            ? RGBA
            : never
          : [number, number, number, number]
     * @param {C} color 16进制的 RGB 颜色值
     * @returns {R} [R,G,B,A]
     */
    function color2RgbaArray<
      C extends `#${string}` | string | [number, number, number] | [number, number, number, number],
      R extends C extends `#${string}`
        ? C['length'] extends 7 | 9
          ? RGBA
          : never
        : C extends string
        ? C['length'] extends 6 | 8
          ? RGBA
          : never
        : [number, number, number, number],
    >(color: C): R;
    /**
     * 将 16进制6位 的 RGB 颜色值转为 rgba(R,G,B,A)
     * - 参数请勿以 `#` 开头
     * - 例如将 `ff0000` 转换为 `rgba(255,0,0,1.00)`
     *
     * @template HEX extends string
     * @template R extends HEX extends `#` ? never : HEX['length'] extends 6 ? RGBA : `rgba(${string})`
     * @param {HEX} hex 16进制6位 的 RGB 颜色值
     * @returns {R} rgba(R,G,B,A)
     */
    function rgbHex2Rgba<
      HEX extends string,
      R extends HEX extends `#${string}` ? never : HEX['length'] extends 6 ? RGBA : `rgba(${string})`,
    >(hex: HEX): R;
    /**
     * 将 16进制8位 的 RGB 颜色值转为 rgba(R,G,B,A)
     * - 参数请勿以 `#` 开头
     * - 例如将 `ffff0000` 转换为 `rgba(255,0,0,1.00)`
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @template HEX extends string
     * @template R extends HEX extends `#` ? never : HEX['length'] extends 8 ? RGBA : `rgba(${string})`
     * @param {HEX} hex 16进制8位 的 RGB 颜色值
     * @returns {R} rgba(R,G,B,A)
     */
    function argbHex2Rgba<
      HEX extends string,
      R extends HEX extends `#${string}` ? never : HEX['length'] extends 8 ? RGBA : `rgba(${string})`,
    >(hex: HEX): R;
    /**
     * 判断对象或数组是否为空
     *
     * @template T extends Obj | unknown[]
     * @param {T} target 目标对象或数组
     * @returns {boolean} 是否为空
     */
    function isEmpty<T extends Obj | unknown[]>(target: T): boolean;
    /**
     * 从目标数组中删除指定项
     *
     * @template T = unknown
     * @param {T[]} array 目标数组
     * @param {T} item 指定项
     * @returns {T[]}
     */
    function deleteItemFromArray<T = unknown>(array: T[], item: T): T[];
    /**
     * 从目标数组中删除指定索引
     *
     * @template T = unknown
     * @param {T[]} array 目标数组
     * @param {number} index 指定索引
     * @returns {T[]}
     */
    function deleteItemFromArrayByIndex<T = unknown>(array: T[], index: number): T[];
    /**
     * 返回指定项在目标数组中的索引
     * - 不存在则返回 `-1`
     *
     * @template T = unknown
     * @param {T[]} array 目标数组
     * @param {T} item 指定项
     * @returns {number} 索引
     */
    function indexOf<T = unknown>(array: T[], item: T): number;
    /**
     * 四舍五入保留目标浮点数的小数点位数
     *
     * @param {number} floatNumber 目标浮点数
     * @param {?number} [digits] 小数点位数，默认 `0`
     * @returns {number} 结果
     */
    function format(floatNumber: number, digits?: number): number;
    /**
     * 判断目标是否为数组
     *
     * @param {unknown} target 目标
     * @returns {boolean} 是否为数组
     */
    function isArray(target: unknown): boolean;
    /**
     * 判断目标是否为函数
     *
     * @param {unknown} target 目标
     * @returns {boolean} 是否为函数
     */
    function isFunction(target: unknown): boolean;
    /**
     * 判断目标是否为整数
     *
     * @param {unknown} target 目标
     * @returns {boolean} 是否为函数
     */
    function isInteger(target: unknown): boolean;
    /**
     * 判断目标是否为 DOM 元素
     *
     * @param {unknown} target 目标
     * @returns {boolean} 是否为 DOM 元素
     */
    function isDOM(target: unknown): boolean;
    /**
     * 判断目标数组是否包含指定项
     *
     * @param {unknown[]} array 目标数组
     * @param {unknown} item 指定项
     * @returns {boolean} 是否包含
     */
    function includes(array: unknown[], item: unknown): boolean;
    /**
     * 同原生 requestIdleCallback
     */
    function requestIdleCallback(callback: Fn, options?: { timeout?: number | undefined }): number;
    /**
     * 同原生 cancelIdleCallback
     */
    function cancelIdleCallback(handle: number): void;
    /**
     * 同原生 requestAnimFrame
     */
    function requestAnimFrame<C = undefined>(callback: (this: C, ...args: any[]) => unknown, context?: C): number;
    /**
     * 同原生 cancelAnimFrame
     */
    function cancelAnimFrame(handle: number): void;
    /**
     * 获取优化后的缩放值
     *
     * @param {number} zoom 目标缩放值
     * @returns {number} 优化后的缩放值
     */
    function getOptimalZoom(zoom: number): number;
    /**
     * 将坐标或路径转化为 `AMap.LngLat`
     *
     * @template L extends LngLatLike | LngLatLike[]
     * @template R extends L extends LngLatLike ? LngLat : LngLat[]
     * @param {L} l 坐标或路径
     * @returns {R}
     */
    function parseLngLatData<L extends LngLatLike | LngLatLike[], R extends L extends LngLatLike ? LngLat : LngLat[]>(
      l: L,
    ): R;
  }
}
