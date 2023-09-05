import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useMassMarks } from './useMassMarks';

export * from './useMassMarks';
export interface MassMarksProps extends ContextProps, AMap.MassMarks.Events, AMap.MassMarks.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  data?: AMap.MassMarks.DataOptions[];
}

export const MassMarks = forwardRef<MassMarksProps & { instance: AMap.MassMarks | undefined }, MassMarksProps>(
  (props, ref) => {
    const { massMarks } = useMassMarks(props);
    useImperativeHandle(ref, () => ({ ...props, instance: massMarks }), [props, massMarks]);

    return null;
  },
);
