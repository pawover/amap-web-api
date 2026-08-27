import { TypeUtil } from "@pawover/kit-utils";
import { createElement, useEffect, useImperativeHandle, useReducer, useState, type Ref } from "react";
import type { ChildNodeType } from "../../index";
import { useMap } from "./useMap";
import { mapContextState, MapContext, mapReducer } from "./useMapContext";

export type { ContextProps } from "./useMap";
export { useMapContext } from "./useMapContext";

export interface MapProps extends AMap.Map.Events, AMap.Map.Options {
  /** 容器的 `id`，可用于获取容器的元素实例 */
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ChildNodeType | ChildNodeType[];
}

export function Map (props: MapProps & { ref?: Ref<MapProps & { instance: AMap.Map | undefined }> }) {
  const { children, id, className, style, ...rest } = props;
  const [state, dispatch] = useReducer(mapReducer, mapContextState);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [childNodeList, setChildNodeList] = useState<ChildNodeType[]>([]);
  const { map } = useMap({ container, ...rest });

  useImperativeHandle(props.ref, () => ({ ...props, instance: map }), [props, map]);

  useEffect(() => {
    dispatch({ map });
  }, [map]);

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
    MapContext.Provider,
    { value: state },
    createElement(
      "div",
      {
        ref: (element: HTMLDivElement | undefined) => {
          element && setContainer(element);
        },
        id,
        className,
        style: { width: "100%", height: "100%", ...style },
      },
      childNodeList.map((child) => map && (TypeUtil.isFunction(child) ? child() : child)),
    ),
  );
}
