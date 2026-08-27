import { useImperativeHandle, type Ref } from "react";
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

export function ToolBar (props: ToolBarProps & { ref?: Ref<ToolBarProps & { instance: AMap.ToolBar | undefined }> }) {
  const { toolBar } = useToolBar(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: toolBar }), [props, toolBar]);

  return null;
}
