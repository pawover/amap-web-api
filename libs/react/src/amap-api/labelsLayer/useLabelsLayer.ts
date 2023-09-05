import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { LabelsLayerProps } from './';

interface useLabelsLayer extends LabelsLayerProps {}

export const useLabelsLayer = (props: useLabelsLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [labelsLayer, setLabelsLayer] = useState<AMap.LabelsLayer>();

  useVisible(labelsLayer, visible);
  useProperty<AMap.LabelsLayer, useLabelsLayer>(labelsLayer, props);
  useEventProperty<AMap.LabelsLayer, useLabelsLayer, AMap.LabelsLayer.Events>(labelsLayer, props, ['onComplete']);

  useEffect(() => {
    if (AMap && map && !labelsLayer) {
      const instance = new AMap.LabelsLayer(rest);
      map.add(instance);
      setLabelsLayer(instance);
    }
    return () => {
      if (labelsLayer) {
        labelsLayer.clearEvents();
        labelsLayer.setMap(null);
        setLabelsLayer(undefined);
      }
    };
  }, [map, labelsLayer]);

  return { labelsLayer };
};
