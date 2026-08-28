import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LinkLayerProps } from "./";

interface UseLinkLayerProps<G extends GeoJSON = GeoJSON, E = any> extends LinkLayerProps<G, E> {}

export function useLinkLayer<G extends GeoJSON = GeoJSON, E = any> (props: UseLinkLayerProps<G, E>) {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [linkLayer, setLinkLayer] = useState<Loca.LinkLayer<G, E>>();

  useEffect(() => {
    if (map && loca && !linkLayer) {
      const instance = new Loca.LinkLayer<G, E>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
    if (linkLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      linkLayer.setSource(dataSource);
    }
  }, [linkLayer, source]);

  useEffect(() => {
    if (linkLayer && styles) {
      linkLayer.setStyle(styles);
    }
  }, [linkLayer, styles]);

  useEffect(() => {
    if (linkLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        linkLayer.addAnimate(...params);
      } else {
        linkLayer.clearAnimate();
      }
    }
  }, [linkLayer, animate]);

  return { linkLayer };
}
