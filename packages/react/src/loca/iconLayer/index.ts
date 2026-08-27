import { useImperativeHandle, type Ref } from "react";
import { useIconLayer } from "./useIconLayer";

export interface IconLayerProps<G extends GeoJSON = GeoJSON> extends Loca.IconLayer.Options {
  /**
   * 图层数据源
   */
  source?: Loca.GeoJSONSource.Options<G>;
  /**
   * 图层样式配置
   */
  styles?: Loca.IconLayer.StyleOptions;
  /**
   * 图层动画配置，元组类型
   * - 是否启用动画，默认：`false`
   * - 动画配置项 `Loca.Layer.AnimateConfigs`
   * - 回调函数
   */
  animate?: [enabled: boolean, ...Parameters<Loca.Layer["addAnimate"]>];
}

export function IconLayer<G extends GeoJSON = GeoJSON> (props: IconLayerProps<G> & { ref?: Ref<IconLayerProps<G> & { instance: Loca.IconLayer<G> | undefined }> }) {
  const { iconLayer } = useIconLayer<G>(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: iconLayer }), [props, iconLayer]);

  return null;
}
