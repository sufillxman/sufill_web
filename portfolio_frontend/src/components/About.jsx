import SectionHeading from './SectionHeading';
import { ScrollReveal } from './animations/ScrollReveal';

const ServerIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const strengths = [
  { icon: <ServerIcon />, text: 'Headless CMS with Django + DRF' },
  { icon: <CpuIcon />, text: 'Automation-focused REST APIs' },
  { icon: <CodeIcon />, text: 'Pixel-perfect Tailwind UI' },
  { icon: <CheckIcon />, text: 'Client-ready project delivery' },
];

const About = () => {
  return (
    <ScrollReveal
      className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-slate-950/70 shadow-panel backdrop-blur-sm overflow-hidden"
    >
      <section id="about">
        <div className="h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent" />

        <div className="p-5 sm:p-7 lg:p-10">
          <SectionHeading title="About Me" subtitle="Real automation, strong code, live results." />

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10 items-start">
            {/* Story */}
            <div className="space-y-4">
              <ScrollReveal delay={0.1}>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  I am{' '}
                  <span className="font-semibold text-white">Sufill X Man (Manknojiya Sufiyan)</span>,
                  an AI + Web + API Fullstack Developer on a mission to ship modern products by 2026.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  My journey began with BCA and expanded into real-world automation solutions —
                  billing, inventory, and admin systems people actually use every day.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  I specialize in{' '}
                  <span className="text-cyan-300 font-medium">Django REST Framework</span>,{' '}
                  <span className="text-cyan-300 font-medium">React.js</span>, and{' '}
                  <span className="text-cyan-300 font-medium">Tailwind CSS</span> — shipping
                  fast, clean, beautifully designed, and production-ready products.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  <strong className="text-white font-semibold">Goal:</strong> Working toward becoming an AI + Web + API Full-Stack Developer by 2026.<br />
                  <strong className="text-white font-semibold">Open to collaborate on:</strong> backend-heavy web apps, RESTful APIs, and open-source Django projects.<br />
                  <strong className="text-white font-semibold">Currently learning:</strong> Advanced Python, Django REST Framework internals, and scalable database architecture.
                </p>
              </ScrollReveal>

              {/* Desktop: Tech badges */}
              <ScrollReveal delay={0.4}>
                <div className="hidden sm:flex flex-wrap gap-2 pt-2">
                  {['Python', 'Django', 'React.js', 'REST APIs', 'MySQL', 'Tailwind'].map((t) => (
                    <span key={t} className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Core strengths */}
            <ScrollReveal delay={0.3}>
              <div className="rounded-xl sm:rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 sm:p-5 space-y-3">
                <p className="text-[0.65rem] uppercase tracking-widest text-cyan-300/60 mb-1">Core Strengths</p>
                {strengths.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg bg-slate-800/40 px-3 py-2.5">
                    <span className="text-lg shrink-0">{icon}</span>
                    <p className="text-xs sm:text-sm text-slate-300">{text}</p>
                  </div>
                ))}

                {/* Available badge */}
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <p className="text-xs text-emerald-300 font-medium">Open to Work · Available Now</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default About;
