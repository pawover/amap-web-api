import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PointLayerProps } from "./";

interface UsePointLayerProps<ExtraType = any> extends PointLayerProps<ExtraType> {}

export const usePointLayer = <ExtraType = any>(props: UsePointLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [pointLayer, setPointLayer] = useState<Loca.PointLayer>();

  useEffect(() => {
    if (map && loca && !pointLayer) {
      const instance = new Loca.PointLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
      }

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
    if (pointLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      pointLayer.setSource(data);
    }
  }, [pointLayer, source]);

  useEffect(() => {
    if (pointLayer && styles) {
      pointLayer.setStyle(styles);
    }
  }, [pointLayer, styles]);

  return { pointLayer };
};
