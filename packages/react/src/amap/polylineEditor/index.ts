import { cloneElement, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useMapContext } from "../index";
import { useEventProperty } from "../utils";

export interface PolylineEditorProps extends AMap.PolylineEditor.Events, AMap.PolylineEditor.Options {
  /** 是否开启编辑 */
  editable?: boolean;
  /** 开启编辑 */
  onOpen?: (event?: AMap.MapsEvent<"open", AMap.PolylineEditor>) => void;
  /** 关闭编辑 */
  onClose?: (event?: AMap.MapsEvent<"close", AMap.PolylineEditor>) => void;

  children?: React.ReactElement;
}

export function PolylineEditor (props: PolylineEditorProps & { ref?: Ref<PolylineEditorProps & { instance: AMap.PolylineEditor | undefined }> }) {
  const { editable = false, onOpen, onClose, children, ...rest } = props;
  const { map } = useMapContext();
  const [editor, setEditor] = useState<AMap.PolylineEditor>();
  const [childComponentInstanceForEditor, setChildComponentInstanceForEditor] = useState<AMap.Polyline>();
  const isStrictModeRenderedRef = useRef(false);

  useImperativeHandle(props.ref, () => ({ ...props, instance: editor }));

  useEventProperty<AMap.PolylineEditor, PolylineEditorProps, AMap.PolylineEditor.Events>(editor, props, [
    "onAddNode",
    "onRemoveNode",
    "onAdjust",
    "onMove",
    "onAdd",
    "onEnd",
  ]);

  useEffect(() => {
    if (AMap.PolylineEditor) {
      if (map && !editor && childComponentInstanceForEditor && !isStrictModeRenderedRef.current) {
        const instance = new AMap.PolylineEditor(map, childComponentInstanceForEditor, rest);
        setEditor(instance);
        isStrictModeRenderedRef.current = true;
      }
    } else {
      if (!isStrictModeRenderedRef.current) {
        isStrictModeRenderedRef.current = true;
        console.error("Failed to load PolylineEditor: AMap plugin \"AMap.PolylineEditor\" is Required");
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

  return children ? cloneElement(children, { setChildComponentInstanceForEditor } as object) : null;
}
