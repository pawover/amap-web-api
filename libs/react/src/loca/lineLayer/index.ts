import { createElement, forwardRef, useImperativeHandle } from "react";
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

export const LineLayer = <G extends GeoJSON = GeoJSON, E = any>(props: LineLayerProps<G, E>) => {
  const element = forwardRef<typeof props & { instance: Loca.LineLayer<G, E> | undefined }, typeof props>(
    (props, ref) => {
      const { lineLayer } = useLineLayer<G, E>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: lineLayer }), [props, lineLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
