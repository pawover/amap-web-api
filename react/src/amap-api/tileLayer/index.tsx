import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useTileLayer } from './useTileLayer';

export * from './useTileLayer';
export interface TileLayerProps extends CommonProps, AMap.TileLayer.Events, AMap.TileLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const TileLayer = forwardRef<TileLayerProps & { tileLayer: AMap.TileLayer | undefined }, TileLayerProps>(
  (props, ref) => {
    const { tileLayer } = useTileLayer(props);
    useImperativeHandle(ref, () => ({ ...props, tileLayer }), [props, tileLayer]);

    return null;
  },
);
