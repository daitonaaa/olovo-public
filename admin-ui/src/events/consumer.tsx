import React from 'react';
import { useAppEventBroadcast } from './use-app-event-broadcast';
import { AppEvents } from './types';
import { useNotifications } from '../providers/notifications';

export const AppEventsConsumer: React.FC = () => {
  const notifications = useNotifications();

  useAppEventBroadcast(AppEvents.api_error, ({ message }) => {
    notifications.push({
      severity: 'error',
      text: message,
    });
  });

  return null;
};
