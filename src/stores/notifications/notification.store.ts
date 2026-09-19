import { create } from 'zustand';
import * as idb from 'idb-keyval';

export type NotificationSeverity = 'info' | 'warning' | 'error' | 'success';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  isRead: boolean;
  createdAt: string; // ISO string
  actionLink?: string;
  tenantId?: string;
}

export interface NotificationStore {
  notifications: AppNotification[];
  isInitialized: boolean;
  initializeStore: (clientId: string, serviceId: string) => Promise<void>;
  addNotification: (notification: Omit<AppNotification, 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const getStorageKey = (clientId: string, serviceId: string) => `omk:workspace:${clientId}:${serviceId}:notifications`;

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  isInitialized: false,

  initializeStore: async (clientId: string, serviceId: string) => {
    try {
      const key = getStorageKey(clientId, serviceId);
      const stored = await idb.get<AppNotification[]>(key);
      if (stored) {
        set({ notifications: stored, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('[NotificationStore] Failed to initialize:', error);
      set({ isInitialized: true });
    }
  },

  addNotification: (notification) => {
    set((state) => {
    // Basic deduplication: if identical notification exists and is unread, don't add.
    const isDuplicate = state.notifications.some(
      n => n.id === notification.id
    );

    if (isDuplicate) return state;

    const newNotification: AppNotification = {
      ...notification,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

      const newState = {
        notifications: [newNotification, ...state.notifications].slice(0, 100) // Keep max 100
      };

      // We don't have clientId/serviceId easily here for persistence,
      // but typically we'd persist on change or use Zustand middleware.
      // We will add persist logic via subscribe.

      return newState;
    });
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      )
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, isRead: true }))
    }));
  },

  deleteNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  }
}));

// Helper to persist state
export const persistNotificationStore = (clientId: string, serviceId: string) => {
  const key = getStorageKey(clientId, serviceId);
  return useNotificationStore.subscribe((state) => {
    if (state.isInitialized) {
      idb.set(key, state.notifications).catch(e => console.error('[NotificationStore] Persist failed:', e));
    }
  });
};
