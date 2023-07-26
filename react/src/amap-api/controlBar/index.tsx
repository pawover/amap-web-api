import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useControlBar } from './useControlBar';

export * from './useControlBar';
export interface ControlBarProps extends CommonProps, AMap.ControlBar.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ControlBar = forwardRef<ControlBarProps & { controlBar: AMap.ControlBar | undefined }, ControlBarProps>(
  (props, ref) => {
    const { controlBar } = useControlBar(props);
    useImperativeHandle(ref, () => ({ ...props, controlBar }), [props, controlBar]);

    return null;
  },
);
