import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { LayerGroupProps } from "./";

interface useLayerGroup extends LayerGroupProps {}

export const useLayerGroup = (props: useLayerGroup) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [layerGroup, setLayerGroup] = useState<AMap.LayerGroup>();
  useVisible(layerGroup, visible);
  useProperty<AMap.LayerGroup, useLayerGroup>(layerGroup, props);
  useEventProperty<AMap.LayerGroup, useLayerGroup, AMap.LayerGroup.Events>(layerGroup, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !layerGroup) {
      const instance = new AMap.LayerGroup(rest.layers);
      instance.setMap(map);
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
};
