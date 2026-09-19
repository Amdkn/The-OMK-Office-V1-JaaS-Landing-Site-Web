import React, { useEffect } from 'react';
import { appEventBus, AppEventPayload } from '../../lib/appEventBus';
import { useNotificationStore, NotificationSeverity } from '../../stores/notifications/notification.store';
import { useUser } from '../../contexts/UserContext';

export function NotificationAdapter() {
  const { addNotification } = useNotificationStore();
  const { currentUser } = useUser();

  useEffect(() => {
    const handleEvent = (event: AppEventPayload) => {
      // Map domain events to user-friendly notifications based on PRD-044
      let title = '';
      let message = '';
      let severity: NotificationSeverity = 'info';
      let actionLink = undefined;

      switch (event.type) {
        case 'EVENT_INTAKE_BATCH_LOADED':
          title = 'Nouveau lot Intake chargé';
          message = `Le lot ${event.data.batchId || ''} est prêt pour l'adjudication.`;
          severity = 'info';
          actionLink = '#intake';
          break;
        case 'EVENT_CHRONO_VALIDATED':
          title = 'Chrono Validé';
          message = `Document ${event.data.docId || ''} a été validé.`;
          severity = 'success';
          actionLink = '#chrono';
          break;
        case 'EVENT_LEGAL_BRIEF_COMPILED':
          title = 'Brief Légal Compilé';
          message = `Le brief pour le dossier ${event.data.caseId || ''} est prêt.`;
          severity = 'success';
          actionLink = '#brief';
          break;
        case 'EVENT_SESSION_CHANGED':
          // Optionally ignore or log session changes if not highly relevant
          return;
        case 'EVENT_NOTIFICATION_RECEIVED':
          // Pass-through for generic push notifications
          title = event.data.title || 'Nouvelle Notification';
          message = event.data.message || '';
          severity = event.data.severity || 'info';
          actionLink = event.data.actionLink;
          break;
        default:
          title = `Événement Système: ${event.type}`;
          message = 'Un événement système a été enregistré.';
          severity = 'info';
      }

      addNotification({
        id: `${event.type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title,
        message,
        severity,
        actionLink,
        tenantId: event.data.tenantId || undefined // Allow backend to specify tenant scope
      });
    };

    const unsubscribeBus = appEventBus.subscribe('EVENT_INTAKE_BATCH_LOADED', handleEvent);
    const unsubscribeBus2 = appEventBus.subscribe('EVENT_CHRONO_VALIDATED', handleEvent);
    const unsubscribeBus3 = appEventBus.subscribe('EVENT_LEGAL_BRIEF_COMPILED', handleEvent);
    const unsubscribeBus4 = appEventBus.subscribe('EVENT_NOTIFICATION_RECEIVED', handleEvent);

    return () => {
      unsubscribeBus();
      unsubscribeBus2();
      unsubscribeBus3();
      unsubscribeBus4();
    };
  }, [addNotification, currentUser]);

  // Headless component
  return null;
}
