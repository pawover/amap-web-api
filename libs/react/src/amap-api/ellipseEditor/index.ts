import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';

export interface EllipseEditorProps extends AMap.EllipseEditor.Events, AMap.EllipseEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<'open', AMap.EllipseEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<'close', AMap.EllipseEditor>) => void;

  children?: React.ReactElement;
}

export const EllipseEditor = forwardRef<
  EllipseEditorProps & { instance: AMap.EllipseEditor | undefined },
  EllipseEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.EllipseEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Ellipse>();
  const isStrictModeRenderedRefRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.EllipseEditor, EllipseEditorProps, AMap.EllipseEditor.Events>(editor, props, [
    'onAddNode',
    'onRemoveNode',
    'onAdjust',
    'onMove',
    'onAdd',
    'onEnd',
  ]);

  useEffect(() => {
    if (AMap.EllipseEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRefRef.current) {
        const instance = new AMap.EllipseEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRefRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRefRef.current) {
        isStrictModeRenderedRefRef.current = true;
        console.error('Failed to load EllipseEditor: AMap plugin "AMap.EllipseEditor" is Required');
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
