import { useEffect, useMemo, useState } from "react";
import useInViewReveal from "../hooks/useInViewReveal";
import { motion } from "framer-motion";
import { ScrollReveal } from "./animations/ScrollReveal";
import { HoverButton, HoverLink } from "./animations/HoverButton";

const roles = [
  "AI + Web + API Fullstack Developer",
  "Django REST Framework Architect",
  "Custom ERP & Billing Automation (Tally Integration)",
  "Automation-First Product Builder",
];

const smoothScroll = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Hero = ({ projectCount = 0 }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [ref, visible] = useInViewReveal();

  const currentRole = useMemo(() => roles[textIndex % roles.length], [textIndex]);

  useEffect(() => {
    const speed = deleting ? 32 : 62;
    const done = typed.length === currentRole.length && !deleting;
    const t = setTimeout(() => {
      if (!deleting) {
        if (typed.length < currentRole.length) setTyped(currentRole.slice(0, typed.length + 1));
        else setDeleting(true);
      } else {
        if (typed.length > 0) setTyped(currentRole.slice(0, typed.length - 1));
        else { setDeleting(false); setTextIndex((p) => p + 1); }
      }
    }, done ? 1400 : speed);
    return () => clearTimeout(t);
  }, [typed, deleting, currentRole]);

  const displayProjects = projectCount > 0 ? `${projectCount}+` : "6+";

  const mobileStats = [
    [displayProjects, "Projects"],
    ["4 yrs", "Experience"],
    ["2026", "Available"],
  ];

  const desktopStats = [
    [displayProjects, "Projects Built"],
    ["4 yrs", "In This Field"],
    ["Django+React", "Core Stack"],
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section
      id="home"
      ref={ref}
      className={`relative min-h-[100svh] flex flex-col justify-center pt-20 pb-12`}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-20 w-56 h-56 lg:w-80 lg:h-80 bg-purple-600/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* ── MOBILE LAYOUT (< lg) ─────────────────────── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 lg:hidden px-4 sm:px-6 space-y-6"
      >


        <motion.div variants={itemVariants}>
          <h1 className="text-[2rem] sm:text-[2.5rem] leading-[1.2] font-bold text-white handwritten">
            Hi, I&apos;m <span className="text-cyan-300 text-glow">Sufill X Man</span>
          </h1>
          <h2 className="mt-1 text-lg sm:text-xl text-slate-400 font-normal leading-snug">
            Building AI-enabled web experiences
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Fullstack developer · Django + React · Clean APIs · Beautiful UIs
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <HoverButton
            onClick={() => smoothScroll("projects")}
            className="btn-primary flex-1 text-center py-3"
          >
            View Work
          </HoverButton>
          <HoverButton
            onClick={() => smoothScroll("contact")}
            className="btn-secondary flex-1 text-center py-3"
          >
            Hire Me
          </HoverButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
          {mobileStats.map(([val, lbl]) => (
            <div key={lbl} className="rounded-xl border border-slate-700/40 bg-slate-900/60 p-3 text-center">
              <p className="text-base font-bold text-cyan-300">{val}</p>
              <p className="text-[0.6rem] text-slate-500 mt-0.5 uppercase tracking-wider">{lbl}</p>
            </div>
          ))}
        </motion.div>

        {/* Typing card */}
        <motion.div variants={itemVariants} className="rounded-xl border border-slate-700/40 bg-slate-900/60 px-4 py-4">
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-cyan-300/60 mb-2">I craft</p>
          <div className="relative h-10 overflow-hidden">
            <span className="absolute top-0 left-0 text-sm sm:text-base font-semibold text-white leading-tight">
              {typed}
              <span className="inline-block align-middle ml-0.5 w-[2px] h-4 bg-cyan-300 animate-pulse rounded-full" />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── DESKTOP LAYOUT (>= lg) ───────────────────── */}
      <div className="relative z-10 hidden lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-16 items-center px-6 xl:px-10 max-w-7xl mx-auto w-full">
        
        {/* LEFT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >


          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white handwritten leading-[1.2]">
              Hi, I&apos;m <span className="text-cyan-300 text-glow">Sufill X Man</span>
            </h1>
            <h2 className="mt-4 text-2xl xl:text-3xl text-slate-300 font-normal leading-snug">
              Building AI-enabled <span className="text-white font-medium">web experiences</span>
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-lg">
              Fullstack developer specializing in Django REST Framework backends and
              React frontends. 4 years in the field, shipping fast and beautiful products.
            </p>
          </motion.div>

          {/* Desktop CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <HoverButton
              onClick={() => smoothScroll("projects")}
              className="btn-primary text-sm px-7 py-3.5"
            >
              View Projects
            </HoverButton>
            <HoverButton
              onClick={() => smoothScroll("contact")}
              className="btn-secondary text-sm px-7 py-3.5"
            >
              Hire Me
            </HoverButton>
            <HoverLink
              href="https://github.com/sufillxman"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/40 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </HoverLink>
          </motion.div>

          {/* Desktop stats */}
          <motion.div variants={itemVariants} className="flex items-center gap-10 pt-2 border-t border-slate-800/60">
            {desktopStats.map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-2xl font-bold text-cyan-300">{val}</p>
                <p className="text-xs text-slate-500 mt-0.5">{lbl}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Terminal card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl" />

          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative rounded-2xl border border-slate-700/40 bg-slate-900/80 backdrop-blur-xl overflow-hidden"
          >
            <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400" />

            <div className="p-6 space-y-5">
              {/* Terminal top bar */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.js</span>
              </div>

              {/* Code snippet */}
              <div className="rounded-xl bg-slate-950/80 p-4 font-mono text-xs leading-6 space-y-0.5 border border-slate-800/60">
                <p><span className="text-purple-400">const</span> <span className="text-cyan-300">dev</span> <span className="text-slate-400">=</span> <span className="text-amber-300">{"{"}</span></p>
                <p className="pl-4"><span className="text-cyan-200">name</span><span className="text-slate-400">:</span> <span className="text-emerald-300">&quot;Sufill X Man&quot;</span><span className="text-slate-500">,</span></p>
                <p className="pl-4"><span className="text-cyan-200">exp</span><span className="text-slate-400">:</span> <span className="text-emerald-300">&quot;4 yrs in the field&quot;</span><span className="text-slate-500">,</span></p>
                <p className="pl-4"><span className="text-cyan-200">stack</span><span className="text-slate-400">:</span> <span className="text-emerald-300">&quot;Django + React&quot;</span><span className="text-slate-500">,</span></p>
                <p className="pl-4"><span className="text-cyan-200">projects</span><span className="text-slate-400">:</span> <span className="text-amber-200">{displayProjects}</span><span className="text-slate-500">,</span></p>
                <p className="pl-4"><span className="text-cyan-200">status</span><span className="text-slate-400">:</span> <span className="text-emerald-300">&quot;Available 🟢&quot;</span><span className="text-slate-500">,</span></p>
                <p><span className="text-amber-300">{"}"}</span></p>
              </div>

              {/* Stack badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Backend", value: "Django + DRF", clr: "text-cyan-300/70" },
                  { label: "Frontend", value: "React + Vite", clr: "text-purple-300/70" },
                  { label: "Database", value: "MySQL / SQLite", clr: "text-blue-300/70" },
                  { label: "Deploy", value: "Railway / Vercel", clr: "text-emerald-300/70" },
                ].map(({ label, value, clr }) => (
                  <div key={label} className="rounded-xl border border-slate-700/40 bg-slate-950/60 p-3">
                    <p className={`text-[0.6rem] uppercase tracking-widest ${clr}`}>{label}</p>
                    <p className="text-xs font-semibold text-white mt-1">{value}</p>
                  </div>
                ))}
              </div>

              {/* Typing row */}
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/60 px-4 py-3">
                <p className="text-[0.6rem] uppercase tracking-widest text-cyan-300/60 mb-2">Currently crafting</p>
                <div className="relative h-6 overflow-hidden">
                  <span className="absolute top-0 left-0 text-sm font-mono text-white whitespace-nowrap">
                    {typed}
                    <span className="inline-block align-middle ml-0.5 w-[2px] h-4 bg-cyan-300 animate-pulse rounded-full" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
