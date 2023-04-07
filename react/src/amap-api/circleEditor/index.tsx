import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { CircleRef } from '../circle';
import { useEventProperties } from '../utils';

export interface CircleEditorProps extends AMap.CircleEditor.Events, AMap.CircleEditor.Options, Partial<CircleRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface CircleEditorRef extends CircleEditorProps {
  /** 编辑器实例 */
  editor: AMap.CircleEditor | undefined;
}

export const CircleEditor = forwardRef<CircleEditorRef, CircleEditorProps>((props, ref) => {
  const { editable = false, circle, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.CircleEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.CircleEditor && circle && !editor) {
      const instance = new AMap.CircleEditor(map, circle, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      circle.on('hide', onHide);
      circle.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!circle && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, circle]);
  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else editor.close();
  }, [editable, visible]);

  useEventProperties<AMap.CircleEditor, CircleEditorProps, AMap.CircleEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
