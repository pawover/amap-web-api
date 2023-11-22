import { forwardRef, useEffect, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { usePolygon } from "./usePolygon";

export interface PolygonProps extends ContextProps, AMap.Polygon.Events, AMap.Polygon.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export const Polygon = forwardRef<PolygonProps & { instance: AMap.Polygon | undefined }, PolygonProps>((props, ref) => {
  const { polygon } = usePolygon(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(polygon);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [polygon]);

  useImperativeHandle(ref, () => ({ ...props, instance: polygon }), [props, polygon]);

  return null;
});
