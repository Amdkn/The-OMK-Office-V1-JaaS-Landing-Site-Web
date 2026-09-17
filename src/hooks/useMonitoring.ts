import { useCallback } from 'react';

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

const REDACTED_KEYS = ['password', 'token', 'secret', 'authorization', 'creditCard'];

const redactSensitiveData = (data: any): any => {
  if (data === null || data === undefined) return data;

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(redactSensitiveData);
    }

    const redacted: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (REDACTED_KEYS.some(redactedKey => key.toLowerCase().includes(redactedKey.toLowerCase()))) {
        redacted[key] = '[REDACTED]';
      } else {
        redacted[key] = redactSensitiveData(value);
      }
    }
    return redacted;
  }

  return data;
};

export const useMonitoring = () => {
  const log = useCallback((level: LogLevel, message: string, context?: LogContext) => {
    const timestamp = new Date().toISOString();
    const safeContext = context ? redactSensitiveData(context) : undefined;

    const logEntry = {
      timestamp,
      level,
      message,
      context: safeContext
    };

    // Output structured JSON
    if (level === 'error') {
      console.error(JSON.stringify(logEntry));
    } else if (level === 'warn') {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }, []);

  const trackMetric = useCallback((name: string, value: number, tags?: Record<string, string>) => {
    const metricEntry = {
      type: 'metric',
      name,
      value,
      tags,
      timestamp: new Date().toISOString()
    };

    console.log(JSON.stringify(metricEntry));
  }, []);

  return { log, trackMetric };
};
