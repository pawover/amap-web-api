import { createElement, forwardRef, useImperativeHandle } from "react";
import { useIconLayer } from "./useIconLayer";

export interface IconLayerProps<ExtraType = any> extends Loca.IconLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.IconLayer.StyleOptions<ExtraType>;
}

export const IconLayer = <ExtraType = any>(props: IconLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.IconLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { iconLayer } = useIconLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: iconLayer }), [props, iconLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
