import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useCircleMarker } from './useCircleMarker';

export * from './useCircleMarker';
export interface CircleMarkerProps extends CommonProps, AMap.CircleMarker.Events, AMap.CircleMarker.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const CircleMarker = forwardRef<
  CircleMarkerProps & { circleMarker: AMap.CircleMarker | undefined },
  CircleMarkerProps
>((props, ref) => {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(ref, () => ({ ...props, circleMarker }), [circleMarker]);

  return null;
});
