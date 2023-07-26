import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMapContext } from '../index';
import type { GeolocationProps } from './';

interface UseGeolocation extends GeolocationProps {}

export const useGeolocation = (props: UseGeolocation) => {
  const { type = 'position', onComplete, onError, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [geolocation, setGeolocation] = useState<AMap.Geolocation>();

  const callback: AMap.Geolocation.Callback = (status, result) => {
    if (status === 'complete' && onComplete) onComplete(result as AMap.Geolocation.Result);
    else if (onError) onError(result as AMap.Geolocation.Error);
  };

  useEffect(() => {
    if (AMap && map && !geolocation) {
      AMap.plugin(['AMap.Geolocation'], () => {
        const instance = new AMap.Geolocation(rest);
        setGeolocation(instance);
      });
    }
    return () => {
      if (geolocation) {
        setGeolocation(undefined);
      }
    };
  }, [map, geolocation]);

  useMemo(() => {
    if (!/^(position|cityInfo)$/.test(type)) return;
    const fnName = type === 'position' ? 'getCurrentPosition' : 'getCityInfo';
    if (geolocation) {
      geolocation[fnName](callback);
      map?.addControl(geolocation);
    }
  }, [geolocation]);

  return {
    geolocation,
    setGeolocation,
  };
};
