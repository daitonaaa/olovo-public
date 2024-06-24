import React, { createRef, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  delay?: number;
  inStatus?: boolean;
  className?: 'alert' | 'fade';
}

export const AnimateWrapper: React.FC<Props> = ({ children, delay, className = 'alert', inStatus }) => {
  const [state, setState] = useState(inStatus);
  const ref = createRef<any>();

  useEffect(() => {
    setState(inStatus);
  }, [inStatus]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(true);
    }, delay || 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <CSSTransition
      in={state}
      nodeRef={ref}
      timeout={300}
      classNames={className}
      unmountOnExit
      // onEnter={() => setShowButton(false)}
      onExited={() => setState(false)}
    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  );
};
