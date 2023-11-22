import { forwardRef, useEffect, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useEllipse } from "./useEllipse";

export interface EllipseProps extends ContextProps, AMap.Ellipse.Events, AMap.Ellipse.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export const Ellipse = forwardRef<EllipseProps & { instance: AMap.Ellipse | undefined }, EllipseProps>((props, ref) => {
  const { ellipse } = useEllipse(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(ellipse);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [ellipse]);

  useImperativeHandle(ref, () => ({ ...props, instance: ellipse }), [props, ellipse]);

  return null;
});
