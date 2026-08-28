import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useVideoLayer } from "./useVideoLayer";

export interface VideoLayerProps extends ContextProps, AMap.VideoLayer.Events, AMap.VideoLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function VideoLayer (props: VideoLayerProps & { ref?: Ref<VideoLayerProps & { instance: AMap.VideoLayer | undefined }> }) {
  const { videoLayer } = useVideoLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: videoLayer }), [props, videoLayer]);

  return null;
}
