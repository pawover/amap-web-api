// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React, { type ReactPortal, useCallback, useEffect, useState } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';

interface State {
  render: (props: { children: React.ReactNode }) => ReactPortal | null;
  remove: (e?: HTMLElement) => void;
}

export const useWrapper = (props?: { tagName?: keyof HTMLElementTagNameMap; class?: string }) => {
  const element = document.createElement(props?.tagName || 'div');
  props?.class && element.setAttribute('class', props.class);
  const [container] = useState<HTMLElement>(element);
  const [portal, setPortal] = useState<State>({
    render: () => null,
    remove: () => null,
  });

  const reactCreatePortal = useCallback<(element: HTMLElement) => State>((element) => {
    const portalRender: State['render'] = ({ children }) => {
      if (!children) return null;
      return createPortal(children, element);
    };
    const remove: State['remove'] = (e) => {
      e && unmountComponentAtNode(e);
    };
    return { render: portalRender, remove };
  }, []);

  useEffect(() => {
    if (container) portal.remove();
    const newPortal = reactCreatePortal(container);
    setPortal(newPortal);
    return () => {
      newPortal.remove(container);
    };
  }, [container]);

  return {
    container,
    setWrapper: portal.render,
  };
};
