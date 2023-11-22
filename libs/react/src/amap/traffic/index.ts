import { forwardRef, useImperativeHandle } from "react";
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

export const Traffic = forwardRef<TrafficProps & { instance: AMap.Traffic | undefined }, TrafficProps>((props, ref) => {
  const { traffic } = useTraffic(props);
  useImperativeHandle(ref, () => ({ ...props, instance: traffic }), [props, traffic]);

  return null;
});
