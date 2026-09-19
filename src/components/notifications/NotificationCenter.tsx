import React, { useEffect, useRef } from 'react';
import { useNotificationStore } from '../../stores/notifications/notification.store';
import { NotificationItem } from './NotificationItem';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../../contexts/UserContext';
import { persistNotificationStore } from '../../stores/notifications/notification.store';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (link: string) => void;
}

export function NotificationCenter({ isOpen, onClose, onNavigate }: NotificationCenterProps) {
  const {
    notifications,
    markAllAsRead,
    clearAll,
    initializeStore,
    isInitialized
  } = useNotificationStore();
  const { currentUser, currentRole } = useUser();
  const centerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (centerRef.current && !centerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Initialize and setup persistence on mount or user change
  useEffect(() => {
    if (currentUser?.id && currentRole) {
      initializeStore(currentUser.id, currentRole).then(() => {
        // We set up persistence subscription after init
        const unsubscribe = persistNotificationStore(currentUser.id, currentRole);
        return unsubscribe;
      });
    }
  }, [currentUser?.id, currentRole, initializeStore]);

  const filteredNotifications = notifications.filter(
    n => !n.tenantId || n.tenantId === currentUser.tenantId
  );

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={centerRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-700" />
              <h3 className="font-bold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                  title="Tout marquer comme lu"
                  aria-label="Tout marquer comme lu"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              {filteredNotifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Tout effacer"
                  aria-label="Tout effacer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer sm:hidden"
                title="Fermer"
                aria-label="Fermer les notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/30">
            {!isInitialized ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Chargement...
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm">Aucune notification pour le moment.</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onNavigate={(link) => {
                      if (onNavigate) onNavigate(link);
                      onClose();
                    }}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-slate-100 bg-white text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Fermer le centre de notifications
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
