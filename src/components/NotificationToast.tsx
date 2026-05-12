/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Bell, X } from 'lucide-react';
import { NotificationPayload } from '../hooks/useNotifications';

interface ToastProps {
  notification: NotificationPayload | null;
  onDismiss: () => void;
}

export function NotificationToast({ notification, onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="fixed top-6 left-4 right-4 z-[9999] flex justify-center pointer-events-none"
        >
          <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-4 shadow-2xl flex items-start gap-4 pointer-events-auto">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <Bell size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-white truncate">
                  {notification.title}
                </h4>
                <span className="text-xs font-mono text-zinc-500">{notification.time}</span>
              </div>
              <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                {notification.message}
              </p>
            </div>
            <button 
              onClick={onDismiss}
              className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
