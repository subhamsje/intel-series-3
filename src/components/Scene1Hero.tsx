'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { ArrowDown, Cpu, ShieldCheck } from 'lucide-react';

export function Scene1Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Mouse coordinate tracker for anisotropic rim lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Scroll driven transforms for Scene 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Camera depth & scale on scroll
  const chipScale = useTransform(smoothProgress, [0, 0.7], [1, 1.12]);
  const chipRotateX = useTransform(smoothProgress, [0, 0.7], [4, 0]);
  const chipRotateY = useTransform(smoothProgress, [0, 0.7], [-6, 0]);
  const textOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0.2]);
  const textTranslateY = useTransform(smoothProgress, [0, 0.45], [0, -35]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringStage(true)}
      onMouseLeave={() => setIsHoveringStage(false)}
      className="relative min-h-screen lg:min-h-[140vh] w-full bg-[#050608] text-[#F8FAFC] overflow-hidden selection:bg-[#0068B5]"
    >
      {/* Background Architectural Canvas & Subtle Stage Noise */}
      <div className="absolute inset-0 stage-noise opacity-30 pointer-events-none" />

      {/* Atmospheric Cleanroom Inspection Spotlight (Subtle Intel Sapphire Accent) */}
      <div
        className="absolute top-1/4 right-1/4 w-[750px] h-[750px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0, 104, 181, 0.08) 0%, rgba(5, 6, 8, 0) 70%)',
          transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px)`,
        }}
      />

      {/* Hero Viewport: Natural Flow on Mobile, Sticky Cinematic Viewport on Desktop */}
      <div className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-between px-5 sm:px-10 lg:px-20 pt-6 pb-24 z-10">
        
        {/* MASTHEAD HEADER */}
        <header className="w-full flex items-center justify-between pb-5 hairline-border-b">
          <div className="flex items-center gap-4">
            {/* Authentic Intel Vector Logo Reversal */}
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
            <div className="h-3.5 w-[1px] bg-white/15" />
            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              18A Platform Architecture
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0068B5] ring-2 ring-[#0068B5]/40" />
              <span>GLOBAL PRODUCT REVEAL</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 tracking-wider">
              SCENE // 01
            </span>
          </div>
        </header>

        {/* HERO COMPOSITION: Monolithic Typography & Authenticated Silicon Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto w-full max-w-7xl mx-auto py-2">
          
          {/* LEFT FLANK: Precision Typography & Editorial Specs */}
          <motion.div
            style={{ opacity: textOpacity, y: textTranslateY }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5 z-20"
          >
            {/* Architectural Sub-header Pill */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-white/15 bg-white/[0.03] text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0068B5]" />
                <span>Next-Gen Silicon Infrastructure</span>
              </div>
            </div>

            {/* Campaign Headline: YOUR DAY. YOUR POWER. */}
            <div className="space-y-1">
              <h1 className="text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05]">
                <div className="block">
                  <SplitText
                    text="YOUR DAY."
                    className="text-white font-sans"
                    delay={0.06}
                  />
                </div>
                <div className="block">
                  <SplitText
                    text="YOUR POWER."
                    className="text-slate-300 font-sans"
                    delay={0.22}
                  />
                </div>
              </h1>
            </div>

            {/* Direct Editorial Narrative */}
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Two processor families. One historic leap in silicon engineering. 
              Manufactured on <strong className="text-white font-semibold">Intel 18A</strong> with RibbonFET Gate-All-Around transistors and PowerVia backside power delivery.
            </p>

            {/* Processor Family Anchors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl">
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="group-hover:text-slate-300">CORE ULTRA SERIES 3</span>
                  <span className="text-[#0068B5] font-semibold">PANTHER LAKE</span>
                </div>
                <div className="text-sm font-semibold text-white tracking-tight">Intel Core™ Ultra Series 3</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Cougar Cove P-cores · Xe3 Celestial GPU</div>
              </div>

              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="group-hover:text-slate-300">CORE SERIES 3</span>
                  <span className="text-emerald-400 font-semibold">WILDCAT LAKE</span>
                </div>
                <div className="text-sm font-semibold text-white tracking-tight">Intel Core™ Series 3</div>
                <div className="text-[11px] text-slate-400 mt-0.5">All-day agile battery · 15W TDP efficiency</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FLANK: Authenticated Silicon Monolith Stage */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Authentic Wafer Atmospheric Backdrop */}
            <div className="absolute -inset-10 opacity-15 pointer-events-none rounded-full overflow-hidden blur-[1px]">
              <Image
                src="/assets/intel-silicon-wafer.jpg"
                alt="Intel Silicon Wafer Backdrop"
                fill
                className="object-cover object-center mix-blend-screen"
              />
            </div>

            {/* The Silicon Framing Stage */}
            <motion.div
              style={{
                scale: chipScale,
                rotateX: chipRotateX,
                rotateY: chipRotateY,
                transformPerspective: 1200,
              }}
              className="relative w-full max-w-[480px] aspect-[16/11] rounded-xl overflow-hidden p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_24px_70px_rgba(0,0,0,0.85)] z-10"
            >
              {/* Inner Titanium Bezel */}
              <div className="relative w-full h-full rounded-xl bg-[#080B10] overflow-hidden flex items-center justify-center border border-white/10">
                
                {/* Authentic Intel Core Ultra Multi-Tile Photograph */}
                <Image
                  src="/assets/intel-core-ultra-tiles.jpg"
                  alt="Authentic Intel Core Ultra Multi-Tile Processor Architecture Photography"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center filter brightness-[0.98] contrast-[1.06] transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* Physically Grounded Anisotropic Specular Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`,
                    opacity: isHoveringStage ? 0.75 : 0.25,
                  }}
                />

                {/* Subtle Technical Framing Lines (Authentic Engineering Graticule) */}
                <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start text-[9px] font-mono text-white/70">
                    <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      INTEL 18A DIE SUBSTRATE
                    </span>
                    <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      FOVEROS 3D
                    </span>
                  </div>

                  <div className="flex justify-between items-end text-[9px] font-mono text-white/70">
                    <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      RIBBONFET GAA
                    </span>
                    <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      POWERVIA
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Ambient Shadow Depth */}
            <div className="absolute -bottom-6 w-3/4 h-8 bg-black/90 blur-xl rounded-full pointer-events-none -z-10" />
          </div>

        </div>

        {/* BOTTOM METADATA & SCROLL CALLOUT WITH CLEAR DOCK ELEVATION */}
        <footer className="w-full grid grid-cols-1 md:grid-cols-3 items-center pt-3 hairline-border-t text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">NODE:</span>
            <span className="text-slate-200 font-medium">INTEL 18A FOUNDRY PROCESS</span>
          </div>

          {/* Reserved Center Clearance for Floating Dock */}
          <div className="hidden md:block text-center text-[10px] text-slate-500">
            {/* Clear zone */}
          </div>

          <div className="flex items-center justify-end gap-2 text-slate-300">
            <span className="hidden sm:inline text-[10px] text-slate-400 tracking-wider">SCROLL TO EXPLORE ARCHITECTURE</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3.5 h-3.5 text-white/80" />
            </motion.div>
          </div>
        </footer>

      </div>
    </section>
  );
}
