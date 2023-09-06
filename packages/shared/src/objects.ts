/**
 * 返回对象的可枚举属性和方法的名称
 * - `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型
 *
 * @param {O} object 对象
 * @returns {(keyof O)[]} 对象所有可枚举的属性的键名
 */
export function ObjectKeys<O extends Obj>(object: O): (keyof O)[] {
  return Object.keys(object);
}

/**
 * 返回对象的可枚举属性的值数组
 *
 * @param {O} object 对象
 */
export function ObjectValues<O extends Obj>(object: O): O[keyof O][] {
  return Object.values(object);
}

/**
 * 返回对象的可枚举属性的键/值数组
 *
 * @param {O} object 对象
 */
export function ObjectEntries<O extends Obj>(object: { [K in keyof O]: O[K] }): [keyof O, O[keyof O]][];
export function ObjectEntries<O extends Obj>(object: O) {
  return Object.entries(object) as [keyof O, O[keyof O]][];
}
