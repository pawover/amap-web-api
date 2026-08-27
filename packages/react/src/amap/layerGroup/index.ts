import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useLayerGroup } from "./useLayerGroup";

export interface LayerGroupProps extends ContextProps, AMap.LayerGroup.Events {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层列表 */
  layers: AMap.LayerType[];
}

export function LayerGroup (props: LayerGroupProps & { ref?: Ref<LayerGroupProps & { instance: AMap.LayerGroup | undefined }> }) {
  const { layerGroup } = useLayerGroup(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: layerGroup }), [props, layerGroup]);

  return null;
}
