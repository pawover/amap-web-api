import { useEffect, useRef, useState } from 'react';
import { isFunction } from '@handpear/shared';

/**
 * 获取上一轮的 props 或 state
 */
export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

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
export const useSetStatus = <I extends AMap.Map, P extends Obj, N extends string[] = string[]>(
  instance: I | undefined,
  props: P,
  propList: N,
) => {
  useEffect(() => {
    propList.forEach((prop) => {
      if (instance && prop in props) {
        const status = instance.getStatus();
        instance.setStatus({ ...status, [prop]: props[prop] });
      }
    });
  }, [instance, props, propList]);
};

/**
 * 显示隐藏
 *
 * @template I
 * @param {I} instance 实例对象
 * @param {boolean} visible 显示状态
 */
export const useVisible = <I extends { show: () => void; hide: () => void }>(
  instance: I | undefined,
  visible: boolean,
) => {
  const [isShow, setIsShow] = useState<boolean>(visible);

  useEffect(() => {
    if (instance) {
      visible ? instance.show?.() : instance.hide?.();
      visible !== isShow && setIsShow(visible);
    }
  }, [instance, visible]);
};

/**
 * 属性受控
 *
 * @template I
 * @template P
 * @param {I} instance 实例对象
 * @param {P} props props
 */
export const useProperty = <I extends Obj | AMap.Accessor.Options<unknown>, P extends Obj>(
  instance: I | undefined,
  props: P,
) => {
  const prevProps = usePrevious(props);

  useEffect(() => {
    Object.keys(props).forEach((prop) => {
      if (instance && props[prop] && props[prop] !== prevProps?.[prop]) {
        const fnName = `set${prop.charAt(0).toUpperCase()}${prop.slice(1)}` as keyof I;

        if (prop in props && isFunction(instance[fnName])) {
          (instance[fnName] as Fn)?.(props[prop]);
        } else if ('getOptions' in instance && 'setOptions' in instance) {
          const options = instance.getOptions?.();
          if (options) instance.setOptions?.({ ...options, [prop]: props[prop] });
        }
      }
    });
  }, [instance, props]);
};

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
export const useEventProperty = <I extends AMap.Event<AMap.EventList>, P extends Obj, E extends Partial<P>>(
  instance: I | undefined,
  props: P,
  eventList: Extract<keyof P, keyof E extends `on${string}` ? keyof E : never>[],
) => {
  useEffect(() => {
    eventList.forEach((event) => {
      if (instance && event in props && props[event]) {
        const eName = event.toLowerCase().slice(2) as AMap.EventList;
        const hasEvent = instance.hasEvents(eName, props[event]);
        !hasEvent && instance.on(eName, props[event]);
      }
    });

    return () => {
      eventList.forEach((event) => {
        if (instance && event in props && props[event]) {
          const eName = event.toLowerCase().slice(2) as AMap.EventList;
          const hasEvent = instance.hasEvents(eName, props[event]);
          hasEvent && instance.off(eName, props[event]);
        }
      });
    };
  }, [instance, props, eventList]);
};
