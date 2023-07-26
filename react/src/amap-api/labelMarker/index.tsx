import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useLabelMarker } from './useLabelMarker';

export * from './useLabelMarker';
export interface LabelMarkerProps extends CommonProps, AMap.LabelMarker.Events, AMap.LabelMarker.Options {}

export const LabelMarker = forwardRef<
  LabelMarkerProps & { labelMarker: AMap.LabelMarker | undefined },
  LabelMarkerProps
>((props, ref) => {
  const { labelMarker } = useLabelMarker(props);
  useImperativeHandle(ref, () => ({ ...props, labelMarker }), [props, labelMarker]);

  return null;
});
