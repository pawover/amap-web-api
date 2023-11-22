import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { VideoLayerProps } from "./";

interface useVideoLayer extends VideoLayerProps {}

export const useVideoLayer = (props: useVideoLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [videoLayer, setVideoLayer] = useState<AMap.VideoLayer>();

  useVisible(videoLayer, visible);
  useProperty<AMap.VideoLayer, useVideoLayer>(videoLayer, props);
  useEventProperty<AMap.VideoLayer, useVideoLayer, AMap.VideoLayer.Events>(videoLayer, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !videoLayer) {
      const instance = new AMap.VideoLayer(rest);
      map.add(instance);
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
};
