import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useCustomLayer } from './useCustomLayer';

export * from './useCustomLayer';
export interface CustomLayerProps extends CommonProps, AMap.CustomLayer.Events, AMap.CustomLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层的 DOM 容器 id 或 DOM 容器 */
  canvas?: string | HTMLCanvasElement;
  /** 图层 DOM 容器的类名 */
  className?: string;
}

export const CustomLayer = forwardRef<
  CustomLayerProps & { customLayer: AMap.CustomLayer | undefined },
  CustomLayerProps
>((props, ref) => {
  const { customLayer } = useCustomLayer(props);
  useImperativeHandle(ref, () => ({ ...props, customLayer }), [customLayer]);

  return null;
});
