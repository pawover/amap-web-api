import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useVisible } from '../utils';
import type { ControlBarProps } from './';

interface UseControlBar extends ControlBarProps {}

export const useControlBar = (props: UseControlBar) => {
  const { visible = true, position = 'LT', offset = [10, 10] } = props;
  const { map } = useMapContext();
  const [controlBar, setControlBar] = useState<AMap.ControlBar>();

  useEffect(() => {
    if (AMap && map && !controlBar) {
      controlBar && map.removeControl(controlBar);
      AMap.plugin(['AMap.ControlBar'], () => {
        const instance = new AMap.ControlBar({
          offset: offset,
          position,
        });
        map.addControl(instance);
        setControlBar(instance);
      });
    }
    return () => {
      if (controlBar) {
        map?.removeControl(controlBar);
        setControlBar(undefined);
      }
    };
  }, [map, controlBar, position, JSON.stringify(offset)]);

  useVisible(controlBar, visible);

  return { controlBar };
};
