import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { RectangleRef } from '../rectangle';
import { useEventProperties } from '../utils';

export interface RectangleEditorProps
  extends AMap.RectangleEditor.Events,
    AMap.RectangleEditor.Options,
    Partial<RectangleRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface RectangleEditorRef extends RectangleEditorProps {
  /** 编辑器实例 */
  editor: AMap.RectangleEditor | undefined;
}

export const RectangleEditor = forwardRef<RectangleEditorRef, RectangleEditorProps>((props, ref) => {
  const { editable = false, rectangle, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.RectangleEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.RectangleEditor && rectangle && !editor) {
      const instance = new AMap.RectangleEditor(map, rectangle, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      rectangle.on('hide', onHide);
      rectangle.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!rectangle && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, rectangle]);

  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else editor.close();
  }, [editable, visible]);

  useEventProperties<AMap.RectangleEditor, RectangleEditorProps, AMap.RectangleEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
