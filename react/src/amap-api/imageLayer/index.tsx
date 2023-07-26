import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useImageLayer } from './useImageLayer';

export * from './useImageLayer';
export interface ImageLayerProps extends CommonProps, AMap.ImageLayer.Events, AMap.ImageLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const ImageLayer = forwardRef<ImageLayerProps & { imageLayer: AMap.ImageLayer | undefined }, ImageLayerProps>(
  (props, ref) => {
    const { imageLayer } = useImageLayer(props);
    useImperativeHandle(ref, () => ({ ...props, imageLayer }), [props, imageLayer]);

    return null;
  },
);
