import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useCircleMarker } from "./useCircleMarker";

export interface CircleMarkerProps extends ContextProps, AMap.CircleMarker.Events, AMap.CircleMarker.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const CircleMarker = forwardRef<
  CircleMarkerProps & { instance: AMap.CircleMarker | undefined },
  CircleMarkerProps
>((props, ref) => {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(ref, () => ({ ...props, instance: circleMarker }), [props, circleMarker]);

  return null;
});
