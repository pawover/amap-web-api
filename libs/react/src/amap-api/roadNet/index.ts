import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useRoadNet } from './useRoadNet';

export * from './useRoadNet';
export interface RoadNetProps extends ContextProps, AMap.RoadNet.Events, AMap.RoadNet.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const RoadNet = forwardRef<RoadNetProps & { instance: AMap.RoadNet | undefined }, RoadNetProps>((props, ref) => {
  const { roadNet } = useRoadNet(props);
  useImperativeHandle(ref, () => ({ ...props, instance: roadNet }), [props, roadNet]);

  return null;
});
