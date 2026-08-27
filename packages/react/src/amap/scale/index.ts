import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useScale } from "./useScale";

export interface ScaleProps extends ContextProps, AMap.Scale.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function Scale (props: ScaleProps & { ref?: Ref<ScaleProps & { instance: AMap.Scale | undefined }> }) {
  const { scale } = useScale(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: scale }), [props, scale]);

  return null;
}
