import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home',     href: 'home' },
  { name: 'About',    href: 'about' },
  { name: 'Skills',   href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact',  href: 'contact' },
];

const smoothScroll = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const ids = navItems.map((n) => n.href).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScroll(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 border-b border-slate-800/80 shadow-lg shadow-slate-950/60 backdrop-blur-xl'
          : 'bg-slate-950/60 border-b border-transparent backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 h-16 sm:h-[68px]">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, 'home')}
          className="text-sm sm:text-base font-bold tracking-[0.15em] text-cyan-300 shrink-0"
        >
          SUFILL<span className="text-white"> X MAN</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ name, href }) => (
            <a
              key={href}
              href={`#${href}`}
              onClick={(e) => handleNav(e, href)}
              className={`relative px-3 py-1.5 rounded-lg text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
                active === href
                  ? 'text-cyan-300'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {name}
              {active === href && (
                <span className="absolute inset-x-2 bottom-0 h-[2px] bg-cyan-400 rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, 'contact')}
          className="hidden lg:inline-flex btn-primary text-xs px-5 py-2"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-lg border border-slate-700/60 bg-slate-900/80"
        >
          <span className={`block w-5 h-[2px] bg-cyan-300 rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-slate-400 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-slate-400 rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-950/98 backdrop-blur-xl border-t border-slate-800/60 px-4 pt-3 pb-5">
          <div className="flex flex-col gap-1">
            {navItems.map(({ name, href }) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={(e) => handleNav(e, href)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                  active === href
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800/60 active:bg-slate-800'
                }`}
              >
                {active === href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                )}
                {name}
              </a>
            ))}

            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, 'contact')}
                className="btn-primary w-full text-center text-sm py-3"
              >
                🚀 Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
