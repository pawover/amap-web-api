import React, { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { usePolygon } from './usePolygon';

export * from './usePolygon';
export interface PolygonProps extends CommonProps, AMap.Polygon.Events, AMap.Polygon.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface PolygonRef {
  /** 覆盖物实例 */
  polygon: AMap.Polygon | undefined;
  /** 覆盖物属性 */
  polygonProps: Omit<PolygonProps, 'children'>;
}

export const Polygon = memo(
  forwardRef<PolygonRef, PolygonProps>((props, ref) => {
    const { children, ...restProps } = props;
    const { polygon } = usePolygon(restProps);
    const elementProps = { polygon, polygonProps: restProps };

    useImperativeHandle(ref, () => elementProps, [polygon]);

    if (isValidElement<PolygonRef>(children) && polygon) {
      return cloneElement(children, elementProps);
    } else return null;
  }),
);
