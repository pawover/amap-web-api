import { useImperativeHandle, type Ref } from "react";
import { usePrismLayer } from "./usePrismLayer";

export interface PrismLayerProps<G extends GeoJSON = GeoJSON, E = any> extends Loca.PrismLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.PrismLayer.StyleOptions<E>;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export function PrismLayer<G extends GeoJSON = GeoJSON, E = any> (props: PrismLayerProps<G, E> & { ref?: Ref<PrismLayerProps<G, E> & { instance: Loca.PrismLayer<G, E> | undefined }> }) {
  const { prismLayer } = usePrismLayer<G, E>(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: prismLayer }), [props, prismLayer]);

  return null;
}
