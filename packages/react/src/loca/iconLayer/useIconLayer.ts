import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { IconLayerProps } from "./";

interface UseIconLayerProps<G extends GeoJSON = GeoJSON> extends IconLayerProps<G> {}

export function useIconLayer<G extends GeoJSON = GeoJSON> (props: UseIconLayerProps<G>) {
  const { source, styles, animate, ...rest } = props;
  const { map, loca } = useLocaContext();
  const [iconLayer, setIconLayer] = useState<Loca.IconLayer<G>>();

  useEffect(() => {
    if (map && loca && !iconLayer) {
      const instance = new Loca.IconLayer<G>({ loca, ...rest });

      if (source?.data || source?.url) {
        const dataSource = new Loca.GeoJSONSource(source);
        instance.setSource(dataSource, styles);
      }

      if (animate) {
        const [enabled, ...params] = animate;
        enabled && instance.addAnimate(...params);
      }

      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
    if (iconLayer && (source?.data || source?.url)) {
      const dataSource = new Loca.GeoJSONSource(source);
      iconLayer.setSource(dataSource);
    }
  }, [iconLayer, source]);

  useEffect(() => {
    if (iconLayer && styles) {
      iconLayer.setStyle(styles);
    }
  }, [iconLayer, styles]);

  useEffect(() => {
    if (iconLayer && animate) {
      const [enabled, ...params] = animate;

      if (enabled) {
        iconLayer.addAnimate(...params);
      } else {
        iconLayer.clearAnimate();
      }
    }
  }, [iconLayer, animate]);

  return { iconLayer };
}
