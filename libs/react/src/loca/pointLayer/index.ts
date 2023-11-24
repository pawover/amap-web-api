import { createElement, forwardRef, useImperativeHandle } from "react";
import { usePointLayer } from "./usePointLayer";

export interface PointLayerProps<G extends GeoJSON = GeoJSON, E = any> extends Loca.PointLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.PointLayer.StyleOptions<E>;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export const PointLayer = <G extends GeoJSON = GeoJSON, E = any>(props: PointLayerProps<G, E>) => {
  const element = forwardRef<typeof props & { instance: Loca.PointLayer<G, E> | undefined }, typeof props>(
    (props, ref) => {
      const { pointLayer } = usePointLayer<G, E>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: pointLayer }), [props, pointLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
