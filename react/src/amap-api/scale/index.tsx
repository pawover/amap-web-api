import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useScale } from './useScale';

export * from './useScale';
export interface ScaleProps extends CommonProps, AMap.Scale.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const Scale = forwardRef<ScaleProps & { scale: AMap.Scale | undefined }, ScaleProps>((props, ref) => {
  const { scale } = useScale(props);
  useImperativeHandle(ref, () => ({ ...props, scale }), [props, scale]);

  return null;
});
