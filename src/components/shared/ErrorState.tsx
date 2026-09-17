import React from 'react';
import { AlertTriangle, ServerCrash, ShieldAlert, FileWarning, Activity, DatabaseZap } from 'lucide-react';
import { ErrorType } from '../../types/error';

interface ErrorStateProps {
  type: ErrorType;
  message?: string;
  correlationId?: string;
  onRetry?: () => void;
}

const getErrorConfig = (type: ErrorType) => {
  switch (type) {
    case 'ServiceUnavailable':
      return { icon: ServerCrash, title: 'Service Unavailable', color: 'text-red-500' };
    case 'SyncUnavailable':
      return { icon: DatabaseZap, title: 'Sync Unavailable', color: 'text-orange-500' };
    case 'ValidationFailed':
      return { icon: FileWarning, title: 'Validation Failed', color: 'text-yellow-500' };
    case 'AuthorizationDenied':
      return { icon: ShieldAlert, title: 'Authorization Denied', color: 'text-red-600' };
    case 'RecoveryRequired':
      return { icon: Activity, title: 'Recovery Required', color: 'text-orange-600' };
    case 'Unexpected':
    default:
      return { icon: AlertTriangle, title: 'Unexpected Error', color: 'text-red-500' };
  }
};

export const ErrorState: React.FC<ErrorStateProps> = ({ type, message, correlationId, onRetry }) => {
  const config = getErrorConfig(type);
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800 rounded-xl border border-slate-700 shadow-xl max-w-md w-full mx-auto">
      <div className={`p-4 rounded-full bg-slate-700/50 mb-4 ${config.color}`}>
        <Icon size={48} />
      </div>
      <h2 className="text-xl font-bold text-slate-100 mb-2">{config.title}</h2>

      {message && (
        <p className="text-slate-400 text-center mb-6">
          {message}
        </p>
      )}

      {correlationId && (
        <div className="bg-slate-900 rounded p-3 mb-6 w-full text-left font-mono text-xs text-slate-500 break-all">
          <span className="text-slate-400 font-semibold block mb-1">Correlation ID:</span>
          {correlationId}
        </div>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};
