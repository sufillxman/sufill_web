import { useEffect, useRef } from 'react';
import { HoverLink } from './animations/HoverButton';

const colorMap = {
  cyan: { border: 'border-cyan-500/25', glow: 'hover:border-cyan-400/50', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300', dot: 'bg-cyan-400' },
  purple: { border: 'border-purple-500/25', glow: 'hover:border-purple-400/50', badge: 'bg-purple-500/10 border-purple-500/20 text-purple-300', dot: 'bg-purple-400' },
  blue: { border: 'border-blue-500/25', glow: 'hover:border-blue-400/50', badge: 'bg-blue-500/10 border-blue-500/20 text-blue-300', dot: 'bg-blue-400' },
  emerald: { border: 'border-emerald-500/25', glow: 'hover:border-emerald-400/50', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300', dot: 'bg-emerald-400' },
};

// Deterministic color from project id
const getColor = (id) => {
  const keys = Object.keys(colorMap);
  let numericId = 0;
  if (typeof id === 'number') {
    numericId = id;
  } else if (typeof id === 'string') {
    // simple string hash if it's not a pure number
    numericId = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }
  return colorMap[keys[numericId % keys.length]];
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) - r.height / 2) / 16;
      const ry = (r.width / 2 - (e.clientX - r.left)) / 16;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  const year = project.created_at ? new Date(project.created_at).getFullYear() : '2026';
  const techs = project.tech_stack ? project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const color = getColor(project.id || 0);

  return (
    <article
      ref={cardRef}
      className={`flex flex-col relative rounded-xl sm:rounded-2xl border ${color.border} ${color.glow} bg-slate-900/70 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 will-change-transform overflow-hidden group`}
    >
      {/* Subtle gradient top bar */}
      <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${
        color.dot === 'bg-cyan-400' ? 'from-cyan-400 to-transparent' :
        color.dot === 'bg-purple-400' ? 'from-purple-400 to-transparent' :
        color.dot === 'bg-blue-400' ? 'from-blue-400 to-transparent' :
        'from-emerald-400 to-transparent'
      }`} />

      {/* Project Image Container */}
      <div className="relative -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-5 h-40 sm:h-48 overflow-hidden bg-slate-950 border-b border-slate-800/50 group-hover:border-slate-700/50 transition-colors duration-300">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-slate-950 transition-transform duration-700 group-hover:scale-110" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
        
        {/* Empty State Icon */}
        {!project.image && (
           <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
           </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border ${project.is_private ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : color.badge} px-2.5 py-1 text-[0.6rem] uppercase tracking-widest`}>
          <span className={`w-1.5 h-1.5 rounded-full ${project.is_private ? 'bg-amber-400' : color.dot} animate-pulse`} />
          {project.is_private ? 'Coming Soon / Private' : 'Featured'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base lg:text-base font-semibold text-white mb-2 leading-snug group-hover:text-cyan-100 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
        {project.description}
      </p>

      {/* Tech tags */}
      {techs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techs.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-md border border-slate-700/50 bg-slate-800/70 px-2 py-0.5 text-[0.58rem] sm:text-[0.62rem] text-slate-400">
              {tech}
            </span>
          ))}
          {techs.length > 5 && (
            <span className="rounded-md border border-slate-700/50 bg-slate-800/70 px-2 py-0.5 text-[0.58rem] sm:text-[0.62rem] text-slate-500">
              +{techs.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {project.is_private ? (
          <div className="flex-1 rounded-xl border border-slate-700/50 bg-slate-800/40 py-2 text-center text-xs text-slate-500 cursor-not-allowed uppercase tracking-wider font-semibold">
            Private Project
          </div>
        ) : (
          <>
            <div className="flex-1">
              <HoverLink
                href={project.github_link || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full justify-center btn-secondary text-xs py-2 rounded-xl"
                onClick={(e) => !project.github_link && e.preventDefault()}
              >
                GitHub →
              </HoverLink>
            </div>
            {project.live_link && (
              <div className="flex-1">
                <HoverLink
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full justify-center btn-primary text-xs py-2 rounded-xl"
                >
                  Live ↗
                </HoverLink>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;