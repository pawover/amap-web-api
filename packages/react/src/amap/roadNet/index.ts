import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useRoadNet } from "./useRoadNet";

export interface RoadNetProps extends ContextProps, AMap.RoadNet.Events, AMap.RoadNet.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function RoadNet (props: RoadNetProps & { ref?: Ref<RoadNetProps & { instance: AMap.RoadNet | undefined }> }) {
  const { roadNet } = useRoadNet(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: roadNet }), [props, roadNet]);

  return null;
}
