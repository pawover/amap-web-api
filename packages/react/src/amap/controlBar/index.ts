import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useControlBar } from "./useControlBar";

export interface ControlBarProps extends ContextProps, AMap.ControlBar.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function ControlBar (props: ControlBarProps & { ref?: Ref<ControlBarProps & { instance: AMap.ControlBar | undefined }> }) {
  const { controlBar } = useControlBar(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: controlBar }), [props, controlBar]);

  return null;
}
