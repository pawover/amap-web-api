import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LabelsLayerProps } from "./";

interface UseLabelsLayerProps<ExtraType = any> extends LabelsLayerProps<ExtraType> {}

export const useLabelsLayer = <ExtraType = any>(props: UseLabelsLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [labelsLayer, setLabelsLayer] = useState<Loca.LabelsLayer>();

  useEffect(() => {
    if (map && loca && !labelsLayer) {
      const instance = new Loca.LabelsLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
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
    if (labelsLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      labelsLayer.setSource(data);
    }
  }, [labelsLayer, source]);

  useEffect(() => {
    if (labelsLayer && styles) {
      labelsLayer.setStyle(styles);
    }
  }, [labelsLayer, styles]);

  return { labelsLayer };
};
