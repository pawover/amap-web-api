import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { CircleMarkerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface UseCircleMarker extends CircleMarkerProps {}

export const useCircleMarker = (props: UseCircleMarker) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [circleMarker, setCircleMarker] = useState<AMap.CircleMarker>();

  useEffect(() => {
    if (AMap && map && !circleMarker) {
      const instance = new AMap.CircleMarker(rest);
      map.add(instance);
      setCircleMarker(instance);
    }
    return () => {
      if (circleMarker) {
        circleMarker.clearEvents();
        circleMarker.setMap(null);
        setCircleMarker(undefined);
      }
    };
  }, [map, circleMarker]);

  useVisible(circleMarker!, visible);
  useSetProperties<AMap.CircleMarker, UseCircleMarker>(
    circleMarker!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.CircleMarker, UseCircleMarker, AMap.CircleMarker.Events>(circleMarker!, props, [
    'onHide',
    'onShow',
    'onClick',
    'onDblClick',
    'onRightClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onDragStart',
    'onDragEnd',
    'onDragging',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  return {
    circleMarker,
    setCircleMarker,
  };
};
