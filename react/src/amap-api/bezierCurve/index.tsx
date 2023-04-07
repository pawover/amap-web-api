import { cloneElement, forwardRef, isValidElement, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useBezierCurve } from './useBezierCurve';

export * from './useBezierCurve';
export interface BezierCurveProps extends CommonProps, AMap.BezierCurve.Events, AMap.BezierCurve.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface BezierCurveRef {
  /** 覆盖物实例 */
  bezierCurve: AMap.BezierCurve | undefined;
  /** 覆盖物属性 */
  bezierCurveProps: Omit<BezierCurveProps, 'children'>;
}

export const BezierCurve = forwardRef<BezierCurveRef, BezierCurveProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { bezierCurve } = useBezierCurve(restProps);
  const elementProps = { bezierCurve, bezierCurveProps: restProps };

  useImperativeHandle(ref, () => elementProps, [bezierCurve]);

  if (isValidElement<BezierCurveRef>(children) && bezierCurve) {
    return cloneElement(children, elementProps);
  } else return null;
});
