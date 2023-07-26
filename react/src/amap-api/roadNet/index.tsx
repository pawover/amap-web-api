import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useRoadNet } from './useRoadNet';

export * from './useRoadNet';
export interface RoadNetProps extends CommonProps, AMap.RoadNet.Events, AMap.RoadNet.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const RoadNet = forwardRef<RoadNetProps & { roadNet: AMap.RoadNet | undefined }, RoadNetProps>((props, ref) => {
  const { roadNet } = useRoadNet(props);
  useImperativeHandle(ref, () => ({ ...props, roadNet }), [props, roadNet]);

  return null;
});
