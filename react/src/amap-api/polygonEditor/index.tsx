import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { PolygonRef } from '../polygon';
import { useEventProperties } from '../utils';

export interface PolygonEditorProps extends AMap.PolygonEditor.Events, AMap.PolygonEditor.Options, Partial<PolygonRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface PolygonEditorRef extends PolygonEditorProps {
  /** 编辑器实例 */
  editor: AMap.PolygonEditor | undefined;
}

export const PolygonEditor = forwardRef<PolygonEditorRef, PolygonEditorProps>((props, ref) => {
  const { editable = false, polygon, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.PolygonEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.PolygonEditor && polygon && !editor) {
      const instance = new AMap.PolygonEditor(map, polygon, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      polygon.on('hide', onHide);
      polygon.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!polygon && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, polygon]);

  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else {
      editor.close();
      restProps.onEnd && restProps.onEnd({ type: 'end', target: editor.getTarget()! });
    }
  }, [editable, visible]);

  useEventProperties<AMap.PolygonEditor, PolygonEditorProps, AMap.PolygonEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
