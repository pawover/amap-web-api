import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { RoadNetProps } from './';

interface useRoadNet extends RoadNetProps {}

export const useRoadNet = (props: useRoadNet) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [roadNet, setRoadNet] = useState<AMap.RoadNet>();

  useVisible(roadNet, visible);
  useProperty<AMap.RoadNet, useRoadNet>(roadNet, props);
  useEventProperty<AMap.RoadNet, useRoadNet, AMap.RoadNet.Events>(roadNet, props, ['onComplete']);

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

  return { roadNet };
};
