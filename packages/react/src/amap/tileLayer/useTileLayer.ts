import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { TileLayerProps } from "./";

interface UseTileLayerProps extends TileLayerProps {}

export function useTileLayer (props: UseTileLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [tileLayer, setTileLayer] = useState<AMap.TileLayer>();

  useVisible(tileLayer, visible);
  useProperty<AMap.TileLayer, UseTileLayerProps>(tileLayer, props);
  useEventProperty<AMap.TileLayer, UseTileLayerProps, AMap.TileLayer.Events>(tileLayer, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !tileLayer) {
      const instance = new AMap.TileLayer(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setTileLayer(instance);
    }

    return () => {
      if (tileLayer) {
        tileLayer.clearEvents();
        tileLayer.setMap(null);
        setTileLayer(undefined);
      }
    };
  }, [map, tileLayer]);

  return { tileLayer };
}
