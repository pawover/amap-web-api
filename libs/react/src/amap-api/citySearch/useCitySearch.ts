import { useEffect, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty } from '../utils';
import type { CitySearchProps } from './';

interface useCitySearch extends CitySearchProps {}

export const useCitySearch = (props: useCitySearch) => {
  const { ip, ...rest } = props;
  const { map } = useMapContext();
  const [citySearch, setCitySearch] = useState<AMap.CitySearch>();
  const isStrictModeRenderedRef = useRef(false);

  useProperty<AMap.CitySearch, useCitySearch>(citySearch, props);
  useEventProperty<AMap.CitySearch, useCitySearch, AMap.CitySearch.Events>(citySearch, props, [
    'onComplete',
    'onError',
  ]);

  useEffect(() => {
    if (AMap.CitySearch) {
      if (map && !citySearch && !isStrictModeRenderedRef.current) {
        const instance = new AMap.CitySearch(rest);
        setCitySearch(instance);
        isStrictModeRenderedRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRef.current) {
        isStrictModeRenderedRef.current = true;
        console.error('Failed to load CitySearch: AMap plugin "AMap.CitySearch" is Required');
      }
    }

    return () => {
      if (citySearch) {
        citySearch.clearEvents();
        setCitySearch(undefined);
        isStrictModeRenderedRef.current = false;
      }
    };
  }, [map, citySearch]);

  useEffect(() => {
    if (citySearch) {
      if (typeof ip === 'string') citySearch.getCityByIp(ip);
      else citySearch.getLocalCity();
    }
  }, [ip, citySearch]);

  return { citySearch };
};
