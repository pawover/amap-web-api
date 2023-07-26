import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useFlexible } from './useFlexible';

export * from './useFlexible';
export interface FlexibleProps extends CommonProps, AMap.Flexible.Events, AMap.Flexible.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const Flexible = forwardRef<FlexibleProps & { flexible: AMap.Flexible | undefined }, FlexibleProps>(
  (props, ref) => {
    const { flexible } = useFlexible(props);
    useImperativeHandle(ref, () => ({ ...props, flexible }), [props, flexible]);

    return null;
  },
);
