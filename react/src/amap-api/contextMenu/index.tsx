import React, { Children, cloneElement, forwardRef, Fragment, isValidElement, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import MenuItem from './MenuItem';
import { useContextMenu } from './useContextMenu';

export * from './MenuItem';
export * from './useContextMenu';
export interface ContextMenuProps extends CommonProps, AMap.ContextMenu.Events, AMap.ContextMenu.Options {
  children?: React.ReactNode;
}

export const ContextMenu = forwardRef<
  ContextMenuProps & { contextMenu: AMap.ContextMenu | undefined },
  ContextMenuProps
>((props, ref) => {
  const { disabled = false } = props;
  const { contextMenu } = useContextMenu(props);
  useImperativeHandle(ref, () => ({ ...props, contextMenu }), [props, contextMenu]);
  const childList = Children.toArray(props.children);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment, react/jsx-fragments
    <Fragment>
      {contextMenu && !disabled
        ? childList.map((child, key) => {
            if (!isValidElement(child)) return null;
            return cloneElement(child, { ...child.props, AMap, map: props.map, contextMenu, key });
          })
        : null}
    </Fragment>
  );
}) as React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<ContextMenuProps>> & {
  Item: typeof MenuItem;
};

ContextMenu.Item = MenuItem;
