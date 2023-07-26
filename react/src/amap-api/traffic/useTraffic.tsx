import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { TrafficProps } from './';

interface useTraffic extends TrafficProps {}

export const useTraffic = (props: useTraffic) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [traffic, setTraffic] = useState<AMap.Traffic>();

  useEffect(() => {
    if (AMap && map && !traffic) {
      const instance = new AMap.Traffic(rest);
      map.add(instance);
      setTraffic(instance);
    }
    return () => {
      if (traffic) {
        traffic.clearEvents();
        traffic.setMap(null);
        setTraffic(undefined);
      }
    };
  }, [map, traffic]);

  useVisible(traffic!, visible);
  useSetProperties<AMap.Traffic, useTraffic>(traffic!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Traffic, useTraffic, AMap.Traffic.Events>(traffic!, props, ['onComplete']);

  return {
    traffic,
    setTraffic,
  };
};
