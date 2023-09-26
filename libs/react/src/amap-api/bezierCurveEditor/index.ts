import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';

export interface BezierCurveEditorProps extends AMap.BezierCurveEditor.Events, AMap.BezierCurveEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<'open', AMap.BezierCurveEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<'close', AMap.BezierCurveEditor>) => void;

  children?: React.ReactElement;
}

export const BezierCurveEditor = forwardRef<
  BezierCurveEditorProps & { instance: AMap.BezierCurveEditor | undefined },
  BezierCurveEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.BezierCurveEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.BezierCurve>();
  const isStrictModeRenderedRefRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.BezierCurveEditor, BezierCurveEditorProps, AMap.BezierCurveEditor.Events>(editor, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  useEffect(() => {
    if (AMap.BezierCurveEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRefRef.current) {
        const instance = new AMap.BezierCurveEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRefRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRefRef.current) {
        isStrictModeRenderedRefRef.current = true;
        console.error('Failed to load BezierCurveEditor: AMap plugin "AMap.BezierCurveEditor" is Required');
      }
    }

    return () => {
      if (editor) {
        setEditor(undefined);
        isStrictModeRenderedRefRef.current = false;
      }
    };
  }, [map, editor, childComponentInstanceForEditor]);

  useEffect(() => {
    if (editor) {
      if (editable) {
        editor.open();
        onOpen?.({ type: 'open', target: editor });
      } else {
        editor.close();
        onClose?.({ type: 'close', target: editor });
      }
    }
  }, [editor, editable, onOpen, onClose]);

  return children ? cloneElement(children, { setChildComponentInstanceForEditor }) : null;
});
