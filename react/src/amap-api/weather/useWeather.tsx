import React, { useEffect, useMemo, useState } from 'react';
import { useMapContext } from '../index';
import type { WeatherProps } from '.';

interface UseWeather extends WeatherProps {}

export const useWeather = (props: UseWeather = {}) => {
  const { city = '', type = 'live', onComplete, onError } = props;
  const { AMap, map } = useMapContext();
  const [weather, setWeather] = useState<AMap.Weather>();

  useEffect(() => {
    if (AMap && map && !weather) {
      AMap.plugin(['AMap.Weather'], () => {
        const instance = new AMap.Weather();
        setWeather(instance);
      });
    }
    return () => {
      if (weather) {
        weather.clearEvents();
        setWeather(undefined);
      }
    };
  }, [map, weather]);

  useMemo(() => {
    if (weather && city && type) {
      if (type === 'live') {
        weather.getLive(city, (states, result) => {
          if (states === 'complete' && onComplete) onComplete(result as AMap.Weather.LiveResult);
          else if (onError) onError(result as string);
        });
      }
      if (type === 'forecast') {
        weather.getForecast(city, (states, result) => {
          if (states === 'complete' && onComplete) onComplete(result as AMap.Weather.ForecastResult);
          else if (onError) onError(result as string);
        });
      }
    }
  }, [weather, city, type]);

  return {
    weather,
    setWeather,
  };
};
