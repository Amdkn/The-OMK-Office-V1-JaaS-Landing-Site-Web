import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './ErrorState';
import { OMKError } from '../../types/error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const error = this.state.error;
      let type: any = 'Unexpected';
      let correlationId: string | undefined = undefined;

      if (error instanceof OMKError) {
        type = error.type;
        correlationId = error.correlationId;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
          <ErrorState
            type={type}
            message={error?.message || "An unexpected error occurred."}
            correlationId={correlationId}
            onRetry={() => window.location.reload()}
          />
        </div>
      );
    }

    return (this as any).props.children;
  }
}
