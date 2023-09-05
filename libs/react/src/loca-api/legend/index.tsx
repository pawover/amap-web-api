import { forwardRef, useImperativeHandle } from 'react';
import { useLegend } from './useLegend';

export * from './useLegend';
export interface LegendProps extends LocaContext, Loca.Legend.Options {}

export const Legend = forwardRef<LegendProps & { instance: Loca.Legend | undefined }, LegendProps>((props, ref) => {
  const { legend } = useLegend(props);
  useImperativeHandle(ref, () => ({ ...props, instance: legend }), [props, legend]);

  return null;
});
