import React, { cloneElement, forwardRef, isValidElement, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { usePolyline } from './usePolyline';

export * from './usePolyline';
export interface PolylineProps extends CommonProps, AMap.Polyline.Events, AMap.Polyline.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface PolylineRef {
  /** 覆盖物实例 */
  polyline: AMap.Polyline | undefined;
  /** 覆盖物属性 */
  polylineProps: Omit<PolylineProps, 'children'>;
}

export const Polyline = forwardRef<PolylineRef, PolylineProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { polyline } = usePolyline(restProps);
  const elementProps = { polyline, polylineProps: restProps };

  useImperativeHandle(ref, () => elementProps, [polyline]);

  if (children && isValidElement(children) && polyline) {
    return cloneElement(children, elementProps);
  } else return null;
});
