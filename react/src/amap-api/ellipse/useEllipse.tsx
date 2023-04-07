import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { EllipseProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface UseEllipse extends EllipseProps {}

export const useEllipse = (props: UseEllipse) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [ellipse, setEllipse] = useState<AMap.Ellipse>();

  useEffect(() => {
    if (AMap && map && !ellipse) {
      const instance = new AMap.Ellipse(rest);
      map.add(instance);
      setEllipse(instance);
    }
    return () => {
      if (ellipse) {
        ellipse.clearEvents();
        ellipse.setMap(null);
        setEllipse(undefined);
      }
    };
  }, [map, ellipse]);

  useVisible(ellipse!, visible);
  useSetProperties<AMap.Ellipse, UseEllipse>(ellipse!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Ellipse, UseEllipse, AMap.Ellipse.Events>(ellipse!, props, [
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
    ellipse,
    setEllipse,
  };
};
