import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { LabelsLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useLabelsLayer extends LabelsLayerProps {}

export const useLabelsLayer = (props: useLabelsLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [labelsLayer, setLabelsLayer] = useState<AMap.LabelsLayer>();

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

  useVisible(labelsLayer!, visible);
  useSetProperties<AMap.LabelsLayer, useLabelsLayer>(labelsLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.LabelsLayer, useLabelsLayer, AMap.LabelsLayer.Events>(labelsLayer!, props, ['onComplete']);

  return {
    labelsLayer,
    setLabelsLayer,
  };
};
