import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useVisible } from '../utils';
import type { MapTypeProps } from './';

interface UseMapType extends MapTypeProps {}

export const useMapType = (props: UseMapType) => {
  const { visible = true, defaultType = 0, position = 'RT', offset = [10, 10], ...rest } = props;
  const { AMap, map } = useMapContext();
  const [mapType, setMapType] = useState<AMap.MapType>();

  useEffect(() => {
    if (AMap && map && !mapType) {
      mapType && map.removeControl(mapType);
      AMap.plugin(['AMap.MapType'], () => {
        let pos: { top?: string; left?: string; right?: string; bottom?: string } = { right: '10px', top: '10px' };
        if (typeof position === 'object') {
          (Object.keys(position) as (keyof typeof pos)[]).forEach((p) => {
            pos[p] = `${position[p]}px`;
          });
        } else {
          position === 'RT' && (pos = { right: `${offset[0]}px`, top: `${offset[1]}px` });
          position === 'LT' && (pos = { left: `${offset[0]}px`, top: `${offset[1]}px` });
          position === 'RB' && (pos = { right: `${offset[0]}px`, bottom: `${offset[1]}px` });
          position === 'LB' && (pos = { left: `${offset[0]}px`, bottom: `${offset[1]}px` });
        }
        const instance = new AMap.MapType({ defaultType, position: pos, ...rest });
        map.addControl(instance);
        setMapType(instance);
      });
    }
    return () => {
      if (mapType) {
        map?.removeControl(mapType);
        setMapType(undefined);
      }
    };
  }, [map, mapType, position, JSON.stringify([offset, rest.showRoad, rest.showTraffic])]);

  useVisible(mapType!, visible);

  return {
    mapType,
    setMapType,
  };
};
