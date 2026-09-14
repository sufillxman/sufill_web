const socialLinks = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/sufill-x-man', icon: '💼' },
  { label: 'GitHub',    href: 'https://github.com/sufillxman',          icon: '💻' },
  { label: 'Instagram', href: 'https://instagram.com/sufilldigital',   icon: '📸' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Footer = () => (
  <footer className="mt-6 sm:mt-10 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">

      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Brand */}
        <div>
          <p className="text-base font-bold tracking-[0.15em] text-cyan-300">
            SUFILL<span className="text-white"> X MAN</span>
          </p>
          <p className="mt-1.5 text-xs text-slate-500 max-w-xs leading-relaxed">
            AI + Web + API Fullstack Developer — React · Tailwind · Django · DRF
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-slate-700/50 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-300 transition hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95"
            >
              <span>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Quick nav */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {['home', 'about', 'skills', 'projects', 'contact'].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-[0.65rem] uppercase tracking-widest text-slate-500 hover:text-cyan-300 transition-colors capitalize"
          >
            {id}
          </button>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-6 pt-5 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.65rem] text-slate-600">
        <p>© {new Date().getFullYear()} Sufill X Man. All rights reserved.</p>
        <p>Built with React + Django + ❤️</p>
      </div>
    </div>
  </footer>
);

export default Footer;
