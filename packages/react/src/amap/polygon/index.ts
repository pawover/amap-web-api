import type { AnyFunction } from "@pawover/kit-types";
import { useEffect, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { usePolygon } from "./usePolygon";

export interface PolygonProps extends ContextProps, AMap.Polygon.Events, AMap.Polygon.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: AnyFunction;
}

export function Polygon (props: PolygonProps & { ref?: Ref<PolygonProps & { instance: AMap.Polygon | undefined }> }) {
  const { polygon } = usePolygon(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(polygon);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [polygon]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: polygon }), [props, polygon]);

  return null;
}
