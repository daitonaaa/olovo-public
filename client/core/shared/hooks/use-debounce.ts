import { useRef, useEffect } from 'react';

export default function useDebounce(
  func: (...args: any[]) => void,
  delay: number,
  cleanUp = false
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: any[]) => {
    clearTimer();

    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}
