import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMapContext } from '../index';
import type { BezierCurveRef } from '../bezierCurve';
import { useEventProperties } from '../utils';

export interface BezierCurveEditorProps
  extends AMap.BezierCurveEditor.Events,
    AMap.BezierCurveEditor.Options,
    Partial<BezierCurveRef> {
  /** 是否开启编辑 */
  editable?: boolean;
}
export interface BezierCurveEditorRef extends BezierCurveEditorProps {
  /** 编辑器实例 */
  editor: AMap.BezierCurveEditor | undefined;
}

export const BezierCurveEditor = forwardRef<BezierCurveEditorRef, BezierCurveEditorProps>((props, ref) => {
  const { editable = false, bezierCurve, ...restProps } = props;
  const { AMap, map } = useMapContext();
  const [visible, setVisible] = useState<boolean>(true);
  const [editor, setEditor] = useState<AMap.BezierCurveEditor>();

  useImperativeHandle(ref, () => ({ ...props, editor }));

  useEffect(() => {
    if (AMap && map && AMap.BezierCurveEditor && bezierCurve && !editor) {
      const instance = new AMap.BezierCurveEditor(map, bezierCurve, restProps);
      const onHide = () => setVisible(false);
      const onShow = () => setVisible(true);
      bezierCurve.on('hide', onHide);
      bezierCurve.on('show', onShow);
      editable && instance.open();
      setEditor(instance);
    }
    if (!bezierCurve && editor) setEditor(undefined);
    return () => {
      if (editor) setEditor(undefined);
    };
  }, [map, bezierCurve]);
  useEffect(() => {
    if (!editor) return;
    if (visible) editable ? editor.open() : editor.close();
    else editor.close();
  }, [editable, visible]);

  useEventProperties<AMap.BezierCurveEditor, BezierCurveEditorProps, AMap.BezierCurveEditor.Events>(editor!, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  return null;
});
