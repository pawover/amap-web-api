import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LineLayerProps } from "./";

interface UseLineLayerProps<G extends GeoJSON = GeoJSON, E = any> extends LineLayerProps<G, E> {}

export const useLineLayer = <G extends GeoJSON = GeoJSON, E = any>(props: UseLineLayerProps<G, E>) => {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [lineLayer, setLineLayer] = useState<Loca.LineLayer<G, E>>();

  useEffect(() => {
    if (map && loca && !lineLayer) {
      const instance = new Loca.LineLayer<G, E>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
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
    if (lineLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      lineLayer.setSource(dataSource);
    }
  }, [lineLayer, source]);

  useEffect(() => {
    if (lineLayer && styles) {
      lineLayer.setStyle(styles);
    }
  }, [lineLayer, styles]);

  useEffect(() => {
    if (lineLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        lineLayer.addAnimate(...params);
      } else {
        lineLayer.clearAnimate();
      }
    }
  }, [lineLayer, animate]);

  return { lineLayer };
};
