declare namespace AMapUI {
  interface Utils {
    arrayIndexOf: <T>(array: T[], searchElement: T, fromIndex: number) => number;
    bind: Fn;
    debounce: Fn;
    domReady: Fn;
    escapeHtml: Fn;
    extend: Fn;
    extendObjs: Fn;
    forEach: Fn;
    inherit: Fn;
    isArray: Fn;
    isDefined: Fn;
    isFunction: Fn;
    isHTMLElement: Fn;
    isNumber: Fn;
    isObject: Fn;
    isSVGElement: Fn;
    isString: Fn;
    keys: Fn;
    log: Log;
    logger: Log;
    map: Fn;
    merge: Fn;
    mergeArray: Fn;
    nestExtendObjs: Fn;
    nextTick: Fn;
    now: Fn;
    random: Fn;
    randomInt: Fn;
    removeFromArray: Fn;
    setDebugMode: Fn;
    setLogger: Fn;
    slientLogger: Log;
    subset: Fn;
    throttle: Fn;
    trigger: Fn;
    trim: Fn;
    ucfirst: Fn;
  }

  interface Log {
    debug: Fn;
    error: Fn;
    info: Fn;
    log: Fn;
    trace: Fn;
    warn: Fn;
  }
}
