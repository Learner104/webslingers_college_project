import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Shield, Cpu, Sparkles, Terminal, Activity, Eye, Zap } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HeroSectionProps {
  onInitiateClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onInitiateClick,
  onExploreClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Floating tactical particle & kinetic cyber-wave canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const count = Math.min(55, Math.floor(width / 26));

    const colors = ['#56D8FF', '#86E3FF', '#E62429', '#10B981', '#F59E0B'];

    for (let i = 0; i < count; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseRadius: Math.random() * 2 + 1,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: col,
        trail: [],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Artistic ambient luminous energy waves (subtle sine arcs)
      ctx.save();
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = wave === 0 
          ? 'rgba(86, 216, 255, 0.04)' 
          : wave === 1 
          ? 'rgba(230, 36, 41, 0.03)' 
          : 'rgba(16, 185, 129, 0.025)';
        
        for (let x = 0; x < width; x += 15) {
          const y = height * (0.35 + wave * 0.18) +
            Math.sin(x * 0.003 + time + wave) * 35 +
            Math.cos(x * 0.006 - time * 0.5) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Dynamic particle connections with glowing gradient
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(86, 216, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw each kinetic particle
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsating glowing aura
        const currentPulse = Math.sin(time * 3 + idx) * 0.5 + 1;
        p.radius = p.baseRadius * currentPulse;

        // Particle glow gradient
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        radGrad.addColorStop(0, p.color);
        radGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Track slight mouse parallax for reactor assembly
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / 45,
      y: (clientY - centerY) / 45,
    });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-obsidian"
    >
      {/* Background Kinetic Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Futuristic Artistic Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Atmospheric Multi-spectral Nebula Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-reactor-cyan/15 via-stark/10 to-transparent rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-stark/15 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse-glow-crimson" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* HUD Telemetry Top Status Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 hidden lg:flex justify-between items-center text-[11px] font-mono text-silver-muted border-b border-graphite-800/80 pb-2 mb-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-reactor-cyan font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-reactor-cyan animate-ping" />
            INITIATIVE STATUS: ACTIVE
          </span>
          <span className="text-silver-dark">//</span>
          <span className="flex items-center gap-1 text-silver-light">
            <Activity className="w-3.5 h-3.5 text-stark animate-pulse" />
            RECRUITMENT WINDOW: OPEN (SEMESTER COHORT)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-silver-muted/80 tracking-widest">COORDS: 42.3601° N • 71.0942° W</span>
          <span className="text-silver-dark">//</span>
          <span className="text-emerald-400 flex items-center gap-1.5 font-bold tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            SECURE CHANNEL ESTABLISHED
          </span>
        </div>
      </div>

      {/* Hero Centerpiece: Kinetic Holographic Emblem, Headlines & CTAs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex-1 flex flex-col justify-center items-center">
        {/* Holographic Arc-Reactor Assembly with Multi-Ring Kinetic Motion */}
        <div
          className="relative mb-8 group cursor-pointer"
          onClick={() => sound.playClick()}
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Outer Layer 1: Orbiting Energy Rings with tick marks */}
          <div className="absolute -inset-10 rounded-full border border-dashed border-reactor-cyan/35 animate-spin-slow opacity-75 pointer-events-none" />
          <div className="absolute -inset-16 rounded-full border border-dotted border-stark/30 animate-spin-reverse-slow opacity-60 pointer-events-none" />
          <div className="absolute -inset-24 rounded-full border border-double border-reactor-cyan/15 animate-spin-orbit opacity-40 pointer-events-none" />

          {/* Orbiting Satellite Light Flares */}
          <div className="absolute -inset-10 pointer-events-none animate-spin-slow">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-reactor-cyan shadow-[0_0_14px_#56D8FF]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-stark shadow-[0_0_12px_#E62429]" />
          </div>

          <div className="absolute -inset-16 pointer-events-none animate-spin-reverse-slow">
            <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10B981]" />
          </div>

          {/* Central Reactor Core Emblem Glass Container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto flex items-center justify-center p-3 rounded-full bg-obsidian-950/85 border-2 border-reactor-cyan/50 shadow-[0_0_60px_rgba(86,216,255,0.45)] backdrop-blur-xl group-hover:scale-105 group-hover:shadow-[0_0_80px_rgba(86,216,255,0.7)] transition-all duration-300">
            {/* Hologram Shimmer Sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-reactor-cyan/10 via-transparent to-stark/10 pointer-events-none animate-hologram-shimmer" />

            <svg
              viewBox="0 0 160 160"
              className="w-full h-full transform transition-transform"
            >
              <defs>
                <radialGradient id="heroCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#86E3FF" stopOpacity="1" />
                  <stop offset="45%" stopColor="#56D8FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#080A0F" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="starkChamber" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF3B41" />
                  <stop offset="100%" stopColor="#B0161A" />
                </linearGradient>
              </defs>

              {/* Glowing Core Disc */}
              <circle cx="80" cy="80" r="48" fill="url(#heroCoreGlow)" className="animate-pulse" />

              {/* Segmented Outer Gear Ring */}
              <circle
                cx="80"
                cy="80"
                r="65"
                stroke="#56D8FF"
                strokeWidth="2"
                strokeDasharray="20 10 6 10"
                fill="none"
                opacity="0.85"
              />

              {/* Tactical Inner Collar with Crimson Teeth */}
              <circle
                cx="80"
                cy="80"
                r="49"
                stroke="url(#starkChamber)"
                strokeWidth="2.5"
                strokeDasharray="16 28 16 28"
                fill="none"
              />

              {/* Micro Precision Crosshairs */}
              <line x1="80" y1="8" x2="80" y2="28" stroke="#56D8FF" strokeWidth="2" />
              <line x1="80" y1="132" x2="80" y2="152" stroke="#56D8FF" strokeWidth="2" />
              <line x1="8" y1="80" x2="28" y2="80" stroke="#56D8FF" strokeWidth="2" />
              <line x1="132" y1="80" x2="152" y2="80" stroke="#56D8FF" strokeWidth="2" />

              {/* Central Geometric Initiative Apex Emblem ("A" Architecture) */}
              <polygon
                points="80,28 116,108 96,108 80,72 64,108 44,108"
                fill="#F4F6FA"
                filter="drop-shadow(0 0 10px rgba(244,246,250,0.8))"
              />
              <polygon
                points="80,52 100,100 80,88 60,100"
                fill="#56D8FF"
                opacity="0.95"
              />
              {/* Crimson Crossbar with Chamfer */}
              <polygon
                points="48,84 112,84 105,92 55,92"
                fill="#E62429"
                filter="drop-shadow(0 0 8px #E62429)"
              />

              {/* Kinetic Core Spark Point */}
              <circle cx="80" cy="80" r="5" fill="#FFFFFF" />
              <circle cx="80" cy="80" r="2.5" fill="#56D8FF" />
            </svg>
          </div>

          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-mono uppercase tracking-widest text-reactor-cyan bg-obsidian-950 border border-reactor-cyan/50 rounded-full shadow-[0_0_15px_rgba(86,216,255,0.3)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-reactor-cyan animate-ping" />
            REACTOR MK-IV // ONLINE
          </span>
        </div>

        {/* Artistic Holographic Sub-header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-graphite-900/90 border border-reactor-cyan/40 text-reactor-cyan text-xs font-mono uppercase tracking-widest shadow-lg shadow-reactor-cyan/10 animate-float">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-reactor-cyan" />
          <span>OFFICIAL COLLEGIATE RECRUITMENT PORTAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-stark animate-pulse" />
        </div>

        {/* Cinematic Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-[1.02] max-w-5xl">
          EARTH NEEDS ITS <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pure-white via-reactor-cyan to-white drop-shadow-[0_0_35px_rgba(86,216,255,0.5)]">
            NEXT GENERATION.
          </span>
        </h1>

        {/* Supporting Narrative Copy */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-silver-light max-w-2xl font-sans font-light leading-relaxed">
          Extraordinary things happen when extraordinary people assemble. Discover your strengths,
          find your team, and become part of something bigger.
        </p>

        {/* Kinetic Interactive CTAs with Motion Glow */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onInitiateClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white bg-stark hover:bg-stark-glow transition-all duration-300 rounded shadow-[0_0_30px_rgba(230,36,41,0.4)] clip-chamfer group hover:scale-[1.04] active:scale-95 relative overflow-hidden"
          >
            {/* Shimmer beam effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Shield className="w-4 h-4 text-white" />
            <span>INITIATE RECRUITMENT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onExploreClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-mono uppercase tracking-wider text-silver-light hover:text-white bg-graphite-900/80 hover:bg-graphite-800 border border-reactor-cyan/40 hover:border-reactor-cyan transition-all duration-300 rounded backdrop-blur-md hover:shadow-[0_0_20px_rgba(86,216,255,0.25)] hover:scale-[1.02]"
          >
            <Cpu className="w-4 h-4 text-reactor-cyan" />
            <span>EXPLORE THE INITIATIVE</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Metrics Bar with Glassmorphic Shimmer */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-graphite-900/85 border border-graphite-700/80 rounded-lg backdrop-blur-xl hud-border shadow-2xl">
          <div className="flex flex-col border-r border-graphite-800 pr-4">
            <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-reactor-cyan" />
              Active Cadets
            </span>
            <span className="text-xl sm:text-3xl font-mono font-bold text-white mt-1">85+ Members</span>
          </div>
          <div className="flex flex-col md:border-r border-graphite-800 pr-4">
            <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-reactor-cyan" />
              Specialized Divisions
            </span>
            <span className="text-xl sm:text-3xl font-mono font-bold text-reactor-cyan mt-1">05 Squads</span>
          </div>
          <div className="flex flex-col border-r border-graphite-800 pr-4">
            <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider">Academic Disciplines</span>
            <span className="text-xl sm:text-3xl font-mono font-bold text-white mt-1">18 Majors</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider">Field Deployments</span>
            <span className="text-xl sm:text-3xl font-mono font-bold text-stark mt-1">40+ Projects</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-7">
          <button
            onClick={() => {
              sound.playClick();
              onExploreClick();
            }}
            aria-label="Scroll to Mission Section"
            className="flex flex-col items-center text-[10px] font-mono uppercase tracking-widest text-silver-muted hover:text-reactor-cyan transition-colors group"
          >
            <span className="group-hover:tracking-[0.2em] transition-all">SCROLL TO ENGAGE</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1.5 text-reactor-cyan" />
          </button>
        </div>
      </div>
    </section>
  );
};
