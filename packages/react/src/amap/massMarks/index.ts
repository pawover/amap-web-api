import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useMassMarks } from "./useMassMarks";

export interface MassMarksProps extends ContextProps, AMap.MassMarks.Events, AMap.MassMarks.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  data?: AMap.MassMarks.DataOptions[];
}

export function MassMarks (props: MassMarksProps & { ref?: Ref<MassMarksProps & { instance: AMap.MassMarks | undefined }> }) {
  const { massMarks } = useMassMarks(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: massMarks }), [props, massMarks]);

  return null;
}
