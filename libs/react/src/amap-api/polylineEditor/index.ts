import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';

export interface PolylineEditorProps extends AMap.PolylineEditor.Events, AMap.PolylineEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<'open', AMap.PolylineEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<'close', AMap.PolylineEditor>) => void;

  children?: React.ReactElement;
}

export const PolylineEditor = forwardRef<
  PolylineEditorProps & { instance: AMap.PolylineEditor | undefined },
  PolylineEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.PolylineEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Polyline>();
  const isStrictModeRenderedRefRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.PolylineEditor, PolylineEditorProps, AMap.PolylineEditor.Events>(editor, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  useEffect(() => {
    if (AMap.PolylineEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRefRef.current) {
        const instance = new AMap.PolylineEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRefRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRefRef.current) {
        isStrictModeRenderedRefRef.current = true;
        console.error('Failed to load PolylineEditor: AMap plugin "AMap.PolylineEditor" is Required');
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
