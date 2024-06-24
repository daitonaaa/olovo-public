import React, { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { Alert } from '@material-ui/lab';

interface NotificationSource {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  id?: string;
}

export interface NotificationContextItem {
  id: string;
  data: NotificationSource;
}

export interface NotificationsContextInterface {
  push(data: NotificationSource): NotificationContextItem;
  remove(id: string): void; // you can force delete notification by NotificationContextItem['id']
}

const Context = createContext<NotificationsContextInterface | undefined>(undefined);

const itemFactory = (data: NotificationContextItem['data']): NotificationContextItem => ({
  data,
  id: data.id !== undefined ? data.id : nanoid(6),
});

export const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationContextItem[]>([]);

  const handleRemoveItem = useCallback(
    (id?: string, notFoundIsOK?: boolean) => {
      setNotifications(list => {
        if (!id) {
          throw new Error(`[Notifications provider] All notifications must have an id`);
        }

        const notificationIndex = list.findIndex(item => item.id === id);
        if (notificationIndex < 0) {
          if (notFoundIsOK) {
            return list;
          }
          throw new Error(`[Notifications provider] Notification not found`);
        }

        return list.filter((_, index) => index !== notificationIndex);
      });
    },
    [setNotifications]
  );

  const handlePushItem = useCallback(
    (data: NotificationContextItem['data']) => {
      if (data.id !== undefined) {
        try {
          handleRemoveItem(data.id, true);
        } catch (err) {
          // Its OK if notification is not found
        }
      }
      const newItem = itemFactory(data);
      setNotifications(list => [...list, newItem]);

      return newItem;
    },
    [handleRemoveItem, setNotifications]
  );

  const params: NotificationsContextInterface = {
    push: handlePushItem,
    remove: handleRemoveItem as NotificationsContextInterface['remove'],
  };

  return (
    <Context.Provider value={params}>
      {notifications.length > 0 && (
        <>
          {notifications.map(({ data, id }) => (
            <Snackbar
              open={true}
              key={id}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              onClose={() => handleRemoveItem(id)}
              autoHideDuration={6000}
            >
              <Alert onClose={() => handleRemoveItem(id)} severity={data.severity} style={{ width: '100%' }}>
                <div>{data.text}</div>
              </Alert>
            </Snackbar>
          ))}
        </>
      )}
      {children}
    </Context.Provider>
  );
};

export const useNotifications = () => useContext(Context) as NotificationsContextInterface;
