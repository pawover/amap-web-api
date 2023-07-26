import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
} from 'react';
import { locaContextState, LocaCtx, locaReducer } from './context';
import { useLoca } from './useLoca';

export * from './context';
export * from './useLoca';

export interface LocaProps extends LocaContext {}

type RenderFn = (ctx: LocaContext) => React.ReactElement<LocaContext, React.FC<LocaContext>>;

interface RenderProps {
  children?:
    | RenderFn
    | React.ReactElement<LocaContext, React.FC<LocaContext>>
    | (RenderFn | React.ReactElement<LocaContext, React.FC<LocaContext>>)[];
}

export const LocaContainer = forwardRef<LocaProps, LocaProps & RenderProps>((props, ref) => {
  const { children, ...rest } = props;
  const { locaContainer } = useLoca(rest);
  const [state, dispatch] = useReducer(locaReducer, locaContextState);
  const value = useMemo(() => ({ ...state, state, dispatch }), [state]);

  const childrenFnList: RenderFn[] = [];
  const childrenElementList: React.ReactElement<LocaContext, React.FC<LocaContext> | string>[] = [];

  if (Array.isArray(children)) {
    const list = children as (RenderFn | React.ReactElement<LocaContext, React.FC<LocaContext>>)[];
    list.forEach((l) => {
      if (typeof l === 'function') childrenFnList.push(l);
      else childrenElementList.push(l);
    });
  } else {
    if (typeof children === 'function') childrenFnList.push(children);
    else childrenElementList.push(children as React.ReactElement<LocaContext, React.FC<LocaContext>>);
  }
  useEffect(() => props.map && dispatch({ map: props.map, Loca, locaContainer }), [props.map, locaContainer]);
  useImperativeHandle(ref, () => ({ map: props.map, Loca, locaContainer }), [props.map, locaContainer]);

  return (
    <LocaCtx.Provider value={value}>
      {locaContainer && childrenFnList.map((f) => f({ map: props.map, Loca, locaContainer }))}
      {locaContainer &&
        childrenElementList.map((child, key) => {
          if (!isValidElement(child)) return null;
          if (typeof child?.type === 'string') return cloneElement(child, { key });
          return cloneElement(child, {
            ...child.props,
            key,
            map: props.map,
            Loca,
            locaContainer,
          });
        })}
    </LocaCtx.Provider>
  );
});
