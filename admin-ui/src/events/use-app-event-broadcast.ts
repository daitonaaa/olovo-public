import { useEffect } from 'react';
import { AppEvents, AppEventsMetadata } from './types';

declare global {
  interface Window {
    _customEventTargetElement: undefined | HTMLDivElement;
  }
}

const getElement = (function () {
  const targetElement = document.createElement('div');
  return function () {
    return targetElement;
  };
})();

export const useAppEventBroadcast = <T extends AppEvents>(
  eventName: T,
  eventHandler: (data: AppEventsMetadata[T]) => void
): void => {
  useEffect(() => {
    const element = getElement();
    const handleEvent = (event: CustomEvent | Event) => {
      const data = (event as CustomEvent).detail;
      eventHandler(data);
    };

    element.addEventListener(eventName, handleEvent, false);

    return () => {
      element.removeEventListener(eventName, handleEvent, false);
    };
  });
};

export const emitAppEvent = <T extends AppEvents>(eventName: T, data?: AppEventsMetadata[T]): void => {
  const element = getElement();
  const event = new CustomEvent(eventName, { detail: data });
  element.dispatchEvent(event);
};
