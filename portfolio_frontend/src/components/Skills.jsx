import { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { ScrollReveal } from './animations/ScrollReveal';

const categories = [
  {
    icon: '🖥️',
    title: 'Frontend',
    gradient: 'from-cyan-500/10 to-blue-500/5',
    border: 'border-cyan-500/20',
    titleColor: 'text-cyan-300',
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Vite', 'Tailwind CSS', 'Bootstrap 5', 'WebSockets', 'Chart.js'],
  },
  {
    icon: '⚙️',
    title: 'Backend',
    gradient: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/20',
    titleColor: 'text-purple-300',
    items: ['Python', 'Node.js', 'C Programming', 'Django', 'Django REST Framework', 'API Design', 'PostgreSQL', 'MySQL', 'SQLite', 'FastAPI', 'Django Channels', 'Celery', 'Redis'],
  },
  {
    icon: '🛠️',
    title: 'Tools & DevOps',
    gradient: 'from-blue-500/10 to-indigo-500/5',
    border: 'border-blue-500/20',
    titleColor: 'text-blue-300',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD', 'Playwright', 'Redux Toolkit', 'Git & GitHub', 'Postman', 'Thunder Client', 'VS Code', 'Cursor', 'Google Antigravity', 'Figma', 'Agile / Scrum'],
  },
  {
    icon: '🤖',
    title: 'AI & Automation Tools',
    gradient: 'from-rose-500/10 to-orange-500/5',
    border: 'border-rose-500/20',
    titleColor: 'text-rose-300',
    items: ['Multi-Agent Orchestration', 'Prompt Engineering', 'AI-Assisted Development (Claude Code)', 'Agentic Workflow Design', 'Problem-Solving & Debugging'],
  },
  {
    icon: '🎨',
    title: 'Creative & Marketing',
    gradient: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/20',
    titleColor: 'text-emerald-300',
    items: ['Video Editing', 'Graphic Design', 'Digital Marketing', 'Canva', 'Social Media'],
  },
];

const SUMMARY_STATS = [
  ['20+', 'Technologies'],
  ['4+', 'Years Coding'],
  ['6+', 'Projects Shipped'],
  ['1', 'Goal: Excellence'],
];

const Skills = () => {
  return (
    <ScrollReveal
      className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-slate-950/70 shadow-panel backdrop-blur-sm overflow-hidden"
    >
      <section id="skills">
        <div className="h-[3px] bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500" />
        <div className="p-5 sm:p-7 lg:p-10">
          <SectionHeading title="Tech Stack" subtitle="Tools and strengths I use to ship every project." />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx * 0.1}>
                <article
                  className={`h-full relative rounded-xl sm:rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} p-4 sm:p-5 overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl sm:text-2xl">{cat.icon}</span>
                    <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${cat.titleColor}`}>
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-700/40 bg-slate-900/70 px-2.5 py-1.5 text-[0.65rem] sm:text-xs text-slate-300 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-4 items-center justify-between mt-8 pt-6 border-t border-slate-800/50">
              {SUMMARY_STATS.map(([val, lbl]) => (
                <div key={lbl} className="text-center flex-1 min-w-[120px]">
                  <p className="text-2xl font-bold text-cyan-300">{val}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default Skills;
