import { useEffect, useRef, useState } from 'react';

export * from './usePortal';

/**
 * 对实例有 setStatus 更改状态的处理
 * @param instance
 * @param props
 * @param propsName
 */
export const useSetStatus = <
  I extends { getStatus: () => AMap.Map.States; setStatus: (opt: AMap.Map.States) => void },
  P extends {} = {},
  N extends string[] = string[],
>(
  instance: I,
  props: P,
  propsName: N,
) => {
  propsName.forEach((n) => {
    const name = n as keyof P;
    const [state, setState] = useState(props[name]);
    useEffect(() => {
      if (instance && name in props && props[name] !== state) {
        const status = instance.getStatus() || {};
        instance.setStatus({ ...status, [name]: props[name] });
        setState(props[name]);
      }
    }, [instance, props[name]]);
  });
};

/**
 * 针对 Overlay 类型的组件，通过参数 `visible` 来控制执行 `show()` or `hide()`
 *
 * @template I extends { show: () => void; hide: () => void }
 * @param {I} instance 覆盖物实例
 * @param {boolean} [visible=true] 是否显示
 */
export const useVisible = <I extends { show: () => void; hide: () => void }>(instance: I, visible: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(visible);
  useEffect(() => {
    if (instance) {
      visible ? instance.show?.() : instance.hide?.();
      visible !== isShow && setIsShow(visible);
    }
  }, [instance, visible]);
};

/**
 * 获取上一轮的 props 或 state，[相关参考](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   return <h1>Now: {count}, before: {prevCount}</h1>;
 * }
 * ```
 */
export const usePrevious = <T,>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * 绑定事件
 *
 * @template I extends AMap.Event<AMap.EventList>
 * @template P
 * @param {I} instance 实例对象
 * @param {P} props 实例对象的 props
 * @param {`on`[]} [events=[]] 事件名称列表，例如 `["onClick", "onDblClick"]`
 * @example
 * ```tsx
    useEventProperties<AMap.Marker, UseMarker, AMap.Marker.Events>(marker!, props, [
      'onMouseMove', 'onZoomChange', 'onMapMove', 'onMouseWheel', 'onZoomStart'
    ]);
 * ```
 */
export const useEventProperties = <I extends AMap.Event<AMap.EventList>, P, E extends Partial<P>>(
  instance: I,
  props: P,
  events: Extract<keyof P, keyof E extends `on${string}` ? keyof E : never>[],
) => {
  events.forEach((event) => {
    const eventHandle = props[event] as ((event: AMap.MapsEvent<AMap.EventList, unknown>) => void) | undefined;
    useEffect(() => {
      if (!instance) return;
      const eName = event.toLocaleLowerCase().replace(/^on/, '') as AMap.EventList;
      if (eventHandle && eName) instance.on(eName, eventHandle);
      return () => {
        if (eventHandle && eName) instance.off(eName, eventHandle);
      };
    }, [instance, props[event]]);
  });
};

/**
 * 属性受控
 *
 * @template I
 * @template P = {}
 * @param {I} instance 实例对象
 * @param {P} props 实例对象的 props
 * @param {string[]} [propNames=[]] 受控属性名称
 * @example
  ```tsx
    useSetProperties<AMap.Polyline, UsePolyline>(polyline!, props, Object.keys(props) as (keyof typeof props)[]);
  ```
 */
export const useSetProperties = <I extends {}, P extends {} = {}>(
  instance: I,
  props: P,
  propNames: (string & keyof P)[] = [],
) => {
  propNames.forEach((name) => {
    const fnName = `set${name.charAt(0).toUpperCase()}${name.slice(1)}` as keyof I;
    const [state, setState] = useState(props[name]);
    useEffect(() => {
      if (instance && props[name] !== undefined) {
        if (instance[fnName]) {
          if (props[name] !== state && instance[fnName] && typeof instance[fnName] === 'function') {
            (instance[fnName] as unknown as (...args: any[]) => void)?.(props[name]);
            setState(props[name]);
          }
        } else if ('getOptions' in instance && 'setOptions' in instance) {
          const thisInstance = instance as AMap.GetSet.Options<Recordable>;
          const options = thisInstance.getOptions?.();
          if (options) {
            if (props[name] !== state) {
              thisInstance.setOptions?.({ ...options, [name]: props[name] });
              setState(props[name]);
            }
          }
        }
      }
    }, [instance, props[name]]);
  });
};
