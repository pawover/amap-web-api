import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { TextProps } from '.';
import { useEventProperties, useWrapper, useSetProperties, useVisible } from '../utils';

interface UseText extends TextProps {}

export const useText = (props: UseText) => {
  const { visible = true, ...rest } = props;
  const [text, setText] = useState<AMap.Text>();
  const { AMap, map } = useMapContext();
  const { container, setWrapper } = useWrapper({ class: 'amap-text-wrapper' });

  useEffect(() => {
    if (AMap && map && !text) {
      if (props.children) rest.text = container.innerHTML;
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
  useEffect(() => {
    if (text) text.setText(props.children ? container.innerHTML : props.text || '');
  }, [props.children, props.text, container, text]);

  useVisible(text!, visible);
  useSetProperties<AMap.Text, UseText>(text!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Text, UseText, AMap.Text.Events>(text!, props, [
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

  return {
    text,
    setText,
    TextWrapper: setWrapper,
  };
};
