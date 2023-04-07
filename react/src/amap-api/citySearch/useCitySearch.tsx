import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { CitySearchProps } from '.';
import { useEventProperties, useSetProperties } from '../utils';

interface useCitySearch extends CitySearchProps {}

export const useCitySearch = (props: useCitySearch) => {
  const { ip, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [citySearch, setCitySearch] = useState<AMap.CitySearch>();

  useEffect(() => {
    if (AMap && map && !citySearch) {
      AMap.plugin(['AMap.CitySearch'], () => {
        const instance = new AMap.CitySearch(rest);
        setCitySearch(instance);
      });
    }
    return () => {
      if (citySearch) {
        citySearch.clearEvents();
        setCitySearch(undefined);
      }
    };
  }, [map, citySearch]);
  useEffect(() => {
    if (!citySearch) return;
    if (typeof ip === 'string') citySearch.getCityByIp(ip);
    else citySearch.getLocalCity();
  }, [ip, citySearch]);

  useSetProperties<AMap.CitySearch, useCitySearch>(citySearch!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.CitySearch, useCitySearch, AMap.CitySearch.Events>(citySearch!, props, [
    'onComplete',
    'onError',
  ]);

  return {
    citySearch,
    setCitySearch,
  };
};
