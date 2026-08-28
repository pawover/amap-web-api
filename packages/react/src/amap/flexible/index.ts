import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useFlexible } from "./useFlexible";

export interface FlexibleProps extends ContextProps, AMap.Flexible.Events, AMap.Flexible.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function Flexible (props: FlexibleProps & { ref?: Ref<FlexibleProps & { instance: AMap.Flexible | undefined }> }) {
  const { flexible } = useFlexible(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: flexible }), [props, flexible]);

  return null;
}
