import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { DistrictLayerProps } from "./";

interface useDistrictLayer extends DistrictLayerProps {}

export const useDistrictLayer = (props: useDistrictLayer) => {
  const { districtType, visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [districtLayer, setDistrictLayer] = useState<AMap.DistrictLayer>();

  useVisible(districtLayer, visible);
  useProperty<AMap.DistrictLayer, useDistrictLayer>(districtLayer, props);
  useEventProperty<AMap.DistrictLayer, useDistrictLayer, AMap.DistrictLayer.Events>(districtLayer, props, [
    "onComplete",
  ]);

  useEffect(() => {
    if (AMap && map && !districtLayer) {
      AMap.plugin(["AMap.DistrictLayer"], () => {
        if (districtType) {
          let instance: AMap.DistrictLayer.World | AMap.DistrictLayer.Country | AMap.DistrictLayer.Province | undefined;
          if (districtType === "world") instance = new AMap.DistrictLayer.World(rest);
          if (districtType === "country") instance = new AMap.DistrictLayer.Country(rest);
          if (districtType === "province") instance = new AMap.DistrictLayer.Province(rest);
          instance && map.add(instance);
          setDistrictLayer(instance);
        } else throw new Error('please specify the props "districtType"');
      });
    }
    return () => {
      if (districtLayer) {
        districtLayer.clearEvents();
        districtLayer.setMap(null);
        setDistrictLayer(undefined);
      }
    };
  }, [map, districtLayer]);

  return { districtLayer };
};
