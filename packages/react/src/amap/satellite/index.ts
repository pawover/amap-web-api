import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useSatellite } from "./useSatellite";

export interface SatelliteProps extends ContextProps, AMap.Satellite.Events, AMap.Satellite.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function Satellite (props: SatelliteProps & { ref?: Ref<SatelliteProps & { instance: AMap.Satellite | undefined }> }) {
  const { satellite } = useSatellite(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: satellite }), [props, satellite]);

  return null;
}
