import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { TextProps } from './';

interface UseText extends TextProps {}

export const useText = (props: UseText) => {
  const { visible = true, ...rest } = props;
  const [text, setText] = useState<AMap.Text>();
  const { map } = useMapContext();

  useVisible(text, visible);
  useProperty<AMap.Text, UseText>(text, props);
  useEventProperty<AMap.Text, UseText, AMap.Text.Events>(text, props, [
    'onHide',
    'onShow',
    'onClick',
    'onDblClick',
    'onRightClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onDragStart',
    'onDragEnd',
    'onDragging',
    'onMoving',
    'onMoveEnd',
    'onMoveAlong',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  useEffect(() => {
    if (AMap && map && !text) {
      const instance = new AMap.Text(rest);
      map.add(instance);
      setText(instance);
    }
    return () => {
      if (text) {
        text.remove();
        setText(undefined);
      }
    };
  }, [map, text]);

  return { text };
};
