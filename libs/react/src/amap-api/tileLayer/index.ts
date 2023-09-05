import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useTileLayer } from './useTileLayer';

export * from './useTileLayer';
export interface TileLayerProps extends ContextProps, AMap.TileLayer.Events, AMap.TileLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const TileLayer = forwardRef<TileLayerProps & { instance: AMap.TileLayer | undefined }, TileLayerProps>(
  (props, ref) => {
    const { tileLayer } = useTileLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: tileLayer }), [props, tileLayer]);

    return null;
  },
);
