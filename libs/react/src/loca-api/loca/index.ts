import { createElement, forwardRef, useEffect, useImperativeHandle, useReducer, useState } from 'react';
import { isArray, isFunction } from '@handpear/shared';
import { type ChildNodeType, useMapContext } from '../../index';
import { useLoca } from './useLoca';
import { locaContextState, locaCtx, locaReducer } from './useLocaContext';

export * from './useLocaContext';
export * from './useLoca';
export interface LocaProps {
  children?: ChildNodeType | ChildNodeType[];
}

export const LocaContainer = forwardRef<LocaProps & { instance: Loca.Container | undefined }, LocaProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    const { map } = useMapContext();
    const [state, dispatch] = useReducer(locaReducer, locaContextState);

    const [childNodeList, setChildNodeList] = useState<ChildNodeType[]>([]);
    const { loca } = useLoca({ ...rest, map });

    useImperativeHandle(ref, () => ({ ...props, instance: loca }), [props, loca]);

    useEffect(() => {
      dispatch({ loca, map });
    }, [map, loca]);

    useEffect(() => {
      if (isArray(children)) setChildNodeList(children);
      else setChildNodeList([children]);
    }, [children]);

    return createElement(
      locaCtx.Provider,
      { value: state },
      childNodeList.map((child) => loca && (isFunction(child) ? child() : child)),
    );
  },
);
