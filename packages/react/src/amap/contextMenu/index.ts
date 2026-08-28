import { Children, cloneElement, createElement, Fragment, isValidElement, useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import MenuItem from "./MenuItem";
import { useContextMenu } from "./useContextMenu";

export interface ContextMenuProps extends ContextProps, AMap.ContextMenu.Events, AMap.ContextMenu.Options {
  children?: React.ReactNode;
}

function ContextMenuComponent (props: ContextMenuProps & { ref?: Ref<ContextMenuProps> }) {
  const { disabled = false } = props;
  const { contextMenu } = useContextMenu(props);
  const childList = Children.toArray(props.children);

  useImperativeHandle(props.ref, () => ({ ...props, instance: contextMenu }), [props, contextMenu]);

  return createElement(
    Fragment,
    null,
    contextMenu && !disabled
      ? childList.map((child, key) => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child, { ...(child.props as object), AMap, map: props.map, contextMenu, key } as object);
      })
      : null,
  );
}

export const ContextMenu = Object.assign(ContextMenuComponent, { Item: MenuItem });
