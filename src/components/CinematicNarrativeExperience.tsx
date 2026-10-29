'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { ArrowDown, ArrowRight, Check, RotateCcw, Compass, Sparkles } from 'lucide-react';

type S3BeatType = 'create' | 'play' | 'build';
type S4MomentType = 'make' | 'happen' | 'move';

interface S3BeatData {
  id: S3BeatType;
  index: string;
  tag: string;
  title: string;
  description: string;
}

interface S4MomentData {
  id: S4MomentType;
  index: string;
  tag: string;
  title: string;
  description: string;
}

interface PriorityItem {
  id: string;
  label: string;
  sub: string;
  category: 'ultra' | 'core';
}

const PRIORITIES: PriorityItem[] = [
  {
    id: 'creation',
    label: 'Demanding Creation & 3D',
    sub: '4K/8K timelines, complex rendering & effects',
    category: 'ultra',
  },
  {
    id: 'gaming',
    label: 'High-FPS & AAA Gaming',
    sub: 'High-fidelity graphics & sustained frame pacing',
    category: 'ultra',
  },
  {
    id: 'ai-dev',
    label: 'Local AI & Developer Builds',
    sub: 'On-device neural execution & heavy compiling',
    category: 'ultra',
  },
  {
    id: 'multitasking',
    label: 'Responsive Daily Multitasking',
    sub: 'Fluid browser tabs, spreadsheets, video calls & docs',
    category: 'core',
  },
  {
    id: 'mobility',
    label: 'All-Day Mobility & Battery Focus',
    sub: 'Lightweight portability & quiet, balanced endurance',
    category: 'core',
  },
  {
    id: 'budget',
    label: 'Accessible Price-to-Performance',
    sub: 'Modern computing capabilities across diverse budgets',
    category: 'core',
  },
];

const S3_BEATS: S3BeatData[] = [
  {
    id: 'create',
    index: '01',
    tag: 'WORKLOAD 01 // COMPUTATIONAL CREATION',
    title: 'Demanding 3D synthesis & expressive timelines.',
    description:
      'Continuous multi-layer rendering, complex procedural geometry, and uncompromised real-time timeline responsiveness.',
  },
  {
    id: 'play',
    index: '02',
    tag: 'WORKLOAD 02 // VISUAL IMMERSION',
    title: 'Expansive virtual spaces & sustained frame pacing.',
    description:
      'Hardware-accelerated geometry, ray-traced spatial depth, and persistent responsiveness across demanding graphical worlds.',
  },
  {
    id: 'build',
    index: '03',
    tag: 'WORKLOAD 03 // LOCAL INTELLIGENCE',
    title: 'Parallel compilation & zero-latency on-device AI.',
    description:
      'Multi-threaded code builds, local machine intelligence without cloud lag, and relentless concurrent execution.',
  },
];

const S4_MOMENTS: S4MomentData[] = [
  {
    id: 'make',
    index: '01',
    tag: 'MOMENT 01 // MAKE SOMETHING',
    title: 'Turning inspiration into tangible creation.',
    description:
      'Fluid photo editing, creative design layouts, and compelling presentations that keep immediate pace with your ideas.',
  },
  {
    id: 'happen',
    index: '02',
    tag: 'MOMENT 02 // MAKE THINGS HAPPEN',
    title: 'Effortless momentum across your everyday work.',
    description:
      'Instant responsiveness across coursework, multitasking workspaces, and seamless communication without hesitation.',
  },
  {
    id: 'move',
    index: '03',
    tag: 'MOMENT 03 // KEEP MOVING',
    title: 'Purposeful technology engineered to stay with you.',
    description:
      'Right-sized on-device intelligence and battery-conscious efficiency tailored for all-day laptops on the move.',
  },
];

