import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useMassMarks } from './useMassMarks';

export * from './useMassMarks';
export interface MassMarksProps extends CommonProps, AMap.MassMarks.Events, AMap.MassMarks.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  data?: AMap.MassMarks.DataOptions[];
}

export const MassMarks = forwardRef<MassMarksProps & { massMarks: AMap.MassMarks | undefined }, MassMarksProps>(
  (props, ref) => {
    const { massMarks } = useMassMarks(props);
    useImperativeHandle(ref, () => ({ ...props, massMarks }), [props, massMarks]);

    return null;
  },
);
