import { useImperativeHandle, type Ref } from "react";
import { usePolygonLayer } from "./usePolygonLayer";

export interface PolygonLayerProps<G extends GeoJSON = GeoJSON, E = any> extends Loca.PolygonLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.PolygonLayer.StyleOptions<E>;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export function PolygonLayer<G extends GeoJSON = GeoJSON, E = any> (props: PolygonLayerProps<G, E> & { ref?: Ref<PolygonLayerProps<G, E> & { instance: Loca.PolygonLayer<G, E> | undefined }> }) {
  const { polygonLayer } = usePolygonLayer<G, E>(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: polygonLayer }), [props, polygonLayer]);

  return null;
}
