import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { IconLayerProps } from './';

interface UseIconLayerProps<ExtraType = any> extends IconLayerProps<ExtraType> {}

export const useIconLayer = <ExtraType = any>(props: UseIconLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [iconLayer, setIconLayer] = useState<Loca.IconLayer>();

  useEffect(() => {
    if (map && loca && !iconLayer) {
      const instance = new Loca.IconLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
      }

      setIconLayer(instance);
    }
    return () => {
      if (iconLayer) {
        loca?.remove(iconLayer);
        setIconLayer(undefined);
      }
    };
  }, [loca, iconLayer]);

  useEffect(() => {
    if (iconLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      iconLayer.setSource(data);
    }
  }, [iconLayer, source]);

  useEffect(() => {
    if (iconLayer && styles) {
      iconLayer.setStyle(styles);
    }
  }, [iconLayer, styles]);

  return { iconLayer };
};
