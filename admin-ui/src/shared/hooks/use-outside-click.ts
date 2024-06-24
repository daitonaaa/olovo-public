import { useEffect, useRef } from 'react';
import { Nullable } from '../../types';

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<Nullable<T>>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.button === 0 && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
}
