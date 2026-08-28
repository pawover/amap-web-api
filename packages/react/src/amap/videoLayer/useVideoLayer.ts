import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { VideoLayerProps } from "./";

interface UseVideoLayerProps extends VideoLayerProps {}

export function useVideoLayer (props: UseVideoLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [videoLayer, setVideoLayer] = useState<AMap.VideoLayer>();

  useVisible(videoLayer, visible);
  useProperty<AMap.VideoLayer, UseVideoLayerProps>(videoLayer, props);
  useEventProperty<AMap.VideoLayer, UseVideoLayerProps, AMap.VideoLayer.Events>(videoLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !videoLayer) {
      const instance = new AMap.VideoLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setVideoLayer(instance);
    }

    return () => {
      if (videoLayer) {
        videoLayer.clearEvents();
        videoLayer.setMap(null);
        setVideoLayer(undefined);
      }
    };
  }, [map, videoLayer]);

  return { videoLayer };
}
