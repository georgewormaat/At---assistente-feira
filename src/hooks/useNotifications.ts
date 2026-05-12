/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AGENDA, AgendaItem } from '../data/conacData';

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  time: string;
}

export function useNotifications() {
  const [activeNotification, setActiveNotification] = useState<NotificationPayload | null>(null);
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set());

  const showNotification = useCallback((payload: NotificationPayload) => {
    setActiveNotification(payload);
    // Auto-hide after 10 seconds
    setTimeout(() => setActiveNotification(null), 10000);
  }, []);

  const testNotification = () => {
    showNotification({
      id: 'test-' + Date.now(),
      title: 'Teste de Notificação',
      message: 'O evento começará em 5 minutos!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

      AGENDA.forEach((item: AgendaItem) => {
        const itemDate = new Date(item.timestamp);
        
        // If event is exactly 5 minutes away (or within a 30s window)
        const diffMs = itemDate.getTime() - now.getTime();
        const diffMins = diffMs / 60000;

        if (diffMins > 0 && diffMins <= 5 && !notifiedIds.has(item.id)) {
          showNotification({
            id: item.id,
            title: 'Lembrete de Atividade',
            message: `${item.title} começa em breve no ${item.location}.`,
            time: item.time
          });
          setNotifiedIds(prev => new Set(prev).add(item.id));
        }
      });
    };

    const interval = setInterval(checkSchedule, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [notifiedIds, showNotification]);

  return { activeNotification, dismissNotification: () => setActiveNotification(null), testNotification };
}
