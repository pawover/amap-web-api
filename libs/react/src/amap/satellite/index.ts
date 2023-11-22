import { forwardRef, useImperativeHandle } from "react";
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

export const Satellite = forwardRef<SatelliteProps & { instance: AMap.Satellite | undefined }, SatelliteProps>(
  (props, ref) => {
    const { satellite } = useSatellite(props);
    useImperativeHandle(ref, () => ({ ...props, instance: satellite }), [props, satellite]);

    return null;
  },
);
