import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  Fragment,
  isValidElement,
  useImperativeHandle,
} from 'react';
import type { ContextProps } from '../map';
import MenuItem from './MenuItem';
import { useContextMenu } from './useContextMenu';

export * from './MenuItem';
export * from './useContextMenu';
export interface ContextMenuProps extends ContextProps, AMap.ContextMenu.Events, AMap.ContextMenu.Options {
  children?: React.ReactNode;
}

export const ContextMenu = forwardRef<ContextMenuProps & { instance: AMap.ContextMenu | undefined }, ContextMenuProps>(
  (props, ref) => {
    const { disabled = false } = props;
    const { contextMenu } = useContextMenu(props);
    const childList = Children.toArray(props.children);

    useImperativeHandle(ref, () => ({ ...props, instance: contextMenu }), [props, contextMenu]);

    return createElement(
      Fragment,
      null,
      contextMenu && !disabled
        ? childList.map((child, key) => {
            if (!isValidElement(child)) return null;
            return cloneElement(child, { ...child.props, AMap, map: props.map, contextMenu, key });
          })
        : null,
    );
  },
) as React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<ContextMenuProps>> & {
  Item: typeof MenuItem;
};

ContextMenu.Item = MenuItem;
