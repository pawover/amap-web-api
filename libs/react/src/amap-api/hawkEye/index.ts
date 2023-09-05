import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useHawkEye } from './useHawkEye';

export * from './useHawkEye';
export interface HawkEyeProps extends ContextProps, AMap.HawkEye.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const HawkEye = forwardRef<HawkEyeProps & { instance: AMap.HawkEye | undefined }, HawkEyeProps>((props, ref) => {
  const { hawkEye } = useHawkEye(props);
  useImperativeHandle(ref, () => ({ ...props, instance: hawkEye }), [props, hawkEye]);

  return null;
});
