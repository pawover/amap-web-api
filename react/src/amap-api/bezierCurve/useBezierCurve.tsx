import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { BezierCurveProps } from './';

interface UseBezierCurve extends BezierCurveProps {}

export const useBezierCurve = (props: UseBezierCurve) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [bezierCurve, setBezierCurve] = useState<AMap.BezierCurve>();

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

  useVisible(bezierCurve!, visible);
  useSetProperties<AMap.BezierCurve, UseBezierCurve>(bezierCurve!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.BezierCurve, UseBezierCurve, AMap.BezierCurve.Events>(bezierCurve!, props, [
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
    bezierCurve,
    setBezierCurve,
  };
};
