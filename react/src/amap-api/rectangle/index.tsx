import { cloneElement, forwardRef, isValidElement, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useRectangle } from './useRectangle';

export * from './useRectangle';
export interface RectangleProps extends CommonProps, AMap.Rectangle.Events, AMap.Rectangle.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}
export interface RectangleRef {
  /** 覆盖物实例 */
  rectangle: AMap.Rectangle | undefined;
  /** 覆盖物属性 */
  rectangleProps: Omit<RectangleProps, 'children'>;
}

export const Rectangle = forwardRef<RectangleRef, RectangleProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { rectangle } = useRectangle(restProps);
  const elementProps = { rectangle, rectangleProps: restProps };

  useImperativeHandle(ref, () => elementProps, [rectangle]);

  if (isValidElement<RectangleRef>(children) && rectangle) {
    return cloneElement(children, elementProps);
  } else return null;
});
