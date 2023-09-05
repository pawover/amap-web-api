import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useLabelMarker } from './useLabelMarker';

export * from './useLabelMarker';
export interface LabelMarkerProps extends ContextProps, AMap.LabelMarker.Events, AMap.LabelMarker.Options {}

export const LabelMarker = forwardRef<LabelMarkerProps & { instance: AMap.LabelMarker | undefined }, LabelMarkerProps>(
  (props, ref) => {
    const { labelMarker } = useLabelMarker(props);
    useImperativeHandle(ref, () => ({ ...props, instance: labelMarker }), [props, labelMarker]);

    return null;
  },
);
