import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useToolBar } from './useToolBar';

export * from './useToolBar';
export interface ToolBarProps extends CommonProps, AMap.ToolBar.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ToolBar = forwardRef<ToolBarProps & { toolBar: AMap.ToolBar | undefined }, ToolBarProps>((props, ref) => {
  const { toolBar } = useToolBar(props);
  useImperativeHandle(ref, () => ({ ...props, toolBar }), [toolBar]);

  return null;
});
