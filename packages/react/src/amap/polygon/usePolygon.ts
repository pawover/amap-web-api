import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { PolygonProps } from "./";

interface UsePolygon extends PolygonProps {}

export function usePolygon (props: UsePolygon) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [polygon, setPolygon] = useState<AMap.Polygon>();

  useVisible(polygon, visible);
  useProperty<AMap.Polygon, UsePolygon>(polygon, props);
  useEventProperty<AMap.Polygon, UsePolygon, AMap.Polygon.Events>(polygon, props, [
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
    if (AMap && map && !polygon) {
      const instance = new AMap.Polygon(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setPolygon(instance);
    }

    return () => {
      if (polygon) {
        polygon.remove();
        setPolygon(undefined);
      }
    };
  }, [map, polygon]);

  return { polygon };
}
