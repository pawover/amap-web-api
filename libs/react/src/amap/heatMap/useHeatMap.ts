import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useProperty, useVisible } from "../utils";
import type { HeatMapProps } from "./";

interface useHeatMap extends HeatMapProps {}

export const useHeatMap = (props: useHeatMap) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [heatMap, setHeatMap] = useState<AMap.HeatMap>();

  useEffect(() => {
    if (AMap && map && !heatMap) {
      const instance = new AMap.HeatMap(map, rest);
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
  useProperty<AMap.HeatMap, useHeatMap>(heatMap, props);

  return { heatMap };
};
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export const useHeatmap = (props: useHeatMap) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [heatmap, setHeatmap] = useState<AMap.Heatmap>();

  useEffect(() => {
    if (AMap && map && !heatmap) {
      const instance = new AMap.Heatmap(map, rest);
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
  useProperty<AMap.Heatmap, useHeatMap>(heatmap, props);

  return { heatmap };
};
