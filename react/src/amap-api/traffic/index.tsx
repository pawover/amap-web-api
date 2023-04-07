import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useTraffic } from './useTraffic';

export * from './useTraffic';
export interface TrafficProps extends CommonProps, AMap.Traffic.Events, AMap.Traffic.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const Traffic = forwardRef<TrafficProps & { traffic: AMap.Traffic | undefined }, TrafficProps>((props, ref) => {
  const { traffic } = useTraffic(props);
  useImperativeHandle(ref, () => ({ ...props, traffic }), [traffic]);

  return null;
});
