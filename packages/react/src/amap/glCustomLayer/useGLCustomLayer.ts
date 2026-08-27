import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { GLCustomLayerProps } from "./";

interface UseGLCustomLayerProps extends GLCustomLayerProps {}

export function useGLCustomLayer (props: UseGLCustomLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [glCustomLayer, setGLCustomLayer] = useState<AMap.GLCustomLayer>();

  useVisible(glCustomLayer, visible);
  useProperty<AMap.GLCustomLayer, UseGLCustomLayerProps>(glCustomLayer, props);
  useEventProperty<AMap.GLCustomLayer, UseGLCustomLayerProps, AMap.GLCustomLayer.Events>(glCustomLayer, props, [
    "onComplete",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !glCustomLayer) {
      const instance = new AMap.GLCustomLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setGLCustomLayer(instance);
    }

    return () => {
      if (glCustomLayer) {
        glCustomLayer.clearEvents();
        glCustomLayer.setMap(null);
        setGLCustomLayer(undefined);
      }
    };
  }, [map, glCustomLayer]);

  return { glCustomLayer };
}
