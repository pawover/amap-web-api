import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { FlexibleProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useFlexible extends FlexibleProps {}

export const useFlexible = (props: useFlexible) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [flexible, setFlexible] = useState<AMap.Flexible>();

  useEffect(() => {
    if (AMap && map && !flexible) {
      const instance = new AMap.Flexible(rest);
      map.add(instance);
      setFlexible(instance);
    }
    return () => {
      if (flexible) {
        flexible.clearEvents();
        flexible.setMap(null);
        setFlexible(undefined);
      }
    };
  }, [map, flexible]);

  useVisible(flexible!, visible);
  useSetProperties<AMap.Flexible, useFlexible>(flexible!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Flexible, useFlexible, AMap.Flexible.Events>(flexible!, props, ['onComplete']);

  return {
    flexible,
    setFlexible,
  };
};
