import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { LabelMarkerProps } from '.';
import { useEventProperties, useSetProperties } from '../utils';

interface useLabelMarker extends LabelMarkerProps {}

export const useLabelMarker = (props: useLabelMarker) => {
  const { AMap, map } = useMapContext();
  const [labelMarker, setLabelMarker] = useState<AMap.LabelMarker>();

  useEffect(() => {
    if (AMap && map && !labelMarker) {
      const instance = new AMap.LabelMarker(props);
      map.add(instance);
      setLabelMarker(instance);
    }
    return () => {
      if (labelMarker) {
        labelMarker.clearEvents();
        labelMarker.setMap(null);
        setLabelMarker(undefined);
      }
    };
  }, [map, labelMarker]);

  useSetProperties<AMap.LabelMarker, useLabelMarker>(labelMarker!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.LabelMarker, useLabelMarker, AMap.LabelMarker.Events>(labelMarker!, props, [
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

  return {
    labelMarker,
    setLabelMarker,
  };
};
