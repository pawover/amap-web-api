import { useEffect, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useBezierCurve } from "./useBezierCurve";

export interface BezierCurveProps extends ContextProps, AMap.BezierCurve.Events, AMap.BezierCurve.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export function BezierCurve (props: BezierCurveProps & { ref?: Ref<BezierCurveProps & { instance: AMap.BezierCurve | undefined }> }) {
  const { bezierCurve } = useBezierCurve(props);

  useEffect(() => {
    props?.setChildComponentInstanceForEditor?.(bezierCurve);

    return () => {
      props?.setChildComponentInstanceForEditor?.(undefined);
    };
  }, [bezierCurve]);

  useImperativeHandle(props.ref, () => ({ ...props, instance: bezierCurve }), [props, bezierCurve]);

  return null;
}
