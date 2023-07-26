import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useGLCustomLayer } from './useGLCustomLayer';

export * from './useGLCustomLayer';
export interface GLCustomLayerProps extends CommonProps, AMap.GLCustomLayer.Events, AMap.GLCustomLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const GLCustomLayer = forwardRef<
  GLCustomLayerProps & { glCustomLayer: AMap.GLCustomLayer | undefined },
  GLCustomLayerProps
>((props, ref) => {
  const { glCustomLayer } = useGLCustomLayer(props);
  useImperativeHandle(ref, () => ({ ...props, glCustomLayer }), [props, glCustomLayer]);

  return null;
});
