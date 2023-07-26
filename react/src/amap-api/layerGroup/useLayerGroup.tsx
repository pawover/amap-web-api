import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { LayerGroupProps } from './';

interface useLayerGroup extends LayerGroupProps {}

export const useLayerGroup = (props: useLayerGroup) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [layerGroup, setLayerGroup] = useState<AMap.LayerGroup>();

  useEffect(() => {
    if (AMap && map && !layerGroup) {
      const instance = new AMap.LayerGroup(rest.layers);
      instance.setMap(map);
      setLayerGroup(instance);
    }
    return () => {
      if (layerGroup) {
        layerGroup.clearEvents();
        layerGroup.clearLayers();
        setLayerGroup(undefined);
      }
    };
  }, [map, layerGroup]);

  useVisible(layerGroup!, visible);
  useSetProperties<AMap.LayerGroup, useLayerGroup>(layerGroup!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.LayerGroup, useLayerGroup, AMap.LayerGroup.Events>(layerGroup!, props, ['onComplete']);

  return {
    layerGroup,
    setLayerGroup,
  };
};
