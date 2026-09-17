export type ErrorType =
  | 'ServiceUnavailable'
  | 'SyncUnavailable'
  | 'ValidationFailed'
  | 'AuthorizationDenied'
  | 'RecoveryRequired'
  | 'Unexpected';

export interface AppError extends Error {
  type: ErrorType;
  correlationId?: string;
  context?: Record<string, any>;
}

export class OMKError extends Error implements AppError {
  type: ErrorType;
  correlationId?: string;
  context?: Record<string, any>;

  constructor(message: string, type: ErrorType = 'Unexpected', correlationId?: string, context?: Record<string, any>) {
    super(message);
    this.name = 'OMKError';
    this.type = type;
    this.correlationId = correlationId;
    this.context = context;
  }
}
