import type { AnyFunction } from "@pawover/kit-types";
import { useEffect, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useEllipse } from "./useEllipse";

export interface EllipseProps extends ContextProps, AMap.Ellipse.Events, AMap.Ellipse.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: AnyFunction;
}

export function Ellipse (props: EllipseProps & { ref?: Ref<EllipseProps & { instance: AMap.Ellipse | undefined }> }) {
  const { ellipse } = useEllipse(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(ellipse);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [ellipse]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: ellipse }), [props, ellipse]);

  return null;
}
