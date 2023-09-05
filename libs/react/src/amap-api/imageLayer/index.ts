import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useImageLayer } from './useImageLayer';

export * from './useImageLayer';
export interface ImageLayerProps extends ContextProps, AMap.ImageLayer.Events, AMap.ImageLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ImageLayer = forwardRef<ImageLayerProps & { instance: AMap.ImageLayer | undefined }, ImageLayerProps>(
  (props, ref) => {
    const { imageLayer } = useImageLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: imageLayer }), [props, imageLayer]);

    return null;
  },
);
