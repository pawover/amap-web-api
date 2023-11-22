import { forwardRef, useImperativeHandle } from "react";
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

export const Scale = forwardRef<ScaleProps & { instance: AMap.Scale | undefined }, ScaleProps>((props, ref) => {
  const { scale } = useScale(props);
  useImperativeHandle(ref, () => ({ ...props, instance: scale }), [props, scale]);

  return null;
});
