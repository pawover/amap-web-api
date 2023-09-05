import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useGLCustomLayer } from './useGLCustomLayer';

export * from './useGLCustomLayer';
export interface GLCustomLayerProps extends ContextProps, AMap.GLCustomLayer.Events, AMap.GLCustomLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const GLCustomLayer = forwardRef<
  GLCustomLayerProps & { instance: AMap.GLCustomLayer | undefined },
  GLCustomLayerProps
>((props, ref) => {
  const { glCustomLayer } = useGLCustomLayer(props);
  useImperativeHandle(ref, () => ({ ...props, instance: glCustomLayer }), [props, glCustomLayer]);

  return null;
});
