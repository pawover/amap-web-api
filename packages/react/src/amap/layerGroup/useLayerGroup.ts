import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { LayerGroupProps } from "./";

interface UseLayerGroupProps extends LayerGroupProps {}

export function useLayerGroup (props: UseLayerGroupProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [layerGroup, setLayerGroup] = useState<AMap.LayerGroup>();
  useVisible(layerGroup, visible);
  useProperty<AMap.LayerGroup, UseLayerGroupProps>(layerGroup, props);
  useEventProperty<AMap.LayerGroup, UseLayerGroupProps, AMap.LayerGroup.Events>(layerGroup, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !layerGroup) {
      const instance = new AMap.LayerGroup(rest.layers);
      instance.setMap(map);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setLayerGroup(instance);
    }

    return () => {
      if (layerGroup) {
        layerGroup.clearEvents();
        layerGroup.clearLayers();
        setLayerGroup(undefined);
      }
    };
  }, [map, layerGroup]);

  return { layerGroup };
}
