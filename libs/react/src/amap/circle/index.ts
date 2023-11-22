import { forwardRef, useEffect, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useCircle } from "./useCircle";

export interface CircleProps extends ContextProps, AMap.Circle.Events, AMap.Circle.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export const Circle = forwardRef<CircleProps & { instance: AMap.Circle | undefined }, CircleProps>((props, ref) => {
  const { circle } = useCircle(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(circle);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [circle]);

  useImperativeHandle(ref, () => ({ ...props, instance: circle }), [props, circle]);

  return null;
});
