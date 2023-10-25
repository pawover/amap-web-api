import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { PrismLayerProps } from './';

interface UsePrismLayerProps<ExtraType = any> extends PrismLayerProps<ExtraType> {}

export const usePrismLayer = <ExtraType = any>(props: UsePrismLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [prismLayer, setPrismLayer] = useState<Loca.PrismLayer>();

  useEffect(() => {
    if (map && loca && !prismLayer) {
      const instance = new Loca.PrismLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
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
    if (prismLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      prismLayer.setSource(data);
    }
  }, [prismLayer, source]);

  useEffect(() => {
    if (prismLayer && styles) {
      prismLayer.setStyle(styles);
    }
  }, [prismLayer, styles]);

  return { prismLayer };
};
