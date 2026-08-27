import { useEffect, useImperativeHandle, type Ref } from "react";
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

export function Circle (props: CircleProps & { ref?: Ref<CircleProps & { instance: AMap.Circle | undefined }> }) {
  const { circle } = useCircle(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(circle);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [circle]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: circle }), [props, circle]);

  return null;
}
