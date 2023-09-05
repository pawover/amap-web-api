import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { ImageLayerProps } from './';

interface useImageLayer extends ImageLayerProps {}

export const useImageLayer = (props: useImageLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [imageLayer, setImageLayer] = useState<AMap.ImageLayer>();

  useVisible(imageLayer, visible);
  useProperty<AMap.ImageLayer, useImageLayer>(imageLayer, props);
  useEventProperty<AMap.ImageLayer, useImageLayer, AMap.ImageLayer.Events>(imageLayer, props, ['onComplete']);

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

  return { imageLayer };
};
