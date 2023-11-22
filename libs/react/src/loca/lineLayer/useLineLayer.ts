import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LineLayerProps } from "./";

interface UseLineLayerProps<ExtraType = any> extends LineLayerProps<ExtraType> {}

export const useLineLayer = <ExtraType = any>(props: UseLineLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [lineLayer, setLineLayer] = useState<Loca.LineLayer>();

  useEffect(() => {
    if (map && loca && !lineLayer) {
      const instance = new Loca.LineLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
      }

      setLineLayer(instance);
    }
    return () => {
      if (lineLayer) {
        loca?.remove(lineLayer);
        setLineLayer(undefined);
      }
    };
  }, [loca, lineLayer]);

  useEffect(() => {
    if (lineLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      lineLayer.setSource(data);
    }
  }, [lineLayer, source]);

  useEffect(() => {
    if (lineLayer && styles) {
      lineLayer.setStyle(styles);
    }
  }, [lineLayer, styles]);

  return { lineLayer };
};
