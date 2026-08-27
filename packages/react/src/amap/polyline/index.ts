import { useEffect, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { usePolyline } from "./usePolyline";

export interface PolylineProps extends ContextProps, AMap.Polyline.Events, AMap.Polyline.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export function Polyline (props: PolylineProps & { ref?: Ref<PolylineProps & { instance: AMap.Polyline | undefined }> }) {
  const { polyline } = usePolyline(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(polyline);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [polyline]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: polyline }), [props, polyline]);

  return null;
}
