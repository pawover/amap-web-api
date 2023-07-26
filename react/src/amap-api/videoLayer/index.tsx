import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useVideoLayer } from './useVideoLayer';

export * from './useVideoLayer';
export interface VideoLayerProps extends CommonProps, AMap.VideoLayer.Events, AMap.VideoLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const VideoLayer = forwardRef<VideoLayerProps & { videoLayer: AMap.VideoLayer | undefined }, VideoLayerProps>(
  (props, ref) => {
    const { videoLayer } = useVideoLayer(props);
    useImperativeHandle(ref, () => ({ ...props, videoLayer }), [props, videoLayer]);

    return null;
  },
);
