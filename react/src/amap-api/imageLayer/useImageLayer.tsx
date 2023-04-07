import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { ImageLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useImageLayer extends ImageLayerProps {}

export const useImageLayer = (props: useImageLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [imageLayer, setImageLayer] = useState<AMap.ImageLayer>();

  useEffect(() => {
    if (AMap && map && !imageLayer) {
      const instance = new AMap.ImageLayer(rest);
      map.add(instance);
      setImageLayer(instance);
    }
    return () => {
      if (imageLayer) {
        imageLayer.clearEvents();
        imageLayer.setMap(null);
        setImageLayer(undefined);
      }
    };
  }, [map, imageLayer]);

  useVisible(imageLayer!, visible);
  useSetProperties<AMap.ImageLayer, useImageLayer>(imageLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.ImageLayer, useImageLayer, AMap.ImageLayer.Events>(imageLayer!, props, ['onComplete']);

  return {
    imageLayer,
    setImageLayer,
  };
};
