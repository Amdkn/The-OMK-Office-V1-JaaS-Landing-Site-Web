import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../stores/notifications/notification.store';
import { useUser } from '../../contexts/UserContext';
import { NotificationCenter } from './NotificationCenter';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useNotificationStore();
  const { currentUser } = useUser();

  const filteredNotifications = notifications.filter(
    n => !n.tenantId || n.tenantId === currentUser.tenantId
  );

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        aria-label="Centre de notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full border border-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <NotificationCenter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={(link) => console.log('Navigate to:', link)}
      />
    </div>
  );
}
