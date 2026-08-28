import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useHeatMap } from "./useHeatMap";

export interface HeatMapProps extends ContextProps, AMap.HeatMap.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function HeatMap (props: HeatMapProps & { ref?: Ref<HeatMapProps & { instance: AMap.HeatMap | undefined }> }) {
  const { heatMap } = useHeatMap(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: heatMap }), [props, heatMap]);

  return null;
}
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export function Heatmap (props: HeatMapProps & { ref?: Ref<HeatMapProps & { instance: AMap.Heatmap | undefined }> }) {
  const { heatMap } = useHeatMap(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: heatMap }), [props, heatMap]);

  return null;
}
