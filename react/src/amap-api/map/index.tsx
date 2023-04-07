import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { MapCtx, mapContextState, mapReducer } from './context';

import { useMap } from './useMap';

export * from './context';
export * from './useMap';

export interface MapProps extends AMap.Map.Events, AMap.Map.Options {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  style?: React.HTMLAttributes<HTMLDivElement>['style'];
  container?: HTMLDivElement | null;
  customAttribute?: Recordable;
}

type ReactAMapElement = React.ReactElement<MapContext, React.FC<MapContext>>;

type RenderFn = (
  ctx: MapContext,
) => ReactAMapElement | JSX.Element | JSX.Element[] | string | number | boolean | null | undefined;

interface RenderProps {
  children?: RenderFn | ReactAMapElement | null | undefined | (RenderFn | ReactAMapElement | null | undefined)[];
}

export const Map = forwardRef<MapProps & { map?: AMap.Map | undefined }, MapProps & RenderProps>((props, ref) => {
  const { className = '', style = {}, children, customAttribute, ...rest } = props;
  const [state, dispatch] = useReducer(mapReducer, mapContextState);
  const elmRef = useRef<HTMLDivElement>(null);
  const value = useMemo(() => ({ ...state, state, dispatch }), [state]);
  const { map, container, setContainer } = useMap({ container: rest.container || elmRef.current, ...rest });

  const childrenFnList: RenderFn[] = [];
  const childrenElementList: React.ReactElement<MapContext, React.FC<MapContext> | string>[] = [];

  if (Array.isArray(children)) {
    const list = children as (RenderFn | ReactAMapElement)[];
    list.forEach((l) => {
      if (typeof l === 'function') childrenFnList.push(l);
      else childrenElementList.push(l);
    });
  } else if (children) {
    if (typeof children === 'function') childrenFnList.push(children);
    else childrenElementList.push(children as ReactAMapElement);
  }
  useEffect(() => setContainer(elmRef.current || null), [elmRef.current]);
  useEffect(() => map && dispatch({ AMap, map, container: elmRef.current }), [map]);
  useImperativeHandle(ref, () => ({ ...rest, AMap, map, container: rest.container || elmRef.current }), [map]);

  return (
    <MapCtx.Provider value={value}>
      {!rest.container && (
        <div
          ref={elmRef}
          className={`react-amap-wrapper ${className}`}
          style={{ width: '100%', height: '100%', ...style }}
          {...customAttribute}
        />
      )}
      {map && childrenFnList.map((f) => f({ AMap, map, container }))}
      {map &&
        childrenElementList.map((child, key) => {
          if (!isValidElement(child)) return null;
          if (typeof child?.type === 'string') return cloneElement(child, { key });
          return cloneElement(child, {
            ...child.props,
            key,
            AMap,
            map,
            container,
          });
        })}
    </MapCtx.Provider>
  );
});
