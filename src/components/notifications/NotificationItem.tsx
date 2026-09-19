import React from 'react';
import { AppNotification, useNotificationStore } from '../../stores/notifications/notification.store';
import { Info, AlertTriangle, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationItemProps {
  key?: React.Key;
  notification: AppNotification;
  onNavigate?: (link: string) => void;
}

export function NotificationItem({ notification, onNavigate }: NotificationItemProps) {
  const { markAsRead, deleteNotification } = useNotificationStore();

  const getIcon = () => {
    switch (notification.severity) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    if (notification.isRead) return 'bg-white/50 border-slate-100';
    switch (notification.severity) {
      case 'info': return 'bg-blue-50/50 border-blue-100';
      case 'warning': return 'bg-amber-50/50 border-amber-100';
      case 'error': return 'bg-red-50/50 border-red-100';
      case 'success': return 'bg-emerald-50/50 border-emerald-100';
      default: return 'bg-blue-50/50 border-blue-100';
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return "À l'instant";
    if (diff < 3600) return `${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}j`;
  };

  const handleAction = () => {
    if (!notification.isRead) markAsRead(notification.id);
    if (notification.actionLink && onNavigate) {
      onNavigate(notification.actionLink);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative p-3 rounded-xl border transition-colors group cursor-pointer ${getBgColor()}`}
      onClick={handleAction}
    >
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-0.5 gap-2">
            <h4 className={`text-sm font-semibold truncate ${notification.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
              {notification.title}
            </h4>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">
              {timeAgo(notification.createdAt)}
            </span>
          </div>
          <p className={`text-xs line-clamp-2 ${notification.isRead ? 'text-slate-500' : 'text-slate-700'}`}>
            {notification.message}
          </p>

          {notification.actionLink && (
            <div className="mt-2 text-[11px] font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1">
              Voir les détails &rarr;
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="absolute top-2 right-2 p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-200"
        onClick={(e) => {
          e.stopPropagation();
          deleteNotification(notification.id);
        }}
        aria-label="Supprimer la notification"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {!notification.isRead && (
        <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white -translate-y-1/2"></div>
      )}
    </motion.div>
  );
}
