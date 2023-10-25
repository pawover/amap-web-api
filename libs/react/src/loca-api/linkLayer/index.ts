import { createElement, forwardRef, useImperativeHandle } from 'react';
import { useLinkLayer } from './useLinkLayer';

export * from './useLinkLayer';
export interface LinkLayerProps<ExtraType = any> extends Loca.LinkLayer.Options {
  source?: Loca.GeoJSONSource.Options;
  styles?: Loca.LinkLayer.StyleOptions<ExtraType>;
}

export const LinkLayer = <ExtraType = any>(props: LinkLayerProps<ExtraType>) => {
  const element = forwardRef<typeof props & { instance: Loca.LinkLayer<ExtraType> | undefined }, typeof props>(
    (props, ref) => {
      const { linkLayer } = useLinkLayer<ExtraType>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: linkLayer }), [props, linkLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
