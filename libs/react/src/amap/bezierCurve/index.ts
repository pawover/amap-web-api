import { forwardRef, useEffect, useImperativeHandle } from "react";
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

export const BezierCurve = forwardRef<BezierCurveProps & { instance: AMap.BezierCurve | undefined }, BezierCurveProps>(
  (props, ref) => {
    const { bezierCurve } = useBezierCurve(props);

    useEffect(() => {
      props?.setChildComponentInstanceForEditor?.(bezierCurve);

      return () => {
        props?.setChildComponentInstanceForEditor?.(undefined);
      };
    }, [bezierCurve]);

    useImperativeHandle(ref, () => ({ ...props, instance: bezierCurve }), [props, bezierCurve]);

    return null;
  },
);
