import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useIndoorMap } from './useIndoorMap';

export * from './useIndoorMap';
export interface IndoorMapProps extends CommonProps, AMap.IndoorMap.Events, AMap.IndoorMap.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const IndoorMap = forwardRef<IndoorMapProps & { indoorMap: AMap.IndoorMap | undefined }, IndoorMapProps>(
  (props, ref) => {
    const { indoorMap } = useIndoorMap(props);
    useImperativeHandle(ref, () => ({ ...props, indoorMap }), [indoorMap]);

    return null;
  },
);
