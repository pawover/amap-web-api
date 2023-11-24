import { createElement, forwardRef, useImperativeHandle } from "react";
import { useLinkLayer } from "./useLinkLayer";

export interface LinkLayerProps<G extends GeoJSON = GeoJSON, E = any> extends Loca.LinkLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.LinkLayer.StyleOptions<E>;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export const LinkLayer = <G extends GeoJSON = GeoJSON, E = any>(props: LinkLayerProps<G, E>) => {
  const element = forwardRef<typeof props & { instance: Loca.LinkLayer<G, E> | undefined }, typeof props>(
    (props, ref) => {
      const { linkLayer } = useLinkLayer<G, E>(props);
      useImperativeHandle(ref, () => ({ ...props, instance: linkLayer }), [props, linkLayer]);

      return null;
    },
  );

  return createElement(element, props);
};
