import React, { cloneElement, forwardRef, isValidElement, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useEllipse } from './useEllipse';

export * from './useEllipse';
export interface EllipseProps extends CommonProps, AMap.Ellipse.Events, AMap.Ellipse.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface EllipseRef {
  /** 覆盖物实例 */
  ellipse: AMap.Ellipse | undefined;
  /** 覆盖物属性 */
  ellipseProps: Omit<EllipseProps, 'children'>;
}

export const Ellipse = forwardRef<EllipseRef, EllipseProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { ellipse } = useEllipse(restProps);
  const elementProps = { ellipse, ellipseProps: restProps };

  useImperativeHandle(ref, () => elementProps, [ellipse]);

  if (isValidElement<EllipseRef>(children) && ellipse) {
    return cloneElement(children, elementProps);
  } else return null;
});
