'use client';

import React, { useState } from 'react';
import { CinematicNarrativeExperience } from '@/components/CinematicNarrativeExperience';
import { PersistentDock } from '@/components/PersistentDock';

export default function Home() {
  const [activeScene, setActiveScene] = useState('scene-1');

  const handleSelectScene = (sceneId: string) => {
    setActiveScene(sceneId);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (sceneId === 'scene-1') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sceneId === 'scene-2') {
      window.scrollTo({ top: scrollHeight * 0.23, behavior: 'smooth' });
    } else if (sceneId === 'scene-3') {
      window.scrollTo({ top: scrollHeight * 0.40, behavior: 'smooth' });
    } else if (sceneId === 'scene-4') {
      window.scrollTo({ top: scrollHeight * 0.57, behavior: 'smooth' });
    } else if (sceneId === 'scene-5') {
      window.scrollTo({ top: scrollHeight * 0.74, behavior: 'smooth' });
    } else if (sceneId === 'scene-6') {
      window.scrollTo({ top: scrollHeight * 0.96, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050608] text-[#F8FAFC]">
      {/* CONTINUOUS CINEMATIC SEQUENCE: SCENES 1, 2, AND 3 */}
      <CinematicNarrativeExperience onSceneChange={setActiveScene} />

      {/* PERSISTENT FLOATING NAVIGATION DOCK */}
      <PersistentDock
        activeScene={activeScene}
        onSelectScene={handleSelectScene}
      />
    </main>
  );
}
