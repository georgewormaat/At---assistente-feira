/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* 
  SECURITY NOTICE FOR GITHUB DISTRIBUTION:
  - This app is a pure Client-Side SPA. No sensitive credentials/keys are stored in the source.
  - All event data is static and served via 'conacData.ts'.
  - External links use 'rel="noopener noreferrer"'.
  - Service Worker handles offline caching securely.
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Calendar, Map, Plane, Sun, Moon, MapPin } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';
import { NotificationToast } from './components/NotificationToast';
import { HomeView, AgendaView, TravelView } from './components/Views';
import { MapView } from './components/MapView';
import { AutocorpLogo } from './components/AutocorpLogo';
import { cn } from './lib/utils';

type View = 'home' | 'agenda' | 'map' | 'travel';

export default function App() {
  const { theme } = useTheme();
  const { activeNotification, dismissNotification, testNotification } = useNotifications();
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
          console.log('SW registration failed: ', err);
        });
      });
    }
  }, []);

  const navItems = [
    { id: 'home' as View, icon: Home, label: 'Início' },
    { id: 'agenda' as View, icon: Calendar, label: 'Agenda' },
    { id: 'map' as View, icon: Map, label: 'Mapa' },
    { id: 'travel' as View, icon: Plane, label: 'Viagem' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Top Header Blur */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-zinc-950/60 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="h-8">
            <AutocorpLogo reduced />
          </div>
          <div className="w-px h-6 bg-zinc-800 hidden xs:block" />
          <div className="flex flex-col hidden xs:flex">
            <span className="text-[10px] opacity-60 font-mono tracking-widest uppercase text-zinc-400">Elite Experience</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 px-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {currentView === 'home' && <HomeView onTestNotification={testNotification} />}
            {currentView === 'agenda' && <AgendaView />}
            {currentView === 'map' && <MapView />}
            {currentView === 'travel' && <TravelView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="max-w-md mx-auto glass-card flex items-center justify-around p-2 shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className="relative flex flex-col items-center p-3 transition-colors group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-blue-500/20 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <item.icon 
                  size={24} 
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-200"
                  )} 
                />
                <span className={cn(
                  "relative z-10 text-[10px] font-bold mt-1 transition-colors duration-300",
                  isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-200"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlays */}
      <NotificationToast 
        notification={activeNotification} 
        onDismiss={dismissNotification} 
      />
      
      {/* Floating Action Hint */}
      <div className="fixed bottom-24 right-6 pointer-events-none opacity-20 animate-pulse">
        <MapPin size={48} className="text-blue-500 rotate-12" />
      </div>
    </div>
  );
}
