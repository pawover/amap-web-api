import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useHawkEye } from "./useHawkEye";

export interface HawkEyeProps extends ContextProps, AMap.HawkEye.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function HawkEye (props: HawkEyeProps & { ref?: Ref<HawkEyeProps & { instance: AMap.HawkEye | undefined }> }) {
  const { hawkEye } = useHawkEye(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: hawkEye }), [props, hawkEye]);

  return null;
}
