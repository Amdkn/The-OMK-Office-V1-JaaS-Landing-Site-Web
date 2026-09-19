import { describe, it, expect, beforeEach } from 'vitest';
import { useNotificationStore } from '../../stores/notifications/notification.store';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { NotificationBell } from '../../components/notifications/NotificationBell';
import { NotificationAdapter } from '../../components/notifications/NotificationAdapter';
import { UserProvider } from '../../contexts/UserContext';
import { appEventBus } from '../../lib/appEventBus';

describe('Notification Action Center', () => {
  beforeEach(() => {
    const store = useNotificationStore.getState();
    store.clearAll();
  });

  describe('Store logic', () => {
    it('should add a notification', () => {
      const store = useNotificationStore.getState();

      act(() => {
        store.addNotification({
          id: 'test-1',
          title: 'Test Notification',
          message: 'This is a test',
          severity: 'info'
        });
      });

      const currentState = useNotificationStore.getState();
      expect(currentState.notifications).toHaveLength(1);
      expect(currentState.notifications[0].title).toBe('Test Notification');
      expect(currentState.notifications[0].isRead).toBe(false);
    });

    it('should deduplicate notifications by ID if they are unread', () => {
      const store = useNotificationStore.getState();

      act(() => {
        store.addNotification({
          id: 'dup-1',
          title: 'Duplicate Test',
          message: 'Message 1',
          severity: 'info'
        });
      });

      act(() => {
        store.addNotification({
          id: 'dup-1',
          title: 'Duplicate Test',
          message: 'Message 2',
          severity: 'warning'
        });
      });

      const currentState = useNotificationStore.getState();
      expect(currentState.notifications).toHaveLength(1);
      expect(currentState.notifications[0].message).toBe('Message 1'); // Keeps the first one
    });

    it('should mark a notification as read', () => {
      const store = useNotificationStore.getState();

      act(() => {
        store.addNotification({
          id: 'test-2',
          title: 'Test Read',
          message: 'Message',
          severity: 'info'
        });
      });

      act(() => {
        useNotificationStore.getState().markAsRead('test-2');
      });

      const currentState = useNotificationStore.getState();
      expect(currentState.notifications[0].isRead).toBe(true);
    });
  });

  describe('UI Integration', () => {
    it('should show unread badge count', () => {
      act(() => {
        useNotificationStore.getState().addNotification({
          id: 'ui-test-1',
          title: 'UI Test',
          message: 'UI Message',
          severity: 'info'
        });
      });

      render(
        <UserProvider>
          <NotificationBell />
        </UserProvider>
      );

      const bell = screen.getByRole('button', { name: /Centre de notifications/i });
      expect(bell).not.toBeNull();
      expect(screen.getByText('1')).not.toBeNull();
    });

    it('should map domain events to notifications via adapter', async () => {
      render(
        <UserProvider>
          <NotificationAdapter />
          <NotificationBell />
        </UserProvider>
      );

      // Wait for initialization to pass
      await act(async () => {
        await new Promise(r => setTimeout(r, 0));
      });

      act(() => {
        appEventBus.emit('EVENT_CHRONO_VALIDATED', 'Test System', { docId: 'DOC-123' });
      });

      // We might need to wait for store updates since it depends on UserContext init
      await act(async () => {
        useNotificationStore.setState({ isInitialized: true });
        await new Promise(r => setTimeout(r, 0));
      });

      // The bell should now show 1 notification
      expect(screen.getByText('1')).not.toBeNull();

      // Open the bell
      fireEvent.click(screen.getByRole('button', { name: /Centre de notifications/i }));

      // Should find the translated text
      expect(screen.getByText('Chrono Validé')).not.toBeNull();
    });
  });
});
