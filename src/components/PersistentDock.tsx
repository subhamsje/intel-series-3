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
      <nav className="flex items-center gap-1 p-1 rounded-full bg-[#080b12]/90 backdrop-blur-2xl border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.8)] text-xs text-[#94A3B8]">
        {/* Intel Brand Mark Accent */}
        <div className="flex items-center gap-1.5 pl-2.5 pr-2 py-0.5 text-[10px] font-mono tracking-wider text-slate-400 border-r border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
          <span className="font-semibold text-slate-200">INTEL</span>
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
                className={`relative px-3.5 py-1 rounded-full text-[11px] font-sans tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {item.label}

                {/* Smooth spring active pill */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-indicator"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20 -z-10 shadow-sm"
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
