import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty } from "../utils";

export interface PolygonEditorProps extends AMap.PolygonEditor.Events, AMap.PolygonEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<"open", AMap.PolygonEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<"close", AMap.PolygonEditor>) => void;

  children?: React.ReactElement;
}

export const PolygonEditor = forwardRef<
  PolygonEditorProps & { instance: AMap.PolygonEditor | undefined },
  PolygonEditorProps
>((props, ref) => {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.PolygonEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Polygon>();
  const isStrictModeRenderedRef = useRef(false);

  useImperativeHandle(ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.PolygonEditor, PolygonEditorProps, AMap.PolygonEditor.Events>(editor, props, [
    "onAddNode",
    "onRemoveNode",
    "onAdjust",
    "onMove",
    "onAdd",
    "onEnd",
  ]);

  useEffect(() => {
    if (AMap.PolygonEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRef.current) {
        const instance = new AMap.PolygonEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRef.current) {
        isStrictModeRenderedRef.current = true;
        console.error('Failed to load PolygonEditor: AMap plugin "AMap.PolygonEditor" is Required');
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
        onOpen?.({ type: "open", target: editor });
      } else {
        editor.close();
        onClose?.({ type: "close", target: editor });
      }
    }
  }, [editor, editable, onOpen, onClose]);

  return children ? cloneElement(children, { setChildComponentInstanceForEditor }) : null;
});
