import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useSetProperties, useVisible } from '../utils';
import type { VectorLayerProps } from './';

interface useVectorLayer extends VectorLayerProps {}

export const useVectorLayer = (props: useVectorLayer) => {
  const { visible = true, layers = [], ...rest } = props;
  const { AMap, map } = useMapContext();
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

  useVisible(vectorLayer!, visible);
  useSetProperties<AMap.VectorLayer, useVectorLayer>(vectorLayer!, props, Object.keys(props) as (keyof typeof props)[]);

  return {
    vectorLayer,
    setVectorLayer,
  };
};
