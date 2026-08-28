import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { PolylineProps } from "./";

interface UsePolyline extends PolylineProps {}

export function usePolyline (props: UsePolyline) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [polyline, setPolyline] = useState<AMap.Polyline>();

  useVisible(polyline, visible);
  useProperty<AMap.Polyline, UsePolyline>(polyline, props);
  useEventProperty<AMap.Polyline, UsePolyline, AMap.Polyline.Events>(polyline, props, [
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
    if (AMap && map && !polyline) {
      const instance = new AMap.Polyline(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setPolyline(instance);
    }

    return () => {
      if (polyline) {
        polyline.clearEvents();
        polyline.setMap(null);
        setPolyline(undefined);
      }
    };
  }, [map, polyline]);

  return { polyline };
}
