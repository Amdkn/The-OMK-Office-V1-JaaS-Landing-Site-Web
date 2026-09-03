// Event Bus for OMK Mobile OS Applications
export type AppEventType = 
  | 'EVENT_INTAKE_BATCH_LOADED'
  | 'EVENT_CHRONO_VALIDATED'
  | 'EVENT_LEGAL_BRIEF_COMPILED'
  | 'EVENT_SESSION_CHANGED'
  | 'EVENT_NOTIFICATION_RECEIVED';

export interface AppEventPayload {
  type: AppEventType;
  timestamp: string;
  sourceApp: string;
  data: Record<string, any>;
}

type EventCallback = (event: AppEventPayload) => void;

class AppEventBusService {
  private listeners: Map<AppEventType, Set<EventCallback>> = new Map();
  private history: AppEventPayload[] = [];

  constructor() {
    // Seed initial event
    this.history.push({
      type: 'EVENT_SESSION_CHANGED',
      timestamp: new Date().toLocaleTimeString(),
      sourceApp: 'SystemKernel',
      data: { status: 'INITIALIZED', role: 'founder' }
    });
  }

  subscribe(eventType: AppEventType, callback: EventCallback): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);

    // Return unbind function
    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  emit(type: AppEventType, sourceApp: string, data: Record<string, any>): AppEventPayload {
    const payload: AppEventPayload = {
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      sourceApp,
      data
    };

    this.history.unshift(payload);
    if (this.history.length > 50) this.history.pop();

    const callbacks = this.listeners.get(type);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(payload);
        } catch (err) {
          console.error('[AppEventBus] Error in callback', err);
        }
      });
    }

    return payload;
  }

  getHistory(): AppEventPayload[] {
    return [...this.history];
  }
}

export const appEventBus = new AppEventBusService();
