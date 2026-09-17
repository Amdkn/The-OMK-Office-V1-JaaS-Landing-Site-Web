import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundary } from '../src/components/shared/ErrorBoundary';
import { ErrorState } from '../src/components/shared/ErrorState';
import { OMKError } from '../src/types/error';
import { renderHook } from '@testing-library/react';
import { useMonitoring } from '../src/hooks/useMonitoring';

// Mock components to throw errors
const ThrowOMKError = () => {
  throw new OMKError('Simulated Service Unavailable', 'ServiceUnavailable', 'cor-1234');
};

const ThrowGenericError = () => {
  throw new Error('Generic error occurred');
};

describe('Observability & Error UX', () => {

  beforeEach(() => {
    // Suppress console.error for clean test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('ErrorBoundary', () => {
    it('should catch generic errors and display default Unexpected Error', () => {
      render(
        <ErrorBoundary>
          <ThrowGenericError />
        </ErrorBoundary>
      );
      expect(screen.getByText('Unexpected Error')).toBeDefined();
      expect(screen.getByText('Generic error occurred')).toBeDefined();
    });

    it('should catch OMKErrors and display specific error state with correlation ID', () => {
      render(
        <ErrorBoundary>
          <ThrowOMKError />
        </ErrorBoundary>
      );
      expect(screen.getByText('Service Unavailable')).toBeDefined();
      expect(screen.getByText('Simulated Service Unavailable')).toBeDefined();
      expect(screen.getByText('Correlation ID:')).toBeDefined();
      expect(screen.getByText('cor-1234')).toBeDefined();
    });
  });

  describe('ErrorState', () => {
    it('should call onRetry when retry button is clicked', () => {
      const onRetryMock = vi.fn();
      render(
        <ErrorState
          type="SyncUnavailable"
          message="Offline"
          onRetry={onRetryMock}
        />
      );

      const retryBtn = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryBtn);

      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('useMonitoring Hook', () => {
    it('should output structured JSON on log', () => {
      const { result } = renderHook(() => useMonitoring());

      result.current.log('info', 'Test event', { userId: 1 });

      expect(console.log).toHaveBeenCalledTimes(1);
      const logStr = vi.mocked(console.log).mock.calls[0][0] as string;
      const logData = JSON.parse(logStr);

      expect(logData.level).toBe('info');
      expect(logData.message).toBe('Test event');
      expect(logData.context.userId).toBe(1);
      expect(logData.timestamp).toBeDefined();
    });

    it('should redact sensitive information', () => {
      const { result } = renderHook(() => useMonitoring());

      result.current.log('error', 'Auth failed', {
        password: 'supersecretpass',
        token: 'jwt.token.123',
        nested: { secretKey: 'xyz' },
        safeField: 'hello'
      });

      expect(console.error).toHaveBeenCalledTimes(1);
      const logStr = vi.mocked(console.error).mock.calls[0][0] as string;
      const logData = JSON.parse(logStr);

      expect(logData.context.password).toBe('[REDACTED]');
      expect(logData.context.token).toBe('[REDACTED]');
      expect(logData.context.nested.secretKey).toBe('[REDACTED]');
      expect(logData.context.safeField).toBe('hello');
    });
  });
});
