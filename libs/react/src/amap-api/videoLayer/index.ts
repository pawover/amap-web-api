import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useVideoLayer } from './useVideoLayer';

export * from './useVideoLayer';
export interface VideoLayerProps extends ContextProps, AMap.VideoLayer.Events, AMap.VideoLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const VideoLayer = forwardRef<VideoLayerProps & { instance: AMap.VideoLayer | undefined }, VideoLayerProps>(
  (props, ref) => {
    const { videoLayer } = useVideoLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: videoLayer }), [props, videoLayer]);

    return null;
  },
);
