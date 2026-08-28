import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useTraffic } from "./useTraffic";

export interface TrafficProps extends ContextProps, AMap.Traffic.Events, AMap.Traffic.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function Traffic (props: TrafficProps & { ref?: Ref<TrafficProps & { instance: AMap.Traffic | undefined }> }) {
  const { traffic } = useTraffic(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: traffic }), [props, traffic]);

  return null;
}
