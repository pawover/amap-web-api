import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { LabelMarkerProps } from './';

interface useLabelMarker extends LabelMarkerProps {}

export const useLabelMarker = (props: useLabelMarker) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [labelMarker, setLabelMarker] = useState<AMap.LabelMarker>();

  useVisible(labelMarker, visible);
  useProperty<AMap.LabelMarker, useLabelMarker>(labelMarker, props);
  useEventProperty<AMap.LabelMarker, useLabelMarker, AMap.LabelMarker.Events>(labelMarker, props, [
    'onClick',
    'onDblClick',
    'onRightClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  useEffect(() => {
    if (AMap && map && !labelMarker) {
      const instance = new AMap.LabelMarker({ ...rest, position: map.getCenter() });

      setLabelMarker(instance);

      if (AMap.v?.indexOf('1.4') === 0) {
        let labelMarkersLayer;
        if (map.labelMarkersLayer) {
          labelMarkersLayer = map.labelMarkersLayer;
        } else {
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
};
