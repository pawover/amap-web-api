import type { AnyFunction } from "@pawover/kit-types";

declare global {
  namespace AMapUI {
    interface Utils {
      arrayIndexOf: <T>(array: T[], searchElement: T, fromIndex: number) => number;
      bind: AnyFunction;
      debounce: AnyFunction;
      domReady: AnyFunction;
      escapeHtml: AnyFunction;
      extend: AnyFunction;
      extendObjs: AnyFunction;
      forEach: AnyFunction;
      inherit: AnyFunction;
      isArray: AnyFunction;
      isDefined: AnyFunction;
      isFunction: AnyFunction;
      isHTMLElement: AnyFunction;
      isNumber: AnyFunction;
      isObject: AnyFunction;
      isSVGElement: AnyFunction;
      isString: AnyFunction;
      keys: AnyFunction;
      log: Log;
      logger: Log;
      map: AnyFunction;
      merge: AnyFunction;
      mergeArray: AnyFunction;
      nestExtendObjs: AnyFunction;
      nextTick: AnyFunction;
      now: AnyFunction;
      random: AnyFunction;
      randomInt: AnyFunction;
      removeFromArray: AnyFunction;
      setDebugMode: AnyFunction;
      setLogger: AnyFunction;
      slientLogger: Log;
      subset: AnyFunction;
      throttle: AnyFunction;
      trigger: AnyFunction;
      trim: AnyFunction;
      ucfirst: AnyFunction;
    }

    interface Log {
      debug: AnyFunction;
      error: AnyFunction;
      info: AnyFunction;
      log: AnyFunction;
      trace: AnyFunction;
      warn: AnyFunction;
    }
  }
}

export {};

