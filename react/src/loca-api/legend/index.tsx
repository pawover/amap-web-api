import React, { forwardRef, useImperativeHandle } from 'react';
import { useLegend } from './useLegend';

export * from './useLegend';
export interface LegendProps extends LocaContext, Loca.Legend.Options {}

export const Legend = forwardRef<LegendProps & { legend: Loca.Legend | undefined }, LegendProps>((props, ref) => {
  const { legend } = useLegend(props);
  useImperativeHandle(ref, () => ({ ...props, legend }), [legend]);

  return null;
});
