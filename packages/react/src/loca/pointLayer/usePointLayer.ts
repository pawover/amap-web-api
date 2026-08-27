import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PointLayerProps } from "./";

interface UsePointLayerProps<G extends GeoJSON = GeoJSON, E = any> extends PointLayerProps<G, E> {}

export function usePointLayer<G extends GeoJSON = GeoJSON, E = any> (props: UsePointLayerProps<G, E>) {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [pointLayer, setPointLayer] = useState<Loca.PointLayer<G, E>>();

  useEffect(() => {
    if (map && loca && !pointLayer) {
      const instance = new Loca.PointLayer<G, E>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setPointLayer(instance);
    }

    return () => {
      if (pointLayer) {
        loca?.remove(pointLayer);
        setPointLayer(undefined);
      }
    };
  }, [loca, pointLayer]);

  useEffect(() => {
    if (pointLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      pointLayer.setSource(dataSource);
    }
  }, [pointLayer, source]);

  useEffect(() => {
    if (pointLayer && styles) {
      pointLayer.setStyle(styles);
    }
  }, [pointLayer, styles]);

  useEffect(() => {
    if (pointLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        pointLayer.addAnimate(...params);
      } else {
        pointLayer.clearAnimate();
      }
    }
  }, [pointLayer, animate]);

  return { pointLayer };
}
