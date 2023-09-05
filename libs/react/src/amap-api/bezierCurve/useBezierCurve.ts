import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { BezierCurveProps } from './';

interface UseBezierCurve extends BezierCurveProps {}

export const useBezierCurve = (props: UseBezierCurve) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [bezierCurve, setBezierCurve] = useState<AMap.BezierCurve>();

  useVisible(bezierCurve, visible);
  useProperty<AMap.BezierCurve, UseBezierCurve>(bezierCurve, rest);
  useEventProperty<AMap.BezierCurve, UseBezierCurve, AMap.BezierCurve.Events>(bezierCurve, rest, [
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
    if (AMap && map && !bezierCurve) {
      const instance = new AMap.BezierCurve(rest);
      map.add(instance);
      setBezierCurve(instance);
    }
    return () => {
      if (bezierCurve) {
        bezierCurve.clearEvents();
        bezierCurve.setMap(null);
        setBezierCurve(undefined);
      }
    };
  }, [map, bezierCurve]);

  return { bezierCurve };
};
