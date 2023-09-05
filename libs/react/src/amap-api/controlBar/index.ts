import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useControlBar } from './useControlBar';

export * from './useControlBar';
export interface ControlBarProps extends ContextProps, AMap.ControlBar.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ControlBar = forwardRef<ControlBarProps & { instance: AMap.ControlBar | undefined }, ControlBarProps>(
  (props, ref) => {
    const { controlBar } = useControlBar(props);
    useImperativeHandle(ref, () => ({ ...props, instance: controlBar }), [props, controlBar]);

    return null;
  },
);
