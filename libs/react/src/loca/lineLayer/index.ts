import { createElement, forwardRef, useImperativeHandle } from "react";
import { useLineLayer } from "./useLineLayer";

export interface LineLayerProps<ExtraType = any> extends Loca.LineLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.LineLayer.StyleOptions<ExtraType>;
}

export const LineLayer = <ExtraType = any>(props: LineLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.LineLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { lineLayer } = useLineLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: lineLayer }), [props, lineLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
