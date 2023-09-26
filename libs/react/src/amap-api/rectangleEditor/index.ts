import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';

export interface RectangleEditorProps extends AMap.RectangleEditor.Events, AMap.RectangleEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<'open', AMap.RectangleEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<'close', AMap.RectangleEditor>) => void;

  children?: React.ReactElement;
}

export const RectangleEditor = forwardRef<
  RectangleEditorProps & { instance: AMap.RectangleEditor | undefined },
  RectangleEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.RectangleEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Rectangle>();
  const isStrictModeRenderedRefRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.RectangleEditor, RectangleEditorProps, AMap.RectangleEditor.Events>(editor, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  useEffect(() => {
    if (AMap.RectangleEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRefRef.current) {
        const instance = new AMap.RectangleEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRefRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRefRef.current) {
        isStrictModeRenderedRefRef.current = true;
        console.error('Failed to load RectangleEditor: AMap plugin "AMap.RectangleEditor" is Required');
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
