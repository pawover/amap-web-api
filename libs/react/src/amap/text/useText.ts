import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { TextProps } from "./";

interface UseTextProps extends TextProps {}

export const useText = (props: UseTextProps) => {
  const { visible = true, content, children, ...rest } = props;
  if ("text" in rest) delete rest.text;
  const renderContent = content || children;
  const [text, setText] = useState<AMap.Text>();
  const [wrapper, setWrapper] = useState<React.ReactPortal>();
  const { map } = useMapContext();
  const isStrictModeRenderedRef = useRef(false);

  useVisible(text, visible);
  useProperty<AMap.Text, UseTextProps>(text, rest);
  useEventProperty<AMap.Text, UseTextProps, AMap.Text.Events>(text, props, [
    "onHide",
    "onShow",
    "onClick",
    "onDblClick",
    "onRightClick",
    "onMouseUp",
    "onMouseDown",
    "onMouseOver",
    "onMouseOut",
    "onMouseMove",
    "onDragStart",
    "onDragEnd",
    "onDragging",
    "onMoving",
    "onMoveEnd",
    "onMoveAlong",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
  ]);

  useEffect(() => {
    if (AMap && map && !text && !isStrictModeRenderedRef.current) {
      const instance = new AMap.Text(rest);
      map.add(instance);

      if (renderContent) {
        const dom = instance.getContentDom();
        if (dom) {
          dom.innerHTML = "";
          const wrapper = createPortal(renderContent, dom);
          setWrapper(wrapper);
        }
      }

      setText(instance);
      isStrictModeRenderedRef.current = true;
    }
    return () => {
      if (text) {
        text.remove();
        text.setMap(null);
        setText(undefined);
        isStrictModeRenderedRef.current = false;
      }
    };
  }, [map, text]);

  useEffect(() => {
    if (text && renderContent) {
      const dom = text.getContentDom();
      if (dom) {
        const wrapper = createPortal(renderContent, dom);
        setWrapper(wrapper);
      }
    }
  }, [text, renderContent]);

  return { text, wrapper };
};
