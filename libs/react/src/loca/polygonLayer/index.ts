import { createElement, forwardRef, useImperativeHandle } from "react";
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

export const PolygonLayer = <G extends GeoJSON = GeoJSON, E = any>(props: PolygonLayerProps<G, E>) => {
  const element = forwardRef<typeof props & { instance: Loca.PolygonLayer<G, E> | undefined }, typeof props>(
    (props, ref) => {
      const { polygonLayer } = usePolygonLayer<G, E>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: polygonLayer }), [props, polygonLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
