import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { VideoLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useVideoLayer extends VideoLayerProps {}

export const useVideoLayer = (props: useVideoLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [videoLayer, setVideoLayer] = useState<AMap.VideoLayer>();

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

  useVisible(videoLayer!, visible);
  useSetProperties<AMap.VideoLayer, useVideoLayer>(videoLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.VideoLayer, useVideoLayer, AMap.VideoLayer.Events>(videoLayer!, props, ['onComplete']);

  return {
    videoLayer,
    setVideoLayer,
  };
};
