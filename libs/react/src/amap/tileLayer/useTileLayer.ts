import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { TileLayerProps } from "./";

interface useTileLayer extends TileLayerProps {}

export const useTileLayer = (props: useTileLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [tileLayer, setTileLayer] = useState<AMap.TileLayer>();

  useVisible(tileLayer, visible);
  useProperty<AMap.TileLayer, useTileLayer>(tileLayer, props);
  useEventProperty<AMap.TileLayer, useTileLayer, AMap.TileLayer.Events>(tileLayer, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !tileLayer) {
      const instance = new AMap.TileLayer(rest);
      map.add(instance);
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
};
