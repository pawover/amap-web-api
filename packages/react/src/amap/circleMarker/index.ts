import { useImperativeHandle, type Ref } from "react";
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

export function CircleMarker (props: CircleMarkerProps & { ref?: Ref<CircleMarkerProps & { instance: AMap.CircleMarker | undefined }> }) {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: circleMarker }), [props, circleMarker]);

  return null;
}
