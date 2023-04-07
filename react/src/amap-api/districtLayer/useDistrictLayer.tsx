import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { DistrictLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useDistrictLayer extends DistrictLayerProps {}

export const useDistrictLayer = (props: useDistrictLayer) => {
  const { districtType, visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [districtLayer, setDistrictLayer] = useState<AMap.DistrictLayer>();

  useEffect(() => {
    if (AMap && map && !districtLayer) {
      AMap.plugin(['AMap.DistrictLayer'], () => {
        if (districtType) {
          let instance: AMap.DistrictLayer.World | AMap.DistrictLayer.Country | AMap.DistrictLayer.Province | undefined;
          if (districtType === 'world') instance = new AMap.DistrictLayer.World(rest);
          if (districtType === 'country') instance = new AMap.DistrictLayer.Country(rest);
          if (districtType === 'province') instance = new AMap.DistrictLayer.Province(rest);
          instance && map.add(instance);
          setDistrictLayer(instance);
        } else throw new Error('please specify the props "districtType"');
      });
    }
    return () => {
      if (districtLayer) {
        districtLayer.clearEvents();
        districtLayer.setMap(null);
        setDistrictLayer(undefined);
      }
    };
  }, [map, districtLayer]);
  useVisible(districtLayer!, visible);
  useSetProperties<AMap.DistrictLayer, useDistrictLayer>(
    districtLayer!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.DistrictLayer, useDistrictLayer, AMap.DistrictLayer.Events>(districtLayer!, props, [
    'onComplete',
  ]);

  return {
    districtLayer,
    setDistrictLayer,
  };
};
