import { createElement, forwardRef, useEffect, useImperativeHandle, useReducer, useState } from 'react';
import { isArray, isFunction } from '@handpear/shared';
import { useMap } from './useMap';
import { mapContextState, mapCtx, mapReducer } from './useMapContext';

export * from './useMapContext';
export * from './useMap';
export type ChildNode = React.ReactNode;
export type ChildNodeRender = () => React.ReactNode;
export type ChildNodeType = ChildNode | ChildNodeRender;
export interface MapProps extends AMap.Map.Events, AMap.Map.Options {
  /** 容器的 `id`，可用于获取容器的元素实例 */
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ChildNodeType | ChildNodeType[];
}

export const Map = forwardRef<MapProps & { instance: AMap.Map | undefined }, MapProps>((props, ref) => {
  const { children, id, className, style, ...rest } = props;
  const [state, dispatch] = useReducer(mapReducer, mapContextState);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [childNodeList, setChildNodeList] = useState<ChildNodeType[]>([]);
  const { map } = useMap({ container, ...rest });

  useImperativeHandle(ref, () => ({ ...props, instance: map }), [props, map]);

  useEffect(() => {
    dispatch({ map });
  }, [map]);

  useEffect(() => {
    if (isArray(children)) setChildNodeList(children);
    else setChildNodeList([children]);
  }, [children]);

  return createElement(
    mapCtx.Provider,
    { value: { ...state } },
    createElement(
      'div',
      {
        ref: (element: HTMLDivElement | undefined) => {
          element && setContainer(element);
        },
        id,
        className,
        style: { width: '100%', height: '100%', ...style },
      },
      childNodeList.map((child) => map && (isFunction(child) ? child() : child)),
    ),
  );
});
