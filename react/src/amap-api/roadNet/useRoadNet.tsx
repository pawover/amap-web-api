import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { RoadNetProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useRoadNet extends RoadNetProps {}

export const useRoadNet = (props: useRoadNet) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [roadNet, setRoadNet] = useState<AMap.RoadNet>();

  useEffect(() => {
    if (AMap && map && !roadNet) {
      const instance = new AMap.RoadNet(rest);
      map.add(instance);
      setRoadNet(instance);
    }
    return () => {
      if (roadNet) {
        roadNet.clearEvents();
        roadNet.setMap(null);
        setRoadNet(undefined);
      }
    };
  }, [map, roadNet]);

  useVisible(roadNet!, visible);
  useSetProperties<AMap.RoadNet, useRoadNet>(roadNet!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.RoadNet, useRoadNet, AMap.RoadNet.Events>(roadNet!, props, ['onComplete']);

  return {
    roadNet,
    setRoadNet,
  };
};
