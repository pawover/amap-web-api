import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { EllipseRef } from '../ellipse';
import { useEventProperties } from '../utils';

export interface EllipseEditorProps extends AMap.EllipseEditor.Events, AMap.EllipseEditor.Options, Partial<EllipseRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface EllipseEditorRef extends EllipseEditorProps {
  /** 编辑器实例 */
  editor: AMap.EllipseEditor | undefined;
}

export const EllipseEditor = forwardRef<EllipseEditorRef, EllipseEditorProps>((props, ref) => {
  const { editable = false, ellipse, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.EllipseEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.EllipseEditor && ellipse && !editor) {
      const instance = new AMap.EllipseEditor(map, ellipse, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      ellipse.on('hide', onHide);
      ellipse.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!ellipse && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, ellipse]);
  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else editor.close();
  }, [editable, visible]);

  useEventProperties<AMap.EllipseEditor, EllipseEditorProps, AMap.EllipseEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
