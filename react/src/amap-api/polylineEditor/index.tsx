import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { PolylineRef } from '../polyline';
import { useEventProperties } from '../utils';

export interface PolylineEditorProps
  extends AMap.PolylineEditor.Events,
    AMap.PolylineEditor.Options,
    Partial<PolylineRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface PolylineEditorRef extends PolylineEditorProps {
  /** 编辑器实例 */
  editor: AMap.PolylineEditor | undefined;
}

export const PolylineEditor = forwardRef<PolylineEditorRef, PolylineEditorProps>((props, ref) => {
  const { editable = false, polyline, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.PolylineEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.PolylineEditor && polyline && !editor) {
      const instance = new AMap.PolylineEditor(map, polyline, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      polyline.on('hide', onHide);
      polyline.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!polyline && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, polyline]);
  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else editor.close();
  }, [editable, visible]);

  useEventProperties<AMap.PolylineEditor, PolylineEditorProps, AMap.PolylineEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
