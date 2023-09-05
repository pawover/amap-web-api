import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { CircleProps } from './';

interface UseCircle extends CircleProps {}

export const useCircle = (props: UseCircle) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [circle, setCircle] = useState<AMap.Circle>();

  useVisible(circle, visible);
  useProperty<AMap.Circle, UseCircle>(circle, props);
  useEventProperty<AMap.Circle, UseCircle, AMap.Circle.Events>(circle, props, [
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

  return { circle };
};
