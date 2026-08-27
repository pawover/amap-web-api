import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { ImageLayerProps } from "./";

interface UseImageLayerProps extends ImageLayerProps {}

export function useImageLayer (props: UseImageLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [imageLayer, setImageLayer] = useState<AMap.ImageLayer>();

  useVisible(imageLayer, visible);
  useProperty<AMap.ImageLayer, UseImageLayerProps>(imageLayer, props);
  useEventProperty<AMap.ImageLayer, UseImageLayerProps, AMap.ImageLayer.Events>(imageLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !imageLayer) {
      const instance = new AMap.ImageLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setImageLayer(instance);
    }

    return () => {
      if (imageLayer) {
        imageLayer.clearEvents();
        imageLayer.setMap(null);
        setImageLayer(undefined);
      }
    };
  }, [map, imageLayer]);

  return { imageLayer };
}
