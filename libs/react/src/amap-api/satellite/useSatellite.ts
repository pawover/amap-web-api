import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { SatelliteProps } from './';

interface useSatellite extends SatelliteProps {}

export const useSatellite = (props: useSatellite) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [satellite, setSatellite] = useState<AMap.Satellite>();

  useVisible(satellite, visible);
  useProperty<AMap.Satellite, useSatellite>(satellite, props);
  useEventProperty<AMap.Satellite, useSatellite, AMap.Satellite.Events>(satellite, props, ['onComplete']);

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

  return { satellite };
};
