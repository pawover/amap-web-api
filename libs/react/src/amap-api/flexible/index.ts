import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useFlexible } from './useFlexible';

export * from './useFlexible';
export interface FlexibleProps extends ContextProps, AMap.Flexible.Events, AMap.Flexible.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const Flexible = forwardRef<FlexibleProps & { instance: AMap.Flexible | undefined }, FlexibleProps>(
  (props, ref) => {
    const { flexible } = useFlexible(props);
    useImperativeHandle(ref, () => ({ ...props, instance: flexible }), [props, flexible]);

    return null;
  },
);
