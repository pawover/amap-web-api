import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { CustomLayerProps } from "./";

interface UseCustomLayerProps extends CustomLayerProps {}

export function useCustomLayer (props: UseCustomLayerProps) {
  const { visible = true, canvas, className = "", ...rest } = props;
  const { map } = useMapContext();
  const [customLayer, setCustomLayer] = useState<AMap.CustomLayer>();

  useVisible(customLayer, visible);
  useProperty<AMap.CustomLayer, UseCustomLayerProps>(customLayer, props);
  useEventProperty<AMap.CustomLayer, UseCustomLayerProps, AMap.CustomLayer.Events>(customLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !customLayer) {
      let canvasDom: HTMLCanvasElement;
      if (canvas) {
        if (typeof canvas === "string") {
          canvasDom = document.getElementById(canvas) as HTMLCanvasElement;
        } else {
          canvasDom = canvas;
        }
      } else {
        canvasDom = document.createElement("canvas");
      }
      canvasDom.setAttribute("class", className);
      const instance = new AMap.CustomLayer(canvasDom, rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setCustomLayer(instance);
    }

    return () => {
      if (customLayer) {
        customLayer.clearEvents();
        customLayer.setMap(null);
        setCustomLayer(undefined);
      }
    };
  }, [map, customLayer]);

  return { customLayer };
}
