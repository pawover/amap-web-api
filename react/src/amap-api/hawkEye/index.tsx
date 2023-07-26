import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useHawkEye } from './useHawkEye';

export * from './useHawkEye';
export interface HawkEyeProps extends CommonProps, AMap.HawkEye.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const HawkEye = forwardRef<HawkEyeProps & { hawkEye: AMap.HawkEye | undefined }, HawkEyeProps>((props, ref) => {
  const { hawkEye } = useHawkEye(props);
  useImperativeHandle(ref, () => ({ ...props, hawkEye }), [props, hawkEye]);

  return null;
});
