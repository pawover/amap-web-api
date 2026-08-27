import type { AnyObject } from "@pawover/kit-types";
import { TypeUtil } from "@pawover/kit-utils";
import { useEffect, useState } from "react";

/**
 * 获取上一轮的 props 或 state
 */
export function usePrevious<T> (value: T) {
  const [prev, setPrev] = useState<T | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- 记录上一轮值需在渲染后更新
    setPrev(value);
  });

  return prev;
}

/**
 * 对实例有 setStatus 更改状态的处理
 *
 * @template I
 * @template P
 * @template N
 * @param {I} instance
 * @param {P} props
 * @param {N} propList 可受控属性名称列表
 */
export function useSetStatus<I extends AMap.Map, P extends AnyObject, N extends string[] = string[]> (instance: I | undefined, props: P, propList: N) {
  useEffect(() => {
    propList.forEach((prop) => {
      if (instance && prop in props) {
        const status = instance.getStatus();
        instance.setStatus({ ...status, [prop]: props[prop] });
      }
    });
  }, [instance, props, propList]);
}

/**
 * 显示隐藏
 *
 * @template I
 * @param {I} instance 实例对象
 * @param {boolean} visible 显示状态
 */
export function useVisible<I extends { show: () => void; hide: () => void }> (instance: I | undefined, visible: boolean) {
  const [isShow, setIsShow] = useState<boolean>(visible);

  useEffect(() => {
    if (instance) {

      visible ? instance.show?.() : instance.hide?.();
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      visible !== isShow && setIsShow(visible);
    }
  }, [instance, visible]);
}

/**
 * 属性受控
 *
 * @template I
 * @template P
 * @param {I} instance 实例对象
 * @param {P} props props
 */
export function useProperty<I extends AnyObject | AMap.Accessor.Options<unknown>, P extends AnyObject> (instance: I | undefined, props: P) {
  const prevProps = usePrevious(props);

  useEffect(() => {
    Object.keys(props).forEach((prop) => {
      if (instance && props[prop] && props[prop] !== prevProps?.[prop]) {
        const fnName = `set${prop.charAt(0).toUpperCase()}${prop.slice(1)}` as keyof I;

        if (prop in props && TypeUtil.isFunction(instance[fnName])) {
          (instance[fnName] as Fn)?.(props[prop]);
        } else if ("getOptions" in instance && "setOptions" in instance) {
          const options = instance.getOptions?.();
          if (options) {
            instance.setOptions?.({ ...options, [prop]: props[prop] });
          }
        }
      }
    });
  }, [instance, props]);
}

/**
 * 事件绑定
 *
 * @template I
 * @template P
 * @template E
 * @param {I} instance 实例对象
 * @param {P} props props
 * @param {Extract<keyof P, keyof E extends `on${string}` ? keyof E : never>[]} eventList 可受控事件名称列表
 */
export function useEventProperty<I extends AMap.Event<AMap.EventType>, P extends AnyObject, E extends Partial<P>> (instance: I | undefined, props: P, eventList: Extract<keyof P, keyof E extends `on${string}` ? keyof E : never>[]) {
  useEffect(() => {
    eventList.forEach((event) => {
      if (instance && event in props && props[event]) {
        const eName = event.toLowerCase().slice(2) as AMap.EventType;
        const hasEvent = instance.hasEvents(eName, props[event]);
        !hasEvent && instance.on(eName, props[event]);
      }
    });

    return () => {
      eventList.forEach((event) => {
        if (instance && event in props && props[event]) {
          const eName = event.toLowerCase().slice(2) as AMap.EventType;
          const hasEvent = instance.hasEvents(eName, props[event]);
          hasEvent && instance.off(eName, props[event]);
        }
      });
    };
  }, [instance, props, eventList]);
}
