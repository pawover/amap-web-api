import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useMarker } from './useMarker';

export * from './useMarker';
export interface MarkerProps extends CommonProps, AMap.Marker.Events, AMap.Marker.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层 DOM 容器的类名 */
  className?: string;
  children?: JSX.Element;
}

export const Marker = forwardRef<MarkerProps & { marker: AMap.Marker | undefined }, MarkerProps>((props, ref) => {
  const { marker, MarkerWrapper } = useMarker(props);
  useImperativeHandle(ref, () => ({ ...props, marker }), [props, marker]);

  return <MarkerWrapper>{props.children}</MarkerWrapper>;
});
