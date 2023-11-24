import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LabelsLayerProps } from "./";

interface UseLabelsLayerProps<G extends GeoJSON = GeoJSON> extends LabelsLayerProps<G> {}

export const useLabelsLayer = <G extends GeoJSON = GeoJSON>(props: UseLabelsLayerProps<G>) => {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [labelsLayer, setLabelsLayer] = useState<Loca.LabelsLayer<G>>();

  useEffect(() => {
    if (map && loca && !labelsLayer) {
      const instance = new Loca.LabelsLayer<G>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      setLabelsLayer(instance);
    }
    return () => {
      if (labelsLayer) {
        loca?.remove(labelsLayer);
        setLabelsLayer(undefined);
      }
    };
  }, [loca, labelsLayer]);

  useEffect(() => {
    if (labelsLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      labelsLayer.setSource(dataSource);
    }
  }, [labelsLayer, source]);

  useEffect(() => {
    if (labelsLayer && styles) {
      labelsLayer.setStyle(styles);
    }
  }, [labelsLayer, styles]);

  useEffect(() => {
    if (labelsLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        labelsLayer.addAnimate(...params);
      } else {
        labelsLayer.clearAnimate();
      }
    }
  }, [labelsLayer, animate]);

  return { labelsLayer };
};
