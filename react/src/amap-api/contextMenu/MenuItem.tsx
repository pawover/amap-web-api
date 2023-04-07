import { useEffect } from 'react';
import type { CommonProps } from '../map';

const noop = () => {};

export interface ContextMenuItem extends CommonProps {
  contextMenu?: AMap.ContextMenu;
  /** 菜单显示文本 */
  label?: string;
  /** 点击后执行的操作 */
  onClick?: (event: MouseEvent) => void;
  /** 当前菜单项在右键菜单中的排序位置，以 0 开始 */
  index?: number;
}

export default (props: ContextMenuItem) => {
  const { label = '', onClick = noop, index = 0 } = props;

  useEffect(() => {
    props.contextMenu?.addItem(label, onClick, index);
    return () => {
      props.contextMenu?.removeItem(label, onClick);
    };
  }, [props.contextMenu, props.label, props.onClick]);

  return null;
};
