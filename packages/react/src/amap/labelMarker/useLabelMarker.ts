import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { LabelMarkerProps } from "./";

interface UseLabelMarkerProps extends LabelMarkerProps {}

export function useLabelMarker (props: UseLabelMarkerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [labelMarker, setLabelMarker] = useState<AMap.LabelMarker>();

  useVisible(labelMarker, visible);
  useProperty<AMap.LabelMarker, UseLabelMarkerProps>(labelMarker, props);
  useEventProperty<AMap.LabelMarker, UseLabelMarkerProps, AMap.LabelMarker.Events>(labelMarker, props, [
    "onClick",
    "onDblClick",
    "onRightClick",
    "onMouseUp",
    "onMouseDown",
    "onMouseOver",
    "onMouseOut",
    "onMouseMove",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !labelMarker) {
      const instance = new AMap.LabelMarker({ ...rest, position: map.getCenter() });

      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setLabelMarker(instance);

      if (AMap.v?.indexOf("1.4") === 0) {
        let labelMarkersLayer;
        if (map.labelMarkersLayer) {
          labelMarkersLayer = map.labelMarkersLayer;
        } else {
          // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
          map.labelMarkersLayer = labelMarkersLayer = new AMap.LabelsLayer();
          map.add(labelMarkersLayer);
        }
        labelMarkersLayer.add(instance);
      }

      map.add(instance);
    }

    return () => {
      if (labelMarker) {
        labelMarker.clearEvents();
        labelMarker.setMap(null);
        setLabelMarker(undefined);
      }
    };
  }, [map, labelMarker]);

  return { labelMarker };
}
