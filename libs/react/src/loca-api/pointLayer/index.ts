import { createElement, forwardRef, useImperativeHandle } from 'react';
import { usePointLayer } from './usePointLayer';

export * from './usePointLayer';
export interface PointLayerProps<ExtraType = any> extends Loca.PointLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.PointLayer.StyleOptions<ExtraType>;
}

export const PointLayer = <ExtraType = any>(props: PointLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.PointLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { pointLayer } = usePointLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: pointLayer }), [props, pointLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
