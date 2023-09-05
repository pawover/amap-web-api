import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { FlexibleProps } from './';

interface useFlexible extends FlexibleProps {}

export const useFlexible = (props: useFlexible) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [flexible, setFlexible] = useState<AMap.Flexible>();

  useVisible(flexible, visible);
  useProperty<AMap.Flexible, useFlexible>(flexible, props);
  useEventProperty<AMap.Flexible, useFlexible, AMap.Flexible.Events>(flexible, props, ['onComplete']);

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

  return { flexible };
};
