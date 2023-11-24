import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PolygonLayerProps } from "./";

interface UsePolygonLayerProps<G extends GeoJSON = GeoJSON, E = any> extends PolygonLayerProps<G, E> {}

export const usePolygonLayer = <G extends GeoJSON = GeoJSON, E = any>(props: UsePolygonLayerProps<G, E>) => {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [polygonLayer, setPolygonLayer] = useState<Loca.PolygonLayer<G, E>>();

  useEffect(() => {
    if (map && loca && !polygonLayer) {
      const instance = new Loca.PolygonLayer<G, E>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      setPolygonLayer(instance);
    }
    return () => {
      if (polygonLayer) {
        loca?.remove(polygonLayer);
        setPolygonLayer(undefined);
      }
    };
  }, [loca, polygonLayer]);

  useEffect(() => {
    if (polygonLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      polygonLayer.setSource(dataSource);
    }
  }, [polygonLayer, source]);

  useEffect(() => {
    if (polygonLayer && styles) {
      polygonLayer.setStyle(styles);
    }
  }, [polygonLayer, styles]);

  useEffect(() => {
    if (polygonLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        polygonLayer.addAnimate(...params);
      } else {
        polygonLayer.clearAnimate();
      }
    }
  }, [polygonLayer, animate]);

  return { polygonLayer };
};
