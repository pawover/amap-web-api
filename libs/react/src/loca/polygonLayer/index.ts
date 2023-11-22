import { createElement, forwardRef, useImperativeHandle } from "react";
import { usePolygonLayer } from "./usePolygonLayer";

export interface PolygonLayerProps<ExtraType = any> extends Loca.PolygonLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.PolygonLayer.StyleOptions<ExtraType>;
}

export const PolygonLayer = <ExtraType = any>(props: PolygonLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.PolygonLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { polygonLayer } = usePolygonLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: polygonLayer }), [props, polygonLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
