import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useSatellite } from './useSatellite';

export * from './useSatellite';
export interface SatelliteProps extends CommonProps, AMap.Satellite.Events, AMap.Satellite.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const Satellite = forwardRef<SatelliteProps & { satellite: AMap.Satellite | undefined }, SatelliteProps>(
  (props, ref) => {
    const { satellite } = useSatellite(props);
    useImperativeHandle(ref, () => ({ ...props, satellite }), [satellite]);

    return null;
  },
);
