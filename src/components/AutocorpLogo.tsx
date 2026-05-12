/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from '../lib/utils';
export function AutocorpLogo({ className, reduced = false }: { className?: string, reduced?: boolean }) {
  const src = reduced ? "icon.png" : "logo.png";
  
  return (
    <img 
      src={src} 
      alt="Autocorp Logo" 
      className={cn("h-full w-auto object-contain", className)}
      onError={(e) => {
        // Fallback if images are missing
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const fallback = document.createElement('span');
          fallback.className = 'text-blue-400 font-black italic text-xl';
          fallback.innerText = 'AUTOCORP';
          parent.appendChild(fallback);
        }
      }}
    />
  );
}
