declare namespace TypeUtil {
  interface DataType {
    array: unknown[];
    bigInt: bigint;
    boolean: boolean;
    date: Date;
    error: Error;
    file: File;
    function: (...args: any[]) => unknown;
    map: Map<unknown, unknown>;
    null: null;
    number: number;
    object: Record<string, unknown>;
    promise: Promise<unknown>;
    regExp: RegExp;
    set: Set<unknown>;
    string: string;
    symbol: symbol;
    undefined: undefined;
    weakMap: WeakMap<Obj, unknown>;
    weakSet: WeakSet<Obj>;
    window: Window;
    URLSearchParams: URLSearchParams;
  }
  type DataTypeKey = keyof DataType;
  type DataTypeString<T extends DataTypeKey = DataTypeKey> = `[object ${Capitalize<T>}]`;
}

export const dataTypeLabels: { [K in TypeUtil.DataTypeKey]: TypeUtil.DataTypeString<K> } = {
  array: "[object Array]",
  bigInt: "[object BigInt]",
  boolean: "[object Boolean]",
  date: "[object Date]",
  error: "[object Error]",
  file: "[object File]",
  function: "[object Function]",
  map: "[object Map]",
  null: "[object Null]",
  number: "[object Number]",
  object: "[object Object]",
  promise: "[object Promise]",
  regExp: "[object RegExp]",
  set: "[object Set]",
  string: "[object String]",
  symbol: "[object Symbol]",
  undefined: "[object Undefined]",
  weakMap: "[object WeakMap]",
  weakSet: "[object WeakSet]",
  window: "[object Window]",
  URLSearchParams: "[object URLSearchParams]",
};

function getDataTypeString<K extends TypeUtil.DataTypeKey>(value: unknown) {
  return Object.prototype.toString.call(value) as TypeUtil.DataTypeString<K>;
}

export const typeofMaps: { [K in TypeUtil.DataTypeKey]: Fn } = {
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  null: isNull,
  undefined: isUndefined,
  symbol: isSymbol,
  bigInt: isBigInt,
  object: isObject,
  array: isArray,
  function: isFunction,
  date: isDate,
  regExp: isRegExp,
  promise: isPromise,
  error: isError,
  file: isFile,
  map: isMap,
  set: isSet,
  weakMap: isWeakMap,
  weakSet: isWeakSet,
  window: isWindow,
  URLSearchParams: isURLSearchParams,
};

export function isNumber<T extends number>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.number;
}

export function isString<T extends string>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.string;
}

export function isBoolean<T extends boolean>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.boolean;
}

export function isNull<T extends null>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.null;
}

export function isUndefined<T extends undefined>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.undefined;
}

export function isSymbol<T extends symbol>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.symbol;
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt;
}

export function isObject<T extends Record<string, unknown>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.object;
}

export function isArray<T extends unknown[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array;
}

export function isFunction<T extends Fn>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.function;
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.date;
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.regExp;
}

export function isPromise<T extends Promise<unknown>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise;
}

export function isError<T extends Error>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.error;
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file;
}

export function isMap<T extends Map<unknown, unknown>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.map;
}

export function isSet<T extends Set<unknown>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.set;
}

export function isWeakMap<T extends WeakMap<Obj, unknown>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.weakMap;
}

export function isWeakSet<T extends WeakSet<Obj>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.weakSet;
}

export function isWindow<T extends Window>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.window;
}

export function isURLSearchParams<T extends Window>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.URLSearchParams;
}