export function CinematicNarrativeExperience({
  onSceneChange,
}: {
  onSceneChange?: (sceneId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [s3ManualBeat, setS3ManualBeat] = useState<S3BeatType | null>(null);
  const [s4ManualMoment, setS4ManualMoment] = useState<S4MomentType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle interactive pointer sheen on processor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [manualPathTab, setManualPathTab] = useState<'ultra' | 'core' | null>(null);
  const [mobilePathTab, setMobilePathTab] = useState<'ultra' | 'core'>('ultra');

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const resetPriorities = () => {
    setSelectedPriorities([]);
    setManualPathTab(null);
  };

  const ultraCount = selectedPriorities.filter((id) =>
    PRIORITIES.find((p) => p.id === id)?.category === 'ultra'
  ).length;

  const coreCount = selectedPriorities.filter((id) =>
    PRIORITIES.find((p) => p.id === id)?.category === 'core'
  ).length;

  // Active focus derived from priority recommendation or manual user toggle
  const activeFocus: 'ultra' | 'core' | 'split' | 'neutral' = manualPathTab
    ? manualPathTab
    : ultraCount === 0 && coreCount === 0
    ? 'neutral'
    : ultraCount > 0 && coreCount === 0
    ? 'ultra'
    : coreCount > 0 && ultraCount === 0
    ? 'core'
    : ultraCount > coreCount
    ? 'ultra'
    : coreCount > ultraCount
    ? 'core'
    : 'split';

  // Automatically sync mobile path tab when a recommendation emerges
  useEffect(() => {
    if (activeFocus === 'ultra') setMobilePathTab('ultra');
    else if (activeFocus === 'core') setMobilePathTab('core');
  }, [activeFocus]);

  const getRecommendationDetails = () => {
    if (activeFocus === 'ultra') {
      return {
        badge: 'RECOMMENDED // INTEL CORE™ ULTRA SERIES 3',
        badgeClass: 'text-[#00C7FD] border-[#0068B5]/40 bg-[#0068B5]/15',
        borderClass: 'border-[#0068B5]/50 shadow-[0_0_35px_rgba(0,104,181,0.22)]',
        accentColor: '#00C7FD',
        title: 'Intel Core™ Ultra Series 3 matches your performance demands.',
        reasoning:
          ultraCount > 0 && coreCount > 0
            ? 'Your workflow includes critical demanding creative, gaming, or AI tasks alongside everyday needs. Core Ultra Series 3 ensures sustained compute headroom and peak multi-threaded throughput, preventing performance bottlenecks.'
            : 'Your priorities center on demanding workloads requiring sustained performance cores, expansive compute headroom, and dedicated deep on-device AI acceleration. Intel Core Ultra Series 3 is engineered for the tasks that ask more of your machine.',
        guidance:
          'When evaluating laptops, look for OEM designs with dedicated dual-fan thermal cooling and high-color-accuracy or high-refresh display options to match your visual workflow.',
      };
    }
    if (activeFocus === 'core') {
      return {
        badge: 'RECOMMENDED // INTEL CORE™ SERIES 3',
        badgeClass: 'text-[#F59E0B] border-[#F59E0B]/40 bg-[#F59E0B]/15',
        borderClass: 'border-[#F59E0B]/50 shadow-[0_0_35px_rgba(245,158,11,0.22)]',
        accentColor: '#F59E0B',
        title: 'Intel Core™ Series 3 is your ideal computing fit.',
        reasoning:
          coreCount > 0 && ultraCount > 0
            ? 'Your daily computing rhythm emphasizes responsive multitasking, all-day mobility, and accessible pricing. Core Series 3 easily handles modern workflows and right-sized AI assistance, making it the most sensible daily investment.'
            : 'Your everyday priorities center on agile responsiveness, all-day portable stamina, and smart price-to-performance value. Core Series 3 delivers the full modern computing experience—including right-sized AI—without unnecessary cost or thermal overhead.',
        guidance:
          'When comparing Core Series 3 laptops, verify that the physical chassis weight, keyboard ergonomics, and battery capacity align with your specific daily on-the-go routine.',
      };
    }
    if (activeFocus === 'split') {
      return {
        badge: 'BALANCED PROFILE // DUAL ALIGNMENT',
        badgeClass: 'text-slate-200 border-white/20 bg-white/10',
        borderClass: 'border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.12)]',
        accentColor: '#38BDF8',
        title: 'Your priorities span both computing directions.',
        reasoning:
          'You have a multi-faceted profile that values both heavy capability and accessible mobile agility. Both families share the verified Intel 18A process technology substrate, engineered into two distinct computing philosophies.',
        guidance:
          'Rule of thumb: If sustained 4K rendering or AAA gaming is non-negotiable, prioritize Core Ultra. If overall laptop cost and portable battery life come first, Core Series 3 delivers modern power with greater accessibility.',
      };
    }
    return {
      badge: 'NEEDS-BASED SELECTOR // EXPLORE BOTH PATHS',
      badgeClass: 'text-slate-400 border-white/10 bg-white/5',
      borderClass: 'border-white/10',
      accentColor: '#94A3B8',
      title: 'Select your priorities above to see tailored recommendations.',
      reasoning:
        'Every user has distinct priorities. Toggle any combination of activities above, or inspect either path below to understand how each processor family is tailored to specific computing needs.',
      guidance:
        'Both processor families are built on Intel 18A process technology, offering two distinct philosophies for modern mobile computing.',
    };
  };

  const recData = getRecommendationDetails();

  // Continuous scroll progress across Scenes 1, 2, 3, 4, 5, and 6
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Track active scene for the dock (Reveal -> Foundation -> Core Ultra -> Core -> Your Choice -> Resolution)
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v < 0.16) {
        onSceneChange?.('scene-1');
      } else if (v < 0.33) {
        onSceneChange?.('scene-2');
      } else if (v < 0.50) {
        onSceneChange?.('scene-3');
      } else if (v < 0.67) {
        onSceneChange?.('scene-4');
      } else if (v < 0.84) {
        onSceneChange?.('scene-5');
      } else {
        onSceneChange?.('scene-6');
      }
    });
  }, [scrollYProgress, onSceneChange]);

  // Determine active beat in Scene 3
  const [s3ScrollBeat, setS3ScrollBeat] = useState<S3BeatType>('create');
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v >= 0.33 && v < 0.50) {
        if (v < 0.38) setS3ScrollBeat('create');
        else if (v < 0.44) setS3ScrollBeat('play');
        else setS3ScrollBeat('build');
      }
    });
  }, [scrollYProgress]);

  // Determine active moment in Scene 4
  const [s4ScrollMoment, setS4ScrollMoment] = useState<S4MomentType>('make');
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v >= 0.50 && v < 0.67) {
        if (v < 0.55) setS4ScrollMoment('make');
        else if (v < 0.61) setS4ScrollMoment('happen');
        else setS4ScrollMoment('move');
      }
    });
  }, [scrollYProgress]);

  const activeS3Beat = s3ManualBeat || s3ScrollBeat;
  const currentS3BeatData = S3_BEATS.find((b) => b.id === activeS3Beat) || S3_BEATS[0];

  const activeS4Moment = s4ManualMoment || s4ScrollMoment;
  const currentS4MomentData = S4_MOMENTS.find((m) => m.id === activeS4Moment) || S4_MOMENTS[0];

  // ================= SCENE VISIBILITY GATES (ZERO CROSS-SCENE BLEED) =================
  const s1Display = useTransform(smoothProgress, (v) => (v <= 0.17 ? 'flex' : 'none'));
  const s2Display = useTransform(smoothProgress, (v) => (v >= 0.15 && v <= 0.33 ? 'flex' : 'none'));
  const s3Display = useTransform(smoothProgress, (v) => (v >= 0.32 && v <= 0.50 ? 'flex' : 'none'));
  const s4Display = useTransform(smoothProgress, (v) => (v >= 0.49 && v <= 0.67 ? 'flex' : 'none'));
  const s5Display = useTransform(smoothProgress, (v) => (v >= 0.66 && v <= 0.84 ? 'flex' : 'none'));
  const s6Display = useTransform(smoothProgress, (v) => (v >= 0.83 ? 'flex' : 'none'));

  // ================= SCENE 1 CHOREOGRAPHY (REVEAL) =================
  const s1Opacity = useTransform(smoothProgress, [0, 0.12, 0.16, 1], [1, 1, 0, 0]);
  const s1Y = useTransform(smoothProgress, [0, 0.12, 0.16, 1], [0, 0, -40, -40]);

  // Scene 1 Light-Path Motif: Originates from processor silicon base and extends horizontally
  const s1PathDraw = useTransform(smoothProgress, [0, 0.08, 0.16, 1], [0.35, 1, 1, 1]);
  const s1PathGlow = useTransform(smoothProgress, [0, 0.12, 0.16, 1], [0.65, 0.9, 0, 0]);

  // ================= PROCESSOR TRANSFORMATIONS ACROSS 6 SCENES =================
  // Desktop:
  // S1: 22%, 0px, 1.02, opacity 1
  // S2: 0%, 50px, 0.82, opacity 1
  // S3: 25%, 0px, 1.02, opacity 1
  // S4: -25%, 0px, 1.02, opacity 1
  // S5: 0%, -175px, 0.36, opacity 0 (Clear decision interface)
  // S6: 0%, 55px, 0.76, opacity 1 (Grand unified resolution anchor)
  const chipTranslateX = useTransform(
    smoothProgress,
    [0, 0.12, 0.19, 0.28, 0.34, 0.45, 0.51, 0.62, 0.68, 0.78, 0.85, 1],
    isMobile
      ? ['0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%']
      : ['22%', '22%', '0%', '0%', '25%', '25%', '-25%', '-25%', '0%', '0%', '0%', '0%']
  );
  const chipTranslateY = useTransform(
    smoothProgress,
    [0, 0.12, 0.19, 0.28, 0.34, 0.45, 0.51, 0.62, 0.68, 0.78, 0.85, 1],
    isMobile
      ? ['90px', '90px', '-45px', '-45px', '-100px', '-100px', '-100px', '-100px', '-210px', '-210px', '55px', '55px']
      : ['0px', '0px', '50px', '50px', '0px', '0px', '0px', '0px', '-175px', '-175px', '55px', '55px']
  );
  const chipScale = useTransform(
    smoothProgress,
    [0, 0.12, 0.19, 0.28, 0.34, 0.45, 0.51, 0.62, 0.68, 0.78, 0.85, 1],
    isMobile
      ? [0.85, 0.85, 0.62, 0.62, 0.65, 0.65, 0.65, 0.65, 0.25, 0.25, 0.65, 0.65]
      : [1.02, 1.02, 0.82, 0.82, 1.02, 1.02, 1.02, 1.02, 0.36, 0.36, 0.76, 0.76]
  );
  const chipOpacity = useTransform(
    smoothProgress,
    [0, 0.64, 0.68, 0.80, 0.85, 1],
    [1, 1, 0, 0, 1, 1]
  );

  // ================= SCENE 2 CHOREOGRAPHY (FOUNDATION) =================
  const s2HeadingOpacity = useTransform(smoothProgress, [0, 0.16, 0.22, 0.29, 0.33, 1], [0, 0, 1, 1, 0, 0]);
  const s2HeadingY = useTransform(smoothProgress, [0, 0.16, 0.22, 0.29, 0.33, 1], [-15, -15, 0, 0, -20, -20]);

  const traceTrunk = useTransform(smoothProgress, [0, 0.16, 0.22, 1], [0, 0, 1, 1]);
  const traceBranches = useTransform(smoothProgress, [0, 0.20, 0.27, 1], [0, 0, 1, 1]);
  const s2DestinationsOpacity = useTransform(smoothProgress, [0, 0.18, 0.24, 0.29, 0.33, 1], [0, 0, 1, 1, 0, 0]);
  const s2DestinationsY = useTransform(smoothProgress, [0, 0.18, 0.24, 0.29, 0.33, 1], [15, 15, 0, 0, -10, -10]);

  // ================= SCENE 3 CHOREOGRAPHY (CORE ULTRA) =================
  const s3EntranceOpacity = useTransform(smoothProgress, [0, 0.33, 0.38, 0.46, 0.50, 1], [0, 0, 1, 1, 0, 0]);
  const s3EntranceY = useTransform(smoothProgress, [0, 0.33, 0.38, 0.46, 0.50, 1], [25, 25, 0, 0, -25, -25]);
  const s3LightPathLength = useTransform(smoothProgress, [0, 0.32, 0.41, 1], [0, 0, 1, 1]);
  const s3AtmosphereGlow = useTransform(smoothProgress, [0, 0.33, 0.38, 0.46, 0.50, 1], [0, 0, 0.85, 0.85, 0, 0]);

  // ================= SCENE 4 CHOREOGRAPHY (CORE SERIES 3) =================
  const s4EntranceOpacity = useTransform(smoothProgress, [0, 0.50, 0.55, 0.63, 0.67, 1], [0, 0, 1, 1, 0, 0]);
  const s4EntranceY = useTransform(smoothProgress, [0, 0.50, 0.55, 0.63, 0.67, 1], [25, 25, 0, 0, -25, -25]);
  const s4AmberLightPath = useTransform(smoothProgress, [0, 0.49, 0.58, 1], [0, 0, 1, 1]);
  const s4AtmosphereGlow = useTransform(smoothProgress, [0, 0.50, 0.55, 0.63, 0.67, 1], [0, 0, 0.85, 0.85, 0, 0]);

  // ================= SCENE 5 CHOREOGRAPHY (YOUR CHOICE) =================
  const s5EntranceOpacity = useTransform(smoothProgress, [0, 0.67, 0.72, 0.80, 0.84, 1], [0, 0, 1, 1, 0, 0]);
  const s5EntranceY = useTransform(smoothProgress, [0, 0.67, 0.72, 0.80, 0.84, 1], [20, 20, 0, 0, -20, -20]);

  // ================= SCENE 6 CHOREOGRAPHY (FINAL MEMORY / RESOLUTION) =================
  const s6EntranceOpacity = useTransform(smoothProgress, [0, 0.84, 0.90, 1], [0, 0, 1, 1]);
  const s6EntranceY = useTransform(smoothProgress, [0, 0.84, 0.90, 1], [25, 25, 0, 0]);
  const s6ConvergenceBeam = useTransform(smoothProgress, [0, 0.83, 0.91, 1], [0, 0, 1, 1]);
  const s6AtmosphereGlow = useTransform(smoothProgress, [0, 0.84, 0.92, 1], [0, 0, 0.85, 0.85]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[740vh] bg-[#040608] text-[#F8FAFC] selection:bg-[#0068B5]/30"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 lg:px-20 pt-6 pb-20 select-none">
        
        {/* MASTHEAD HEADER */}
        <header className="w-full flex items-center justify-between pb-4 border-b border-white/[0.08] z-30">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-7 flex items-center">
              <Image
                src="/assets/intel-logo-white.svg"
                alt="Intel Official Corporate Mark"
                width={80}
                height={28}
                priority
                className="object-contain"
              />
            </div>
            <div className="h-3 w-[1px] bg-white/20" />
            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              Series 3 Architecture
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
            <span className="font-mono text-[10px] text-slate-400 tracking-wider">
              INTEL 18A
            </span>
          </div>
        </header>

        {/* ================= FULL-SCREEN AMBIENT & LIGHT-PATH CANVAS ================= */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          
          {/* SCENE 1: Ambient Horizon Specular Halo behind processor */}
          <motion.div
            style={{ opacity: s1Opacity }}
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[550px] rounded-full bg-radial from-[#0068B5]/20 via-[#0068B5]/5 to-transparent blur-3xl pointer-events-none"
          />

          {/* SCENE 1 MOTIF: Restrained Light Path originating from processor and connecting the scene */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="s1SubstrateBeam" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00C7FD" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#0068B5" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#0068B5" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0068B5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Substrate Line emanating directly from the processor's silicon base across to the headline */}
            <motion.path
              d="M 1200 480 L 100 480"
              stroke="url(#s1SubstrateBeam)"
              strokeWidth="2"
              fill="none"
              style={{
                opacity: s1PathGlow,
                pathLength: s1PathDraw,
              }}
            />

            {/* Downward Transition Line that descends towards the center as user scrolls into Scene 2 */}
            <motion.path
              d="M 720 480 L 720 620"
              stroke="#00C7FD"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              style={{
                opacity: s1PathGlow,
              }}
            />
          </svg>

          {/* SCENE 3: Sapphire Ambient Radial Halo */}
          <motion.div
            style={{ opacity: s3AtmosphereGlow }}
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#0068B5]/25 via-[#0068B5]/5 to-transparent blur-3xl"
          />

          {/* SCENE 4: Warm Amber / Platinum Horizon Radial Halo */}
          <motion.div
            style={{ opacity: s4AtmosphereGlow }}
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-radial from-[#D97706]/20 via-[#F59E0B]/5 to-transparent blur-3xl"
          />

          {/* Full-Screen Continuous Light-Paths (Sapphire for S3, Amber for S4) */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sapphireFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0068B5" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#0068B5" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00C7FD" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="amberFlow" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FEF3C7" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Scene 3 Sapphire Trace flowing right */}
            <motion.path
              d="M 120 400 C 300 400, 450 520, 850 500 S 1200 460, 1400 480"
              stroke="url(#sapphireFlow)"
              strokeWidth="2"
              fill="none"
              style={{
                pathLength: s3LightPathLength,
                opacity: s3EntranceOpacity,
              }}
            />

            {/* Scene 4 Warm Amber/Platinum Trace flowing left */}
            <motion.path
              d="M 1320 400 C 1140 400, 990 520, 590 500 S 240 460, 40 480"
              stroke="url(#amberFlow)"
              strokeWidth="2"
              fill="none"
              style={{
                pathLength: s4AmberLightPath,
                opacity: s4EntranceOpacity,
              }}
            />
          </svg>

          {/* ================= SCENE 3 FULL-BLEED WORKLOAD VECTORS ================= */}
          <AnimatePresence mode="wait">
            {activeS3Beat === 'create' && (
              <motion.div
                key="field-create"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s3EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-35" viewBox="0 0 1440 900" fill="none">
                  <path
                    d="M 600 450 Q 950 180 1300 450 Q 950 720 600 450 Z"
                    stroke="#0068B5"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 700 450 Q 950 250 1200 450 Q 950 650 700 450 Z"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle cx="950" cy="450" r="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <circle cx="950" cy="450" r="220" stroke="rgba(0,104,181,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </motion.div>
            )}

            {activeS3Beat === 'play' && (
              <motion.div
                key="field-play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s3EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-40" viewBox="0 0 1440 900" fill="none">
                  <line x1="0" y1="580" x2="1440" y2="580" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="0" y1="640" x2="1440" y2="640" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="0" y1="720" x2="1440" y2="720" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="950" y1="450" x2="200" y2="900" stroke="rgba(0,104,181,0.6)" strokeWidth="1.5" />
                  <line x1="950" y1="450" x2="550" y2="900" stroke="rgba(0,104,181,0.4)" strokeWidth="1" />
                  <line x1="950" y1="450" x2="950" y2="900" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="950" y1="450" x2="1350" y2="900" stroke="rgba(0,104,181,0.4)" strokeWidth="1" />
                </svg>
              </motion.div>
            )}

            {activeS3Beat === 'build' && (
              <motion.div
                key="field-build"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s3EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-45" viewBox="0 0 1440 900" fill="none">
                  <line x1="550" y1="360" x2="1400" y2="360" stroke="rgba(0,104,181,0.4)" strokeWidth="1.5" />
                  <line x1="550" y1="410" x2="1400" y2="410" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
                  <line x1="550" y1="460" x2="1400" y2="460" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <line x1="550" y1="510" x2="1400" y2="510" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
                  <rect x="750" y="356" width="40" height="8" rx="2" fill="#00C7FD" />
                  <rect x="920" y="406" width="60" height="8" rx="2" fill="#38BDF8" />
                  <rect x="830" y="456" width="30" height="8" rx="2" fill="#FFFFFF" />
                  <rect x="1040" y="506" width="55" height="8" rx="2" fill="#34D399" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= SCENE 4 FULL-BLEED EVERYDAY POSSIBILITY VECTORS ================= */}
          <AnimatePresence mode="wait">
            {activeS4Moment === 'make' && (
              <motion.div
                key="s4-field-make"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s4EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-35" viewBox="0 0 1440 900" fill="none">
                  <rect x="180" y="220" width="320" height="420" rx="24" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="6 6" />
                  <circle cx="340" cy="430" r="160" stroke="rgba(254,243,199,0.15)" strokeWidth="1.2" />
                  <path d="M 120 430 Q 340 180 560 430 Q 340 680 120 430 Z" stroke="rgba(217,119,6,0.35)" strokeWidth="1" />
                  <line x1="80" y1="430" x2="600" y2="430" stroke="rgba(245,158,11,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </motion.div>
            )}

            {activeS4Moment === 'happen' && (
              <motion.div
                key="s4-field-happen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s4EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-40" viewBox="0 0 1440 900" fill="none">
                  <circle cx="340" cy="430" r="190" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
                  <circle cx="340" cy="430" r="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 0 430 C 200 430, 260 280, 480 280 S 760 430, 960 430" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
                  <circle cx="480" cy="280" r="4.5" fill="#FEF3C7" />
                  <circle cx="340" cy="240" r="4.5" fill="#F59E0B" />
                  <circle cx="340" cy="620" r="4.5" fill="#F59E0B" />
                </svg>
              </motion.div>
            )}

            {activeS4Moment === 'move' && (
              <motion.div
                key="s4-field-move"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ opacity: s4EntranceOpacity }}
              >
                <svg className="w-full h-full opacity-45" viewBox="0 0 1440 900" fill="none">
                  <line x1="80" y1="380" x2="900" y2="380" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5" />
                  <line x1="40" y1="430" x2="860" y2="430" stroke="rgba(254,243,199,0.5)" strokeWidth="1.5" />
                  <line x1="100" y1="480" x2="920" y2="480" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" />
                  <rect x="220" y="376" width="50" height="8" rx="2" fill="#F59E0B" />
                  <rect x="420" y="426" width="70" height="8" rx="2" fill="#FEF3C7" />
                  <rect x="310" y="476" width="40" height="8" rx="2" fill="#D97706" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ================= CENTRAL STAGE VIEWPORT ================= */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-auto z-10">
          
          {/* THE AUTHENTIC PROCESSOR ANCHOR (Continuously Transitions Across Scenes 1, 2, 3, 4, 5) */}
          <motion.div
            style={{
              x: chipTranslateX,
              y: chipTranslateY,
              scale: chipScale,
              opacity: chipOpacity,
            }}
            className="relative z-10 will-change-transform flex items-center justify-center"
          >
            {/* Multi-Tile Specular Halo (Adapts dynamically between Sapphire & Warm Amber) */}
            <motion.div
              style={{ opacity: s3AtmosphereGlow }}
              className="absolute -inset-16 bg-radial from-[#0068B5]/30 via-[#0068B5]/10 to-transparent blur-3xl pointer-events-none -z-10"
            />
            <motion.div
              style={{ opacity: s4AtmosphereGlow }}
              className="absolute -inset-16 bg-radial from-[#D97706]/30 via-[#F59E0B]/10 to-transparent blur-3xl pointer-events-none -z-10"
            />
            {/* Scene 6 Dual-Hue Horizon Specular Halo */}
            <motion.div
              style={{ opacity: s6AtmosphereGlow }}
              className="absolute -inset-20 bg-gradient-to-r from-[#0068B5]/30 via-white/[0.08] to-[#F59E0B]/30 blur-3xl pointer-events-none -z-10"
            />

            {/* Seamless Authentic Processor Presentation (Shared 18A Substrate Reality) */}
            <div className="relative group p-1.5 rounded-2xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.95)]">
              <div className="relative w-72 sm:w-88 md:w-[420px] lg:w-[480px] aspect-[16/10] overflow-hidden rounded-xl bg-[#08090C]">
                <Image
                  src="/assets/intel-core-ultra-tiles.jpg"
                  alt="Authentic Intel Multi-Tile Processor Macro Photography"
                  fill
                  sizes="(max-width: 768px) 340px, (max-width: 1200px) 460px, 520px"
                  priority
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Micro Glint / Reflective Specular Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-70"
                  style={{
                    transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)`,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 1 LAYER: REVEAL (DELIBERATE CINEMATIC OPENING) ================= */}
          <motion.div
            style={{ opacity: s1Opacity, y: s1Y, display: s1Display }}
            className="absolute inset-0 flex flex-col justify-start lg:justify-center pt-8 sm:pt-12 lg:pt-0 pointer-events-none z-20"
          >
            <div className="max-w-xl sm:max-w-2xl">
              {/* Restrained Architectural Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-4 sm:mb-6 lg:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5] animate-pulse" />
                <span>Intel Architecture // Two Paths. One Substrate.</span>
              </div>

              {/* Master Headline: Authoritative, Editorial, Integrated */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight text-white leading-[0.96] mb-4 sm:mb-6 lg:mb-8">
                <span className="block">
                  <SplitText text="YOUR DAY." />
                </span>
                <span className="block text-slate-300">
                  <SplitText text="YOUR POWER." />
                </span>
              </h1>

              {/* Minimal Purposeful Supporting Narrative */}
              <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-md font-normal leading-relaxed">
                Two distinct computing paths engineered from a single technological foundation.
              </p>
            </div>
          </motion.div>

          {/* ================= SCENE 2 LAYER: THE SHARED FOUNDATION ================= */}
          <motion.div
            style={{ opacity: s2HeadingOpacity, y: s2HeadingY, display: s2Display }}
            className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-20 py-2 sm:py-4"
          >
            {/* Dedicated Upper Tier: Clear Architectural Hierarchy */}
            <div className="text-center max-w-2xl px-4 pt-0 sm:pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                <span>Shared Technological Core // Intel 18A</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-2">
                ONE FOUNDATION.<br className="sm:hidden" /> TWO DIRECTIONS.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-md mx-auto leading-relaxed">
                Both processor families are built on Intel 18A process technology, engineered into two distinct computing philosophies.
              </p>
            </div>

            {/* Middle & Lower Tier: Balanced Flanking Wings & Tangible Diverging Light Paths */}
            <div className="w-full max-w-7xl px-4 sm:px-8 my-auto pointer-events-auto flex flex-col items-center">
              {/* DESKTOP FLANKING TRIPTYCH (Hidden on mobile) */}
              <motion.div
                style={{ opacity: s2DestinationsOpacity, y: s2DestinationsY }}
                className="hidden lg:grid grid-cols-3 gap-8 items-center w-full"
              >
                {/* Direction 01: Core Ultra (Left Wing on Desktop) */}
                <div className="text-left space-y-2.5 max-w-sm">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#0068B5]/40 bg-[#0068B5]/10 text-[9px] font-mono tracking-widest text-[#00C7FD] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                    <span>DIRECTION 01 // PUSH FURTHER</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight leading-snug">
                    Intel Core™ Ultra Series 3
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    Engineered for demanding creation, high-fidelity gaming, and intensive on-device AI.
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00C7FD] pt-1">
                    <span>SAPPHIRE PATH</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Center Column Spacer: Reserved for the Central Processor Anchor */}
                <div className="h-44 pointer-events-none" />

                {/* Direction 02: Core Series 3 (Right Wing on Desktop) */}
                <div className="text-right space-y-2.5 max-w-sm ml-auto">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[9px] font-mono tracking-widest text-[#F59E0B] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    <span>DIRECTION 02 // EVERYDAY MOMENTUM</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight leading-snug">
                    Intel Core™ Series 3
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    Modern computing and right-sized AI capabilities across price-sensitive laptops.
                  </p>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-[#F59E0B] pt-1">
                    <span>AMBER-PLATINUM PATH</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>

              {/* Tangible Bifurcating Light Path SVG across the Center */}
              <div className="relative w-full max-w-[540px] h-14 sm:h-16 mx-auto mt-1 sm:mt-2">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 540 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Substrate Wireframe Guides */}
                  <path
                    d="M 270 0 L 270 20 Q 270 45 70 58"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 270 0 L 270 20 Q 270 45 470 58"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />

                  {/* Animated Shared Root (From Silicon Substrate) */}
                  <motion.path
                    d="M 270 0 L 270 24"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    style={{ pathLength: traceTrunk }}
                  />

                  {/* Left Path: Intel Core Ultra (Sapphire Beam leading toward Direction 01) */}
                  <motion.path
                    d="M 270 24 Q 270 45 70 58"
                    stroke="#00C7FD"
                    strokeWidth="2.5"
                    style={{ pathLength: traceBranches }}
                  />

                  {/* Right Path: Intel Core (Warm Amber Beam leading toward Direction 02) */}
                  <motion.path
                    d="M 270 24 Q 270 45 470 58"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    style={{ pathLength: traceBranches }}
                  />

                  {/* Convergence Hub Node */}
                  <circle cx="270" cy="24" r="3" fill="#FFFFFF" />
                </svg>
              </div>

              {/* MOBILE RESPONSIVE WINGS (Visible only on mobile/tablet, placed cleanly under the light paths) */}
              <motion.div
                style={{ opacity: s2DestinationsOpacity, y: s2DestinationsY }}
                className="grid lg:hidden grid-cols-2 gap-3 w-full max-w-lg mt-2 px-1"
              >
                {/* Mobile Direction 01: Core Ultra */}
                <div className="text-left space-y-1.5 p-2.5 rounded-xl border border-[#0068B5]/30 bg-[#0068B5]/[0.06] backdrop-blur-sm">
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#0068B5]/40 bg-[#0068B5]/20 text-[8px] font-mono text-[#00C7FD] uppercase">
                    <span className="w-1 h-1 rounded-full bg-[#0068B5]" />
                    <span>DIR 01</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                    Core™ Ultra Series 3
                  </div>
                  <p className="text-[10px] text-slate-300 font-normal leading-snug">
                    Demanding creation, gaming & intensive AI workloads.
                  </p>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-[#00C7FD] pt-0.5">
                    <span>SAPPHIRE</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Mobile Direction 02: Core Series 3 */}
                <div className="text-left space-y-1.5 p-2.5 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/[0.06] backdrop-blur-sm">
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#F59E0B]/40 bg-[#F59E0B]/20 text-[8px] font-mono text-[#F59E0B] uppercase">
                    <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                    <span>DIR 02</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                    Core™ Series 3
                  </div>
                  <p className="text-[10px] text-slate-300 font-normal leading-snug">
                    Modern computing & right-sized AI across laptops.
                  </p>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-[#F59E0B] pt-0.5">
                    <span>AMBER</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ================= SCENE 3 LAYER: CORE ULTRA SERIES 3 ================= */}
          <motion.div
            style={{ opacity: s3EntranceOpacity, y: s3EntranceY, display: s3Display }}
            className="absolute inset-0 flex flex-col justify-between pointer-events-none z-20"
          >
            {/* UPPER ZONE: Oversized Integrated Typography */}
            <div className="pt-2 sm:pt-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#0068B5]/40 bg-[#0068B5]/10 text-[9px] font-mono tracking-widest text-[#0068B5] uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                <span>INTEL CORE™ ULTRA SERIES 3</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                FOR THE THINGS THAT<br />
                <span className="text-slate-400">ASK MORE OF YOU.</span>
              </h2>

              {/* Active Workload Narrative (Direct Typography, No Box) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentS3BeatData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mt-6 space-y-2 max-w-md"
                >
                  <div className="text-[10px] font-mono tracking-widest text-[#00C7FD] font-semibold uppercase">
                    {currentS3BeatData.tag}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {currentS3BeatData.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                    {currentS3BeatData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* LOWER ZONE: Pure Minimalist Workload Dial */}
            <div className="flex items-center justify-between pb-2 pointer-events-auto">
              <div className="flex items-center gap-6 sm:gap-8 border-b border-white/[0.08] pb-2">
                {S3_BEATS.map((beat) => {
                  const isCurrent = activeS3Beat === beat.id;
                  return (
                    <button
                      key={beat.id}
                      type="button"
                      onClick={() => setS3ManualBeat(beat.id)}
                      className={`group flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${
                        isCurrent ? 'text-white font-medium' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span className="text-[9px] text-[#0068B5] font-semibold">
                        {beat.index}
                      </span>
                      <span>{beat.id.toUpperCase()}</span>
                      {isCurrent && (
                        <motion.div
                          layoutId="s3-beat-active-line"
                          className="h-[2px] w-4 bg-[#00C7FD]"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-slate-500 hidden sm:block">
                SCENE // 03 · CONTINUOUS VISUAL SEQUENCE
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 4 LAYER: CORE SERIES 3 ================= */}
          <motion.div
            style={{ opacity: s4EntranceOpacity, y: s4EntranceY, display: s4Display }}
            className="absolute inset-0 flex flex-col justify-between pointer-events-none z-20"
          >
            {/* UPPER-RIGHT ZONE: Oversized Integrated Typography for Core Series 3 */}
            <div className="pt-2 sm:pt-4 max-w-xl ml-auto text-left lg:text-right">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[9px] font-mono tracking-widest text-[#F59E0B] uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span>INTEL CORE™ SERIES 3</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                BIG DAYS START<br />
                <span className="text-amber-200/80">WITH THE EVERYDAY.</span>
              </h2>

              {/* Active Everyday Possibility Narrative (Pure Typography, No Box) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentS4MomentData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mt-4 sm:mt-6 space-y-2 max-w-md ml-auto text-left lg:text-right"
                >
                  <div className="text-[10px] font-mono tracking-widest text-[#F59E0B] font-semibold uppercase">
                    {currentS4MomentData.tag}
                  </div>
                  <div className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {currentS4MomentData.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    {currentS4MomentData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* LOWER ZONE: Pure Minimalist Everyday Dial & Scene 5 Invitation */}
            <div className="flex items-center justify-between pb-2 pointer-events-auto">
              <div className="flex items-center gap-4 sm:gap-8 border-b border-white/[0.08] pb-2">
                {S4_MOMENTS.map((moment) => {
                  const isCurrent = activeS4Moment === moment.id;
                  return (
                    <button
                      key={moment.id}
                      type="button"
                      onClick={() => setS4ManualMoment(moment.id)}
                      className={`group flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${
                        isCurrent ? 'text-white font-medium' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span className="text-[9px] text-[#F59E0B] font-semibold">
                        {moment.index}
                      </span>
                      <span>{moment.id.toUpperCase()}</span>
                      {isCurrent && (
                        <motion.div
                          layoutId="s4-moment-active-line"
                          className="h-[2px] w-4 bg-[#F59E0B]"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Gentle Bridge Cue toward Scene 5 (Your Choice) */}
              <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>ONE FOUNDATION. TWO DIRECTIONS.</span>
                <span className="text-white font-semibold">YOUR CHOICE.</span>
                <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 5 LAYER: YOUR CHOICE ================= */}
          <motion.div
            style={{ opacity: s5EntranceOpacity, y: s5EntranceY, display: s5Display }}
            className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-20 pt-0 pb-1 sm:py-1"
          >
            {/* UPPER TIER: Bold Editorial Heading & Concept Hook */}
            <div className="text-center max-w-2xl px-4 pt-0">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[9px] font-mono tracking-widest text-slate-300 uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                <span>SCENE 05 // THE MOMENT IT BECOMES YOURS</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight mb-1">
                TWO DIRECTIONS. ONE CONFIDENT CHOICE.
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-normal max-w-lg mx-auto leading-relaxed hidden sm:block">
                Two legitimate expressions of Intel 18A process technology — engineered for different computing realities.
              </p>
            </div>

            {/* MIDDLE TIER: The Interactive Decision Experience (Pointer Events Auto) */}
            <div className="w-full max-w-4xl px-3 sm:px-6 my-auto pointer-events-auto flex flex-col items-center gap-2">
              
              {/* Converging Light Path SVG: Sapphire (Left) & Amber (Right) meet at central Decision Node */}
              <div className="relative w-full max-w-lg h-5 sm:h-6 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 600 24" fill="none">
                  {/* Sapphire branch from left */}
                  <motion.path
                    d="M 60 4 Q 240 4 300 18"
                    stroke={activeFocus === 'ultra' ? '#00C7FD' : 'rgba(0, 199, 253, 0.45)'}
                    strokeWidth={activeFocus === 'ultra' ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Amber branch from right */}
                  <motion.path
                    d="M 540 4 Q 360 4 300 18"
                    stroke={activeFocus === 'core' ? '#F59E0B' : 'rgba(245, 158, 11, 0.45)'}
                    strokeWidth={activeFocus === 'core' ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Central Decision Node */}
                  <circle
                    cx="300"
                    cy="18"
                    r="3.5"
                    fill={
                      activeFocus === 'ultra'
                        ? '#00C7FD'
                        : activeFocus === 'core'
                        ? '#F59E0B'
                        : '#FFFFFF'
                    }
                    className="transition-colors duration-300"
                  />
                </svg>
              </div>

              {/* 1. NEEDS-BASED SELECTOR: Compact Priority Chips */}
              <div className="w-full max-w-4xl bg-white/[0.02] border border-white/10 rounded-xl p-2 sm:p-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3 h-3 text-slate-400" />
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-slate-300 uppercase font-semibold">
                      What matters most in your next laptop?
                    </span>
                  </div>
                  {selectedPriorities.length > 0 && (
                    <button
                      type="button"
                      onClick={resetPriorities}
                      className="flex items-center gap-1 text-[9px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Priority Toggle Chips Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PRIORITIES.map((priority) => {
                    const isSelected = selectedPriorities.includes(priority.id);
                    const isUltra = priority.category === 'ultra';

                    return (
                      <button
                        key={priority.id}
                        type="button"
                        onClick={() => togglePriority(priority.id)}
                        aria-pressed={isSelected}
                        className={`text-left px-2 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between gap-1.5 ${
                          isSelected
                            ? isUltra
                              ? 'border-[#00C7FD]/80 bg-[#0068B5]/25 text-white shadow-[0_0_12px_rgba(0,199,253,0.18)]'
                              : 'border-[#F59E0B]/80 bg-[#F59E0B]/25 text-white shadow-[0_0_12px_rgba(245,158,11,0.18)]'
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isUltra ? 'bg-[#00C7FD]' : 'bg-[#F59E0B]'
                            }`}
                          />
                          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight truncate">
                            {priority.label}
                          </span>
                        </div>
                        {isSelected ? (
                          <Check
                            className={`w-3 h-3 flex-shrink-0 ${
                              isUltra ? 'text-[#00C7FD]' : 'text-[#F59E0B]'
                            }`}
                          />
                        ) : (
                          <span className="text-[8px] font-mono text-slate-500 uppercase flex-shrink-0">
                            {isUltra ? 'Ultra' : 'Core'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. DYNAMIC RECOMMENDATION BANNER */}
              <div
                className={`w-full max-w-4xl p-2 sm:p-2.5 rounded-xl border bg-black/60 backdrop-blur-xl transition-all duration-300 ${recData.borderClass}`}
              >
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase font-semibold border ${recData.badgeClass}`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{recData.badge}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                      Verified 18A Architecture
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                    {recData.title}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-normal leading-relaxed">
                    {recData.reasoning}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-normal italic pt-0.5">
                    <span className="font-semibold text-slate-300 not-italic font-mono text-[8px] uppercase tracking-wide mr-1">
                      Buyer Tip:
                    </span>
                    {recData.guidance}
                  </p>
                </div>
              </div>

              {/* 3. DUAL PATH EXPLORATION CARDS */}
              {/* DESKTOP SIDE-BY-SIDE VIEW (Hidden on mobile) */}
              <div className="hidden lg:grid grid-cols-2 gap-3 w-full max-w-4xl">
                {/* PATH A: Intel Core Ultra Series 3 */}
                <button
                  type="button"
                  onClick={() => setManualPathTab('ultra')}
                  className={`text-left p-2.5 rounded-xl border transition-all duration-300 cursor-pointer relative group ${
                    activeFocus === 'ultra'
                      ? 'border-[#00C7FD]/80 bg-[#0068B5]/15 shadow-[0_0_20px_rgba(0,104,181,0.22)]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#0068B5]/40 bg-[#0068B5]/20 text-[8px] font-mono tracking-widest text-[#00C7FD] uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#0068B5]" />
                      <span>PATH A // DEMANDING CREATION & AI</span>
                    </div>
                    {activeFocus === 'ultra' && (
                      <span className="text-[8px] font-mono text-[#00C7FD] uppercase tracking-wider flex items-center gap-1">
                        <span>MATCH</span>
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    Intel Core™ Ultra Series 3
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 italic mb-1.5">
                    "For the things that ask more of you."
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1">
                      <span className="text-[#00C7FD] font-bold">•</span>
                      <span>4K/8K media rendering, 3D simulation & CAD timelines</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-[#00C7FD] font-bold">•</span>
                      <span>High-FPS immersion gaming with sustained frame pacing</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-[#00C7FD] font-bold">•</span>
                      <span>Dedicated deep on-device AI acceleration & local LLMs</span>
                    </li>
                  </ul>
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>CHASSIS: Creator laptops & performance thin-and-lights</span>
                    <span className="text-[#00C7FD] flex items-center gap-0.5">
                      <span>SAPPHIRE</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </button>

                {/* PATH B: Intel Core Series 3 */}
                <button
                  type="button"
                  onClick={() => setManualPathTab('core')}
                  className={`text-left p-2.5 rounded-xl border transition-all duration-300 cursor-pointer relative group ${
                    activeFocus === 'core'
                      ? 'border-[#F59E0B]/80 bg-[#F59E0B]/15 shadow-[0_0_20px_rgba(245,158,11,0.22)]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#F59E0B]/40 bg-[#F59E0B]/20 text-[8px] font-mono tracking-widest text-[#F59E0B] uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                      <span>PATH B // MODERN EVERYDAY MOMENTUM</span>
                    </div>
                    {activeFocus === 'core' && (
                      <span className="text-[8px] font-mono text-[#F59E0B] uppercase tracking-wider flex items-center gap-1">
                        <span>MATCH</span>
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    Intel Core™ Series 3
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 italic mb-1.5">
                    "Big days start with the everyday."
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1">
                      <span className="text-[#F59E0B] font-bold">•</span>
                      <span>Fluid daily multitasking across heavy browser tabs & docs</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-[#F59E0B] font-bold">•</span>
                      <span>Right-sized on-device AI assistance for daily creativity</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-[#F59E0B] font-bold">•</span>
                      <span>Broad availability in light, price-accessible laptops</span>
                    </li>
                  </ul>
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>CHASSIS: Mainstream ultraportables & student laptops</span>
                    <span className="text-[#F59E0B] flex items-center gap-0.5">
                      <span>AMBER</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </button>
              </div>

              {/* MOBILE TABBED VIEW (Visible only on mobile/tablet) */}
              <div className="block lg:hidden w-full max-w-md">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white/[0.04] border border-white/10 mb-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobilePathTab('ultra');
                      setManualPathTab('ultra');
                    }}
                    className={`flex-1 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-colors ${
                      mobilePathTab === 'ultra'
                        ? 'bg-[#0068B5]/30 text-[#00C7FD] font-semibold border border-[#0068B5]/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Core™ Ultra
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobilePathTab('core');
                      setManualPathTab('core');
                    }}
                    className={`flex-1 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-colors ${
                      mobilePathTab === 'core'
                        ? 'bg-[#F59E0B]/30 text-[#F59E0B] font-semibold border border-[#F59E0B]/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Core™ Series 3
                  </button>
                </div>

                {mobilePathTab === 'ultra' ? (
                  <div className="p-2 rounded-lg border border-[#00C7FD]/60 bg-[#0068B5]/15 text-left space-y-1">
                    <div className="text-[11px] font-bold text-white">Intel Core™ Ultra Series 3</div>
                    <p className="text-[9px] text-slate-300 leading-snug">
                      Engineered for creators, gamers & power users requiring sustained performance headroom and deep on-device AI.
                    </p>
                    <div className="text-[8px] font-mono text-[#00C7FD]">SAPPHIRE PATH // HIGH-DEMAND WORKLOADS</div>
                  </div>
                ) : (
                  <div className="p-2 rounded-lg border border-[#F59E0B]/60 bg-[#F59E0B]/15 text-left space-y-1">
                    <div className="text-[11px] font-bold text-white">Intel Core™ Series 3</div>
                    <p className="text-[9px] text-slate-300 leading-snug">
                      Engineered for modern responsiveness, all-day mobility & right-sized AI across price-accessible laptops.
                    </p>
                    <div className="text-[8px] font-mono text-[#F59E0B]">AMBER PATH // ACCESSIBLE EVERYDAY MOMENTUM</div>
                  </div>
                )}
              </div>

            </div>

            {/* LOWER ZONE: Scene 5 Footer & Seamless Transition to Scene 6 */}
            <div className="w-full max-w-4xl px-4 flex items-center justify-between pb-1 pointer-events-auto">
              <div className="text-[10px] font-mono text-slate-400">
                <span>INTEL 18A FOUNDATION // </span>
                <span className="text-white font-medium">TWO EQUAL PATHS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span>SCENE // 05 · YOUR CHOICE</span>
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 6 LAYER: FINAL MEMORY / RESOLUTION ================= */}
          <motion.div
            style={{ opacity: s6EntranceOpacity, y: s6EntranceY, display: s6Display }}
            className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-20 pt-2 pb-2"
          >
            {/* UPPER TIER: Unified Light Canopy & Final Architectural Headline */}
            <div className="text-center max-w-4xl px-4 pt-1 sm:pt-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                <span>Intel 18A Process Technology // Complete Resolution</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              </div>

              {/* Primary Monumental Closing Headline */}
              <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-black tracking-tight text-white leading-[0.95] mb-3">
                <span className="block">YOUR DAY.</span>
                <span className="block text-slate-300">YOUR POWER.</span>
              </h2>

              {/* Supporting Thought: Restrained, Purposeful, Defensible */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                Two distinct computing directions built on a single Intel 18A technological foundation. The choice is defined by what you choose to build, play, and make happen.
              </p>
            </div>

            {/* MIDDLE TIER: Flanking Family Identities & Central Convergence Canopy */}
            <div className="w-full max-w-6xl px-6 my-auto pointer-events-auto flex flex-col items-center">
              {/* Converging Light Beams SVG: Sapphire (left) & Amber (right) fuse and meet the processor */}
              <div className="relative w-full max-w-2xl h-16 sm:h-20 mx-auto -mb-8 pointer-events-none z-10">
                <svg className="w-full h-full" viewBox="0 0 800 80" fill="none">
                  {/* Left Sapphire Path coming from Scene 3 world */}
                  <motion.path
                    d="M 60 10 Q 320 10 400 55"
                    stroke="#00C7FD"
                    strokeWidth="2.5"
                    style={{ pathLength: s6ConvergenceBeam }}
                  />
                  {/* Right Amber Path coming from Scene 4 world */}
                  <motion.path
                    d="M 740 10 Q 480 10 400 55"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    style={{ pathLength: s6ConvergenceBeam }}
                  />
                  {/* Central Fused Pillar entering the processor die */}
                  <motion.path
                    d="M 400 55 L 400 80"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    style={{ pathLength: s6ConvergenceBeam }}
                  />
                  <circle cx="400" cy="55" r="4.5" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Flanking Identity Wings around the Central Processor Anchor */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-8">
                {/* Left Identity: Intel Core Ultra Series 3 */}
                <div className="text-left space-y-1.5 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#0068B5]/40 bg-[#0068B5]/15 text-[9px] font-mono tracking-widest text-[#00C7FD] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5]" />
                    <span>PANTHER LAKE</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">
                    Intel Core™ Ultra Series 3
                  </div>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    Uncapped performance headroom for demanding creation, high-FPS gaming, and deep on-device AI.
                  </p>
                </div>

                {/* Center Column Spacer: Reserved for the Central Processor Anchor */}
                <div className="hidden lg:block h-36 pointer-events-none" />

                {/* Right Identity: Intel Core Series 3 */}
                <div className="text-right space-y-1.5 max-w-xs ml-auto">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[9px] font-mono tracking-widest text-[#F59E0B] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    <span>WILDCAT LAKE</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">
                    Intel Core™ Series 3
                  </div>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    Responsive multitasking agility and right-sized AI across accessible, lightweight laptops.
                  </p>
                </div>
              </div>
            </div>

            {/* LOWER TIER: Restrained Next Actions & Complete Resolution */}
            <div className="w-full max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 pointer-events-auto">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>INTEL 18A ARCHITECTURE</span>
                <span className="text-slate-600">//</span>
                <span className="text-slate-200">SERIES 3 GENERATION</span>
              </div>

              {/* Meaningful Next Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    window.scrollTo({ top: scrollHeight * 0.74, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-xs font-mono tracking-wide text-white transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00C7FD]" />
                  <span>REVISIT YOUR CHOICE</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-xs font-mono tracking-wide text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  <span>REPLAY JOURNEY</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* FOOTER CALLOUT & SCROLL STATUS */}
        <footer className="w-full flex items-center justify-between pt-3 border-t border-white/[0.08] text-[10px] font-mono text-slate-400 z-30">
          <div>
            <span>SHARED 18A SUBSTRATE</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="hidden sm:inline text-slate-400">SCROLL TO ADVANCE</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3 h-3 text-slate-300" />
            </motion.div>
          </div>
        </footer>

      </div>
    </div>
  );
}
