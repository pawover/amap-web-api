import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useVisible } from '../utils';
import type { ScaleProps } from './';

interface UseScale extends ScaleProps {}

export const useScale = (props: UseScale) => {
  const { visible = true, position = 'LT', offset = [10, 10] } = props;
  const { map } = useMapContext();
  const [scale, setScale] = useState<AMap.Scale>();

  useEffect(() => {
    if (AMap && map && !scale) {
      scale && map.removeControl(scale);
      AMap.plugin(['AMap.Scale'], () => {
        const instance = new AMap.Scale({
          offset: offset,
          position,
        });
        map.addControl(instance);
        setScale(instance);
      });
    }
    return () => {
      if (scale) {
        map?.removeControl(scale);
        setScale(undefined);
      }
    };
  }, [map, scale, position, JSON.stringify(offset)]);

  useVisible(scale, visible);

  return { scale };
};
