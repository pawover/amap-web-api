import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useMarker } from './useMarker';

export * from './useMarker';
export interface MarkerProps extends ContextProps, AMap.Marker.Events, Omit<AMap.Marker.Options, 'content'> {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`icon` 属性将失效
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  content?: React.ReactNode;
  /**
   * 显示内容
   * - 指定 `children` 属性时，`icon` 属性将失效
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  children?: React.ReactNode;
}

export const Marker = forwardRef<MarkerProps & { instance: AMap.Marker | undefined }, MarkerProps>((props, ref) => {
  const { marker, wrapper } = useMarker(props);
  useImperativeHandle(ref, () => ({ ...props, instance: marker }), [props, marker]);

  return wrapper;
});
