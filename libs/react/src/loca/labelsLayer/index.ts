import { createElement, forwardRef, useImperativeHandle } from "react";
import { useLabelsLayer } from "./useLabelsLayer";

export interface LabelsLayerProps<G extends GeoJSON = GeoJSON> extends Loca.LabelsLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.LabelsLayer.StyleOptions;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export const LabelsLayer = <G extends GeoJSON = GeoJSON>(props: LabelsLayerProps<G>) => {
  const element = forwardRef<typeof props & { instance: Loca.LabelsLayer<G> | undefined }, typeof props>(
    (props, ref) => {
      const { labelsLayer } = useLabelsLayer<G>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: labelsLayer }), [props, labelsLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
