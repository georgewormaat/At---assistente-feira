/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { 
  AGENDA, 
  REMINDERS, 
  TRAVEL_TIPS, 
  HOTEL_GUESTS, 
  INCLUSIONS, 
  FLIGHTS,
  AgendaItem 
} from '../data/conacData';
import { cn } from '../lib/utils';

import { AutocorpLogo } from './AutocorpLogo';

export function HomeView({ onTestNotification }: { onTestNotification: () => void }) {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <header className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-12"
        >
          <AutocorpLogo />
        </motion.div>
      </header>

      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold px-1">Informações Importantes</h3>
        <div className="flex flex-col gap-3">
          <div className="glass-card p-4 border-l-4 border-l-blue-500 flex gap-3 items-start">
            <Icons.Sticker className="text-blue-400 shrink-0" size={20} />
            <p className="text-sm font-medium">Uso do crachá é obrigatório em todas as áreas.</p>
          </div>
          <div className="glass-card p-4 border-l-4 border-l-autocorp-red flex gap-3 items-start">
            <Icons.Lock className="text-autocorp-red shrink-0" size={20} />
            <p className="text-sm font-medium">Resort Royal Palm Plaza é restrito a hóspedes.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold px-1">Lembretes Rápidos</h3>
        <div className="grid grid-cols-2 gap-4">
          {REMINDERS.map((reminder) => {
            const Icon = (Icons as any)[reminder.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={reminder.id}
                whileHover={{ y: -4 }}
                className="glass-card p-5 flex flex-col gap-3"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-50">{reminder.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{reminder.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-semibold">Configurações</h3>
        </div>
        <button
          onClick={onTestNotification}
          className="glass-card p-5 flex items-center justify-between group hover:border-autocorp-blue transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icons.BellRing size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold">Testar Notificações</h4>
              <p className="text-xs text-zinc-400">Simular lembrete de 5 minutos</p>
            </div>
          </div>
          <Icons.ChevronRight className="text-zinc-400" />
        </button>
      </section>
    </div>
  );
}

export function AgendaView() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const updateActive = () => {
      const now = new Date();
      /* 
         For testing/reviewing: since the system time is 2026-05-12 
         we might not be in the agenda days yet. 
      */
      const currentItem = AGENDA.find((item, index) => {
        const itemDate = new Date(item.timestamp);
        const nextItem = AGENDA[index + 1];
        if (!nextItem) return now >= itemDate;
        const nextItemDate = new Date(nextItem.timestamp);
        return now >= itemDate && now < nextItemDate;
      });
      setActiveId(currentItem?.id || null);
    };

    updateActive();
    const interval = setInterval(updateActive, 1000 * 30); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const groupedByDay = AGENDA.reduce((acc, item) => {
    const day = new Date(item.timestamp).getDate();
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<number, AgendaItem[]>);

  const scrollToDay = (day: string) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToNow = () => {
    if (activeId) {
      const element = document.getElementById(`item-${activeId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // If no active item, scroll to the first day today's date if possible
      const today = new Date().getDate();
      if (groupedByDay[today]) {
        scrollToDay(today.toString());
      } else {
        scrollToDay(Object.keys(groupedByDay)[0]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold tracking-tight">Cronograma</h2>
              <p className="text-zinc-400 text-sm">Agenda detalhada do congresso.</p>
            </div>
            <button
              onClick={scrollToNow}
              className="flex items-center gap-2 px-4 py-2 bg-autocorp-blue text-white rounded-full text-xs font-bold shadow-lg shadow-autocorp-blue/20 active:scale-95 transition-all"
            >
              <Icons.Target size={14} />
              Ir para agora
            </button>
          </div>
        </div>
        
        {/* Day Navigation */}
        <div className="flex gap-2 py-2 overflow-x-auto no-scrollbar">
          {Object.keys(groupedByDay).map((day) => (
            <button
              key={day}
              onClick={() => scrollToDay(day)}
              className="px-6 py-2 glass-card border-autocorp-blue/20 hover:border-autocorp-blue text-sm font-bold whitespace-nowrap active:scale-95 transition-all"
            >
              Dia {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {Object.entries(groupedByDay).map(([day, items]) => (
          <div key={day} id={`day-${day}`} className="flex flex-col gap-4 scroll-mt-24">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-blue-500/20">{day}</span>
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Maio</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {items.map((item, index) => {
                const isActive = item.id === activeId;
                return (
                  <motion.div
                    key={item.id}
                    id={`item-${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "glass-card overflow-hidden border-2 transition-all duration-500",
                      isActive 
                        ? "border-blue-600 bg-blue-500/10 ring-4 ring-blue-500/10" 
                        : "border-transparent"
                    )}
                  >
                    <div className="p-5 flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className={cn(
                          "font-mono font-bold text-sm transition-colors",
                          isActive ? "text-blue-400 scale-110" : "text-zinc-600"
                        )}>{item.time}</span>
                        <div className={cn(
                          "w-px flex-1 my-2 transition-colors",
                          isActive ? "bg-blue-500" : "bg-zinc-800"
                        )} />
                        {isActive && (
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                            item.category === 'Palestra' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                            item.category === 'Workshop' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                            item.category === 'Lazer' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                            item.category === 'Refeição' && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          )}>
                            {item.category}
                          </span>
                          {item.track && (
                            <span className={cn(
                               "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                               item.track === 'GESTÃO' && "bg-yellow-400 text-black",
                               item.track === 'CONAEC' && "bg-autocorp-red text-white",
                               item.track === 'OUTROS TEMAS' && "bg-sky-400 text-black",
                               item.track === 'VENDAS' && "bg-green-500 text-white"
                            )}>
                              {item.track}
                            </span>
                          )}
                        </div>
                        <h4 className={cn(
                          "text-lg font-bold leading-snug transition-colors",
                          isActive ? "text-blue-400" : "text-zinc-100"
                        )}>{item.title}</h4>
                        {item.speaker && (
                          <p className="text-sm font-medium text-white flex items-center gap-1">
                            <Icons.User size={14} className="text-blue-400" /> {item.speaker}
                          </p>
                        )}
                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                          <Icons.MapPin size={12} /> {item.location}
                        </p>
                        {item.description && (
                          <p className={cn(
                            "text-xs font-medium mt-2 p-2 rounded-xl border border-dashed transition-colors",
                            isActive 
                              ? "bg-blue-500/5 text-blue-300 border-blue-500/20" 
                              : "text-zinc-400 bg-zinc-800/50 border-zinc-700"
                          )}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TravelView() {
  return (
    <div className="flex flex-col gap-12 pb-12">
       <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Viagem & Dicas</h2>
        <p className="text-zinc-400">Informações imprescindíveis para sua estadia.</p>
      </div>

      {/* Flights Section */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold px-1 flex items-center gap-2">
          <Icons.Plane className="text-blue-400" /> Seus Voos (Azul)
        </h3>
        <div className="flex flex-col gap-6">
          {FLIGHTS.map((flight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex justify-between items-center text-white",
                flight.type === 'Ida' ? "bg-autocorp-blue" : "bg-zinc-800"
              )}>
                <span>Voo de {flight.type}</span>
                <span className="opacity-80">{flight.date}</span>
              </div>
              
              <div className="p-5 flex flex-col gap-6">
                {/* Visual Route */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-blue-400 leading-none">{flight.originCode}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{flight.origin}</span>
                    <span className="text-lg font-mono font-bold mt-2">{flight.departureTime}</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center gap-1 opacity-40">
                    <div className="w-full h-px border-t-2 border-dashed border-zinc-700 relative">
                      <Icons.Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Direto</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-blue-400 leading-none">{flight.destinationCode}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{flight.destination}</span>
                    <span className="text-lg font-mono font-bold mt-2">{flight.arrivalTime}</span>
                  </div>
                </div>

                {/* Important Times */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-autocorp-red/5 dark:bg-autocorp-red/10 border border-autocorp-red/20 rounded-xl p-3 flex flex-col gap-1 ring-4 ring-autocorp-red/5">
                    <span className="text-[10px] font-bold text-autocorp-red uppercase tracking-wider flex items-center gap-1">
                      <Icons.Clock size={10} /> Embarque
                    </span>
                    <span className="text-2xl font-mono font-black text-autocorp-red">{flight.boardingTime}</span>
                  </div>
                  <div className="bg-zinc-800 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Icons.MapPin size={10} /> Aeroporto
                    </span>
                    <span className="text-xs font-bold leading-tight">{flight.arrivalRecommendation}</span>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="flex flex-col gap-3 pt-3 border-t border-zinc-800">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">Voo</span>
                      <span className="font-bold">{flight.flightNumber}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">Localizador</span>
                      <span className="font-black text-blue-400 font-mono">{flight.locator}</span>
                    </div>
                  </div>
                  <p className="text-[10px] bg-zinc-950 p-2 rounded-lg text-zinc-500 font-semibold italic text-center">
                    {flight.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guest List section */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold px-1 flex items-center gap-2">
          <Icons.Users className="text-blue-400" /> Hóspedes Autocorp
        </h3>
        <div className="flex flex-col gap-4">
          {HOTEL_GUESTS.map((h, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.01 }}
              className="glass-card p-5 border-l-4 border-l-blue-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-blue-400 uppercase text-sm tracking-widest">{h.hotel}</h4>
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full font-bold">{h.room}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {h.guests.map((g, gi) => (
                  <span key={gi} className="text-sm font-semibold bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inclusions section */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold px-1 flex items-center gap-2">
          <Icons.CheckCircle2 className="text-emerald-500" /> Inscrições Plenas
        </h3>
        <div className="glass-card p-6 bg-emerald-500/10 border-emerald-500/20">
          <ul className="flex flex-col gap-4">
            {INCLUSIONS.map((text, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                <span className={cn(
                  "leading-relaxed",
                  text.includes('AVISO') ? "text-autocorp-red font-bold" : "text-zinc-300"
                )}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-4">
        {TRAVEL_TIPS.map((tip, index) => {
          const Icon = (Icons as any)[tip.icon] || Icons.Info;
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Icon size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">{tip.title}</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {tip.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-card p-6 border-l-4 border-l-autocorp-red">
        <h4 className="flex items-center gap-2 font-bold text-autocorp-red mb-2 text-lg">
          <Icons.AlertTriangle size={24} /> Atenção
        </h4>
        <p className="text-sm text-zinc-400 leading-relaxed font-medium">
          O check-out em todos os hotéis do complexo Royal passa a ser até às 14h. 
          Você deve confirmar antecipadamente seu traslado com a Agência Shift.
        </p>
      </div>
    </div>
  );
}
