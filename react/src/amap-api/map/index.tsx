import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { mapContextState, MapCtx, mapReducer } from './context';
import { useMap } from './useMap';

export * from './context';
export * from './useMap';

export interface MapProps extends AMap.Map.Events, AMap.Map.Options {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  style?: React.HTMLAttributes<HTMLDivElement>['style'];
  container?: HTMLDivElement | undefined;
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
  const { children, className, style, customAttribute, ...rest } = props;
  const [state, dispatch] = useReducer(mapReducer, mapContextState);
  const [container, setContainer] = useState(props.container);
  const value = useMemo(() => ({ ...state, state, dispatch }), [state]);
  const { map } = useMap({ container, ...rest });

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

  useEffect(() => map && dispatch({ AMap, map, container }), [map]);
  useImperativeHandle(ref, () => ({ ...rest, AMap, map, container }), [map]);

  return (
    <MapCtx.Provider value={value}>
      <div
        ref={(element) => {
          !container && element && setContainer(element);
        }}
        className={className}
        style={{ width: '100%', height: '100%', ...style }}
        {...customAttribute}
      />
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
