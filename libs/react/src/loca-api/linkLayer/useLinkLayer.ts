import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { LinkLayerProps } from './';

interface UseLinkLayerProps<ExtraType = any> extends LinkLayerProps<ExtraType> {}

export const useLinkLayer = <ExtraType = any>(props: UseLinkLayerProps<ExtraType>) => {
  const { source = {}, styles, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [linkLayer, setLinkLayer] = useState<Loca.LinkLayer>();

  useEffect(() => {
    if (map && loca && !linkLayer) {
      const instance = new Loca.LinkLayer({ ...rest, loca });

      if (source.data || source.url) {
        const data = new Loca.GeoJSONSource(source);
        instance.setSource(data);
      }

      if (styles) {
        instance.setStyle(styles);
      }

      setLinkLayer(instance);
    }
    return () => {
      if (linkLayer) {
        loca?.remove(linkLayer);
        setLinkLayer(undefined);
      }
    };
  }, [loca, linkLayer]);

  useEffect(() => {
    if (linkLayer && (source.data || source.url)) {
      const data = new Loca.GeoJSONSource(source);
      linkLayer.setSource(data);
    }
  }, [linkLayer, source]);

  useEffect(() => {
    if (linkLayer && styles) {
      linkLayer.setStyle(styles);
    }
  }, [linkLayer, styles]);

  return { linkLayer };
};
