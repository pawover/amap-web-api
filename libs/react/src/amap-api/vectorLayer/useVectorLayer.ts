import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useProperty, useVisible } from '../utils';
import type { VectorLayerProps } from './';

interface useVectorLayer extends VectorLayerProps {}

export const useVectorLayer = (props: useVectorLayer) => {
  const { visible = true, layers = [], ...rest } = props;
  const { map } = useMapContext();
  const [vectorLayer, setVectorLayer] = useState<AMap.VectorLayer>();

  useEffect(() => {
    if (AMap && map && !vectorLayer) {
      const instance = new AMap.VectorLayer(rest);
      map.add(instance);
      setVectorLayer(instance);
    }
    return () => {
      if (vectorLayer) {
        vectorLayer.clear();
        vectorLayer.destroy();
        setVectorLayer(undefined);
      }
    };
  }, [map, vectorLayer]);

  useEffect(() => {
    if (!vectorLayer) return;
    if (layers.length) vectorLayer.add(layers);
    else vectorLayer.clear();
  }, [layers, vectorLayer]);

  useVisible(vectorLayer, visible);
  useProperty<AMap.VectorLayer, useVectorLayer>(vectorLayer, props);

  return { vectorLayer };
};
