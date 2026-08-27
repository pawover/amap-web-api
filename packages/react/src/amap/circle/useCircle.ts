import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { CircleProps } from "./";

interface UseCircle extends CircleProps {}

export function useCircle (props: UseCircle) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [circle, setCircle] = useState<AMap.Circle>();

  useVisible(circle, visible);
  useProperty<AMap.Circle, UseCircle>(circle, props);
  useEventProperty<AMap.Circle, UseCircle, AMap.Circle.Events>(circle, props, [
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
    if (AMap && map && !circle) {
      const instance = new AMap.Circle(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
}
