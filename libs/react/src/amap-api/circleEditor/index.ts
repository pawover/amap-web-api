import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';

export interface CircleEditorProps extends AMap.CircleEditor.Events, AMap.CircleEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<'open', AMap.CircleEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<'close', AMap.CircleEditor>) => void;

  children?: React.ReactElement;
}

export const CircleEditor = forwardRef<
  CircleEditorProps & { instance: AMap.CircleEditor | undefined },
  CircleEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.CircleEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Circle>();
  const isStrictModeRenderedRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.CircleEditor, CircleEditorProps, AMap.CircleEditor.Events>(editor, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  useEffect(() => {
    if (AMap.CircleEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRef.current) {
        const instance = new AMap.CircleEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRef.current) {
        isStrictModeRenderedRef.current = true;
        console.error('Failed to load CircleEditor: AMap plugin "AMap.CircleEditor" is Required');
      }
    }

    return () => {
      if (editor) {
        setEditor(undefined);
        isStrictModeRenderedRef.current = false;
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
