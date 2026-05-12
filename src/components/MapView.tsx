/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import mapImage from './Planta Original CONAC.png';

export function MapView() {
  return (
    <div className="relative w-full h-[calc(100vh-100px)] flex flex-col gap-2">
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-2xl font-bold tracking-tight">Mapa do Evento</h2>
        <p className="text-xs text-zinc-400">Arraste para mover, use pinça ou botões para zoom.</p>
      </div>
      
      <div className="flex-1 relative overflow-hidden rounded-[32px] bg-zinc-900 shadow-inner">
        <TransformWrapper
          initialScale={0.4}
          minScale={0.1}
          maxScale={5}
          centerOnInit
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Controls */}
              <div className="absolute right-4 bottom-20 z-10 flex flex-col gap-2">
                <button
                  onClick={() => zoomIn()}
                  className="p-3 glass-card hover:scale-105 active:scale-95 transition-transform"
                >
                  <ZoomIn size={24} />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="p-3 glass-card hover:scale-105 active:scale-95 transition-transform"
                >
                  <ZoomOut size={24} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-3 glass-card hover:scale-105 active:scale-95 transition-transform"
                >
                  <RotateCcw size={24} />
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
                contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={mapImage}
                  alt="Planta do Evento"
                  className="max-w-[4000px] w-auto h-auto rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
