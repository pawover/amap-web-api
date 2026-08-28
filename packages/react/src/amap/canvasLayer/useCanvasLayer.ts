import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { CanvasLayerProps } from "./";

interface UseCanvasLayerProps extends CanvasLayerProps {}

export function useCanvasLayer (props: UseCanvasLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [canvasLayer, setCanvasLayer] = useState<AMap.CanvasLayer>();

  useVisible(canvasLayer, visible);
  useProperty<AMap.CanvasLayer, UseCanvasLayerProps>(canvasLayer, props);
  useEventProperty<AMap.CanvasLayer, UseCanvasLayerProps, AMap.CanvasLayer.Events>(canvasLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !canvasLayer) {
      const instance = new AMap.CanvasLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setCanvasLayer(instance);
    }

    return () => {
      if (canvasLayer) {
        canvasLayer.clearEvents();
        canvasLayer.setMap(null);
        setCanvasLayer(undefined);
      }
    };
  }, [map, canvasLayer]);

  return { canvasLayer };
}
