import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useProperty, useVisible } from "../utils";
import type { VectorLayerProps } from "./";

interface UseVectorLayerProps extends VectorLayerProps {}

export function useVectorLayer (props: UseVectorLayerProps) {
  const { visible = true, layers = [], ...rest } = props;
  const { map } = useMapContext();
  const [vectorLayer, setVectorLayer] = useState<AMap.VectorLayer>();

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !vectorLayer) {
      const instance = new AMap.VectorLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setVectorLayer(instance);
    }

    return () => {
      if (vectorLayer) {
        vectorLayer.clear();
        vectorLayer.destroy();
        setVectorLayer(undefined);
      }
    };
  }, [map, vectorLayer]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (!vectorLayer) {
      return;
    }
    if (layers.length) {
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      vectorLayer.add(layers);
    } else {
      vectorLayer.clear();
    }
  }, [layers, vectorLayer]);

  useVisible(vectorLayer, visible);
  useProperty<AMap.VectorLayer, UseVectorLayerProps>(vectorLayer, props);

  return { vectorLayer };
}
