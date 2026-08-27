import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { BezierCurveProps } from "./";

interface UseBezierCurve extends BezierCurveProps {}

export function useBezierCurve (props: UseBezierCurve) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [bezierCurve, setBezierCurve] = useState<AMap.BezierCurve>();

  useVisible(bezierCurve, visible);
  useProperty<AMap.BezierCurve, UseBezierCurve>(bezierCurve, rest);
  useEventProperty<AMap.BezierCurve, UseBezierCurve, AMap.BezierCurve.Events>(bezierCurve, rest, [
    "onHide",
    "onShow",
    "onClick",
    "onDblClick",
    "onRightClick",
    "onMouseUp",
    "onMouseDown",
    "onMouseOver",
    "onMouseOut",
    "onMouseMove",
    "onDragStart",
    "onDragEnd",
    "onDragging",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !bezierCurve) {
      const instance = new AMap.BezierCurve(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
}
