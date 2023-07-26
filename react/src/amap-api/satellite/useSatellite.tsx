import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { SatelliteProps } from './';

interface useSatellite extends SatelliteProps {}

export const useSatellite = (props: useSatellite) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [satellite, setSatellite] = useState<AMap.Satellite>();

  useEffect(() => {
    if (AMap && map && !satellite) {
      const instance = new AMap.Satellite(rest);
      map.add(instance);
      setSatellite(instance);
    }
    return () => {
      if (satellite) {
        satellite.clearEvents();
        satellite.setMap(null);
        setSatellite(undefined);
      }
    };
  }, [map, satellite]);

  useVisible(satellite!, visible);
  useSetProperties<AMap.Satellite, useSatellite>(satellite!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Satellite, useSatellite, AMap.Satellite.Events>(satellite!, props, ['onComplete']);

  return {
    satellite,
    setSatellite,
  };
};
