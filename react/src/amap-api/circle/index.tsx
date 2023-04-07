import { forwardRef, isValidElement, useImperativeHandle, cloneElement } from 'react';
import type { CommonProps } from '../map';
import { useCircle } from './useCircle';

export * from './useCircle';
export interface CircleProps extends CommonProps, AMap.Circle.Events, AMap.Circle.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface CircleRef {
  /** 覆盖物实例 */
  circle: AMap.Circle | undefined;
  /** 覆盖物属性 */
  circleProps: Omit<CircleProps, 'children'>;
}

export const Circle = forwardRef<CircleRef, CircleProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { circle } = useCircle(restProps);
  const elementProps = { circle, circleProps: restProps };

  useImperativeHandle(ref, () => elementProps, [circle]);

  if (isValidElement<CircleRef>(children) && circle) {
    return cloneElement(children, elementProps);
  } else return null;
});
