import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PrismLayerProps } from "./";

interface UsePrismLayerProps<G extends GeoJSON = GeoJSON, E = any> extends PrismLayerProps<G, E> {}

export const usePrismLayer = <G extends GeoJSON = GeoJSON, E = any>(props: UsePrismLayerProps<G, E>) => {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [prismLayer, setPrismLayer] = useState<Loca.PrismLayer<G, E>>();

  useEffect(() => {
    if (map && loca && !prismLayer) {
      const instance = new Loca.PrismLayer<G, E>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      setPrismLayer(instance);
    }
    return () => {
      if (prismLayer) {
        loca?.remove(prismLayer);
        setPrismLayer(undefined);
      }
    };
  }, [loca, prismLayer]);

  useEffect(() => {
    if (prismLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      prismLayer.setSource(dataSource);
    }
  }, [prismLayer, source]);

  useEffect(() => {
    if (prismLayer && styles) {
      prismLayer.setStyle(styles);
    }
  }, [prismLayer, styles]);

  useEffect(() => {
    if (prismLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        prismLayer.addAnimate(...params);
      } else {
        prismLayer.clearAnimate();
      }
    }
  }, [prismLayer, animate]);

  return { prismLayer };
};
