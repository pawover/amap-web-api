import { TypeUtil } from "@pawover/kit-utils";
import { createElement, useEffect, useImperativeHandle, useReducer, useState, type Ref } from "react";
import { useMapContext } from "../../amap";
import type { ChildNodeType } from "../../index";
import { useLoca } from "./useLoca";
import { locaContextState, LocaContext, locaReducer } from "./useLocaContext";

export * from "./useLoca";
export * from "./useLocaContext";
export interface LocaProps {
  children?: ChildNodeType | ChildNodeType[];
}

export function LocaContainer (props: LocaProps & { ref?: Ref<LocaProps & { instance: Loca.Container | undefined }> }) {
  const { children, ...rest } = props;
  const { map } = useMapContext();
  const [state, dispatch] = useReducer(locaReducer, locaContextState);
  const [childNodeList, setChildNodeList] = useState<ChildNodeType[]>([]);
  const { loca } = useLoca({ ...rest, map });

  useImperativeHandle(props.ref, () => ({ ...props, instance: loca }), [props, loca]);

  useEffect(() => {
    dispatch({ loca, map });
  }, [map, loca]);

  useEffect(() => {
    if (TypeUtil.isArray(children)) {
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setChildNodeList(children);
    } else {
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setChildNodeList([children]);
    }
  }, [children]);

  return createElement(
    LocaContext.Provider,
    { value: state },
    childNodeList.map((child) => loca && (TypeUtil.isFunction(child) ? child() : child)),
  );
}
