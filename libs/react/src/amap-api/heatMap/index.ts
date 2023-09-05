import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useHeatMap } from './useHeatMap';

export * from './useHeatMap';
export interface HeatMapProps extends ContextProps, AMap.HeatMap.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const HeatMap = forwardRef<HeatMapProps & { instance: AMap.HeatMap | undefined }, HeatMapProps>((props, ref) => {
  const { heatMap } = useHeatMap(props);
  useImperativeHandle(ref, () => ({ ...props, instance: heatMap }), [props, heatMap]);

  return null;
});
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export const Heatmap = forwardRef<HeatMapProps & { instance: AMap.Heatmap | undefined }, HeatMapProps>((props, ref) => {
  const { heatMap } = useHeatMap(props);
  useImperativeHandle(ref, () => ({ ...props, instance: heatMap }), [props, heatMap]);

  return null;
});
