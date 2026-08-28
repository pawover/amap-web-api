import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useProperty, useVisible } from "../utils";
import type { HeatMapProps } from "./";

interface UseHeatMapProps extends HeatMapProps {}

export function useHeatMap (props: UseHeatMapProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [heatMap, setHeatMap] = useState<AMap.HeatMap>();

  useEffect(() => {
    if (AMap && map && !heatMap) {
      const instance = new AMap.HeatMap(map, rest);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setHeatMap(instance);
    }

    return () => {
      if (heatMap) {
        heatMap.setMap(null);
        setHeatMap(undefined);
      }
    };
  }, [map, heatMap]);

  useVisible(heatMap, visible);
  useProperty<AMap.HeatMap, UseHeatMapProps>(heatMap, props);

  return { heatMap };
}
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export function useHeatmap (props: UseHeatMapProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [heatmap, setHeatmap] = useState<AMap.Heatmap>();

  useEffect(() => {
    if (AMap && map && !heatmap) {
      const instance = new AMap.Heatmap(map, rest);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setHeatmap(instance);
    }

    return () => {
      if (heatmap) {
        heatmap.setMap(null);
        setHeatmap(undefined);
      }
    };
  }, [map, heatmap]);

  useVisible(heatmap, visible);
  useProperty<AMap.Heatmap, UseHeatMapProps>(heatmap, props);

  return { heatmap };
}
