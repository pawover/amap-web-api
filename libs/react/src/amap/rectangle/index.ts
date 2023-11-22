import { forwardRef, useEffect, useImperativeHandle } from "react";
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

export const Rectangle = forwardRef<RectangleProps & { instance: AMap.Rectangle | undefined }, RectangleProps>(
  (props, ref) => {
    const { rectangle } = useRectangle(props);

    useEffect(() => {
      props?.setChildComponentInstanceForEditor?.(rectangle);

      return () => {
        props?.setChildComponentInstanceForEditor?.(undefined);
      };
    }, [rectangle]);

    useImperativeHandle(ref, () => ({ ...props, instance: rectangle }), [props, rectangle]);

    return null;
  },
);
