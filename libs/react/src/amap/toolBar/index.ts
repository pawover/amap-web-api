import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useToolBar } from "./useToolBar";

export interface ToolBarProps extends ContextProps, AMap.ToolBar.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ToolBar = forwardRef<ToolBarProps & { instance: AMap.ToolBar | undefined }, ToolBarProps>((props, ref) => {
  const { toolBar } = useToolBar(props);
  useImperativeHandle(ref, () => ({ ...props, instance: toolBar }), [props, toolBar]);

  return null;
});
