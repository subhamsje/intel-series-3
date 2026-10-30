'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface DockItem {
  id: string;
  label: string;
}

// Only implemented scenes are shown per directive
const IMPLEMENTED_SCENES: DockItem[] = [
  { id: 'scene-1', label: 'Reveal' },
  { id: 'scene-2', label: 'Foundation' },
  { id: 'scene-3', label: 'Core Ultra' },
  { id: 'scene-4', label: 'Core' },
  { id: 'scene-5', label: 'Your Choice' },
  { id: 'scene-6', label: 'Resolution' },
];

interface PersistentDockProps {
  activeScene?: string;
  onSelectScene?: (id: string) => void;
}

export function PersistentDock({
  activeScene = 'scene-1',
  onSelectScene,
}: PersistentDockProps) {
  return (
    <aside
      aria-label="Scene navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <nav className="flex items-center gap-1 p-1 rounded-full bg-[#060B16]/80 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(5,147,198,0.18)] text-xs text-[#94A3B8]">
        {/* Intel Brand Mark Accent with Electric Sky & Hot Pink Accents */}
        <div className="flex items-center gap-1.5 pl-3 pr-2.5 py-0.5 text-[10px] font-mono tracking-wider text-slate-300 border-r border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0593C6] shadow-[0_0_8px_#0593C6]" />
          <span className="font-bold tracking-widest text-[#FCFFFF]">INTEL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D83995] shadow-[0_0_8px_#D83995]" />
        </div>

        {/* Implemented Scene Buttons */}
        <div className="flex items-center gap-1">
          {IMPLEMENTED_SCENES.map((item) => {
            const isActive = activeScene === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectScene?.(item.id)}
                aria-current={isActive ? 'step' : undefined}
                className={`relative px-3.5 py-1 rounded-full text-[11px] font-sans tracking-tight whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0593C6] ${
                  isActive
                    ? 'text-[#FCFFFF] font-semibold'
                    : 'text-slate-400 hover:text-[#FCFFFF] hover:bg-white/[0.06]'
                }`}
              >
                {item.label}

                {/* Iridescent active pill with chromatic blur */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0593C6]/25 via-white/[0.12] to-[#D83995]/25 border border-white/30 -z-10 shadow-[0_0_16px_rgba(5,147,198,0.25)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
