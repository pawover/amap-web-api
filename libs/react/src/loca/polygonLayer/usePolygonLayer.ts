import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PolygonLayerProps } from "./";

interface UsePolygonLayerProps<ExtraType = any> extends PolygonLayerProps<ExtraType> {}

export const usePolygonLayer = <ExtraType = any>(props: UsePolygonLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [polygonLayer, setPolygonLayer] = useState<Loca.PolygonLayer>();

  useEffect(() => {
    if (map && loca && !polygonLayer) {
      const instance = new Loca.PolygonLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
      }

      setPolygonLayer(instance);
    }
    return () => {
      if (polygonLayer) {
        loca?.remove(polygonLayer);
        setPolygonLayer(undefined);
      }
    };
  }, [map, loca, polygonLayer]);

  useEffect(() => {
    if (polygonLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      polygonLayer.setSource(data);
    }
  }, [polygonLayer, source]);

  useEffect(() => {
    if (polygonLayer && styles) {
      polygonLayer.setStyle(styles);
    }
  }, [polygonLayer, styles]);

  return { polygonLayer };
};
