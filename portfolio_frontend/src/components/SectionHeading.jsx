const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-6 sm:mb-8">
    <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-cyan-300/90">
      Section
    </span>
    <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
