import { createElement, forwardRef, useImperativeHandle } from "react";
import { usePrismLayer } from "./usePrismLayer";

export interface PrismLayerProps<ExtraType = any> extends Loca.PrismLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.PrismLayer.StyleOptions<ExtraType>;
}

export const PrismLayer = <ExtraType = any>(props: PrismLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.PrismLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { prismLayer } = usePrismLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: prismLayer }), [props, prismLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
