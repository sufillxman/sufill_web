import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContact, resetContactState } from '../features/contact/contactSlice';
import SectionHeading from './SectionHeading';
import { ScrollReveal } from './animations/ScrollReveal';
import { HoverButton, HoverLink } from './animations/HoverButton';

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '7405721856', href: 'tel:7405721856' },
  { icon: '✉️', label: 'Email', value: 'sufillxman@gmail.com', href: 'mailto:sufillxman@gmail.com' },
];

const Contact = () => {
  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.contact);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    if (status === 'succeeded') {
      setForm({ name: '', email: '', phone: '', message: '' });
      const t = setTimeout(() => dispatch(resetContactState()), 5000);
      return () => clearTimeout(t);
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContact(form));
  };

  return (
    <ScrollReveal
      className="mt-6 sm:mt-12 rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-slate-950/70 shadow-panel backdrop-blur-sm overflow-hidden"
    >
      <section id="contact">
        <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-transparent" />
        <div className="p-5 sm:p-7 md:p-10">
          <SectionHeading title="Get in Touch" subtitle="Send a message or reach out directly." />

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Contact info */}
            <div className="space-y-4 order-2 lg:order-1">
              <p className="text-sm text-slate-400 leading-relaxed">
                Available for fullstack collaborations, automation builds, and API-driven projects. Let&apos;s build something great!
              </p>

              <div className="space-y-3">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <HoverLink
                    key={label}
                    href={href}
                    className="flex items-center gap-3 rounded-xl border border-slate-700/40 bg-slate-900/60 px-4 py-3.5 group"
                  >
                    <span className="text-xl shrink-0">{icon}</span>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] uppercase tracking-widest text-cyan-300/70">{label}</p>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors truncate">{value}</p>
                    </div>
                  </HoverLink>
                ))}
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-xs text-emerald-300 font-medium">Available for new projects</p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 rounded-xl sm:rounded-2xl border border-slate-700/30 bg-slate-900/60 p-4 sm:p-5 order-1 lg:order-2"
            >
              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs text-slate-400 font-medium">Name *</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs text-slate-400 font-medium">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs text-slate-400 font-medium">Phone <span className="text-slate-600">(optional)</span></span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs text-slate-400 font-medium">Message *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 resize-none"
                />
              </label>

              <HoverButton
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  'Send Message'
                )}
              </HoverButton>

              {message && (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <p className="text-sm text-emerald-300">{message}</p>
                </div>
              )}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                  <span className="text-rose-400 shrink-0">✗</span>
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default Contact;
