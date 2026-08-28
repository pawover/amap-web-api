import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { RectangleProps } from "./";

interface UseRectangle extends RectangleProps {}

export function useRectangle (props: UseRectangle) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [rectangle, setRectangle] = useState<AMap.Rectangle>();
  useVisible(rectangle, visible);
  useProperty<AMap.Rectangle, UseRectangle>(rectangle, props);
  useEventProperty<AMap.Rectangle, UseRectangle, AMap.Rectangle.Events>(rectangle, props, [
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
    if (AMap && map && !rectangle) {
      const instance = new AMap.Rectangle(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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

  return { rectangle };
}
