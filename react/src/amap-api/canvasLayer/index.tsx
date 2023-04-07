import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useCanvasLayer } from './useCanvasLayer';

export * from './useCanvasLayer';
export interface CanvasLayerProps extends CommonProps, AMap.CanvasLayer.Events, AMap.CanvasLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const CanvasLayer = forwardRef<
  CanvasLayerProps & { canvasLayer: AMap.CanvasLayer | undefined },
  CanvasLayerProps
>((props, ref) => {
  const { canvasLayer } = useCanvasLayer(props);
  useImperativeHandle(ref, () => ({ ...props, canvasLayer }), [canvasLayer]);

  return null;
});
