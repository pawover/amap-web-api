import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { CircleProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface UseCircle extends CircleProps {}

export const useCircle = (props: UseCircle) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [circle, setCircle] = useState<AMap.Circle>();

  useEffect(() => {
    if (AMap && map && !circle) {
      const instance = new AMap.Circle(rest);
      map.add(instance);
      setCircle(instance);
    }
    return () => {
      if (circle) {
        circle.clearEvents();
        circle.setMap(null);
        setCircle(undefined);
      }
    };
  }, [map, circle]);

  useVisible(circle!, visible);
  useSetProperties<AMap.Circle, UseCircle>(circle!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Circle, UseCircle, AMap.Circle.Events>(circle!, props, [
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
    circle,
    setCircle,
  };
};
