import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { DistrictLayerProps } from "./";

interface UseDistrictLayerProps extends DistrictLayerProps {}

export function useDistrictLayer (props: UseDistrictLayerProps) {
  const { districtType, visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [districtLayer, setDistrictLayer] = useState<AMap.DistrictLayer>();

  useVisible(districtLayer, visible);
  useProperty<AMap.DistrictLayer, UseDistrictLayerProps>(districtLayer, props);
  useEventProperty<AMap.DistrictLayer, UseDistrictLayerProps, AMap.DistrictLayer.Events>(districtLayer, props, [
    "onComplete",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !districtLayer) {
      AMap.plugin(["AMap.DistrictLayer"], () => {
        if (districtType) {
          let instance: AMap.DistrictLayer.World | AMap.DistrictLayer.Country | AMap.DistrictLayer.Province | undefined;
          if (districtType === "world") {
            instance = new AMap.DistrictLayer.World(rest);
          }
          if (districtType === "country") {
            instance = new AMap.DistrictLayer.Country(rest);
          }
          if (districtType === "province") {
            instance = new AMap.DistrictLayer.Province(rest);
          }
          // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
          instance && map.add(instance);
          setDistrictLayer(instance);
        } else {
          throw new Error("please specify the props \"districtType\"");
        }
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
}
