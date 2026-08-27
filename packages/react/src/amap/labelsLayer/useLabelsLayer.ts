import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { LabelsLayerProps } from "./";

interface UseLabelsLayerProps extends LabelsLayerProps {}

export function useLabelsLayer (props: UseLabelsLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [labelsLayer, setLabelsLayer] = useState<AMap.LabelsLayer>();

  useVisible(labelsLayer, visible);
  useProperty<AMap.LabelsLayer, UseLabelsLayerProps>(labelsLayer, props);
  useEventProperty<AMap.LabelsLayer, UseLabelsLayerProps, AMap.LabelsLayer.Events>(labelsLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !labelsLayer) {
      const instance = new AMap.LabelsLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setLabelsLayer(instance);
    }

    return () => {
      if (labelsLayer) {
        labelsLayer.clearEvents();
        labelsLayer.setMap(null);
        setLabelsLayer(undefined);
      }
    };
  }, [map, labelsLayer]);

  return { labelsLayer };
}
