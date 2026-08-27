import { useImperativeHandle, type Ref } from "react";
import { useLineLayer } from "./useLineLayer";

export interface LineLayerProps<G extends GeoJSON = GeoJSON, E = any> extends Loca.LineLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.LineLayer.StyleOptions<E>;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export function LineLayer<G extends GeoJSON = GeoJSON, E = any> (props: LineLayerProps<G, E> & { ref?: Ref<LineLayerProps<G, E> & { instance: Loca.LineLayer<G, E> | undefined }> }) {
  const { lineLayer } = useLineLayer<G, E>(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: lineLayer }), [props, lineLayer]);

  return null;
}
