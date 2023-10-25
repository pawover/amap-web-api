import { createElement, forwardRef, useImperativeHandle } from 'react';
import { useLabelsLayer } from './useLabelsLayer';

export * from './useLabelsLayer';
export interface LabelsLayerProps<ExtraType = any> extends Loca.LabelsLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.LabelsLayer.StyleOptions<ExtraType>;
}

export const LabelsLayer = <ExtraType = any>(props: LabelsLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.LabelsLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { labelsLayer } = useLabelsLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: labelsLayer }), [props, labelsLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
