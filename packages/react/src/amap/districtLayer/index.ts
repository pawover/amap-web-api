import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useDistrictLayer } from "./useDistrictLayer";

export interface DistrictLayerProps extends ContextProps, AMap.DistrictLayer.Events, AMap.DistrictLayer.Options {
  /**
   * 行政区类型
   * - `world` 世界简易行政区图层
   * - `country` 国家简易行政区图层
   * - `province` 省市简易行政区图层
   */
  districtType: "world" | "country" | "province";
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function DistrictLayer (props: DistrictLayerProps & { ref?: Ref<DistrictLayerProps & { instance: AMap.DistrictLayer | undefined }> }) {
  const { districtLayer } = useDistrictLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: districtLayer }), [props, districtLayer]);

  return null;
}
