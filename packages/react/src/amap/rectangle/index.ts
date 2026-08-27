import { useEffect, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useRectangle } from "./useRectangle";

export interface RectangleProps extends ContextProps, AMap.Rectangle.Events, AMap.Rectangle.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export function Rectangle (props: RectangleProps & { ref?: Ref<RectangleProps & { instance: AMap.Rectangle | undefined }> }) {
  const { rectangle } = useRectangle(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(rectangle);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [rectangle]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: rectangle }), [props, rectangle]);

  return null;
}
