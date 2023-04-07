import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { RectangleProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface UseRectangle extends RectangleProps {}

export const useRectangle = (props: UseRectangle) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [rectangle, setRectangle] = useState<AMap.Rectangle>();

  useEffect(() => {
    if (AMap && map && !rectangle) {
      const instance = new AMap.Rectangle(rest);
      map.add(instance);
      setRectangle(instance);
    }
    return () => {
      if (rectangle) {
        rectangle.clearEvents();
        rectangle.setMap(null);
        setRectangle(undefined);
      }
    };
  }, [map, rectangle]);

  useVisible(rectangle!, visible);
  useSetProperties<AMap.Rectangle, UseRectangle>(rectangle!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Rectangle, UseRectangle, AMap.Rectangle.Events>(rectangle!, props, [
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
    rectangle,
    setRectangle,
  };
};
