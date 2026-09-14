import { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { fetchResumeApi, fetchCertificatesApi } from '../services/api';
import { ScrollReveal } from './animations/ScrollReveal';

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchResumeApi().catch(() => null),
      fetchCertificatesApi().catch(() => []) 
    ])
      .then(([resumeData, certData]) => {
        let finalResume = Array.isArray(resumeData) ? resumeData[0] : resumeData;
        
        if (!finalResume) {
          setError('Unable to load resume data.');
        } else {
          setResume(finalResume);
          setCertificates(certData || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load resume data.');
        setLoading(false);
      });
  }, []);

  return (
    <ScrollReveal
      className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-slate-950/70 shadow-panel backdrop-blur-sm overflow-hidden"
    >
      <section id="resume">
        <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-transparent" />
        
        <div className="p-5 sm:p-7 lg:p-10">
          <SectionHeading title="Resume" subtitle="A snapshot of my skills, education, and achievements as a fullstack developer." />

          {loading && (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-8 text-slate-300 text-center">
              Loading resume...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8 text-rose-200 text-center">
              {error}
            </div>
          )}

          {resume && (
            <div className="grid gap-6 lg:grid-cols-2 items-start">
              
              {/* Left Column: About & Skills */}
              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <div className="glass-card rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6 sm:p-8 shadow-glow transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-cyan-400">👤</span> About me
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{resume.summary}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-950/50 p-3">
                        <p className="text-[0.65rem] uppercase tracking-widest text-cyan-300/80">Name</p>
                        <p className="mt-1 text-sm font-medium text-slate-200">{resume.name}</p>
                      </div>
                      <div className="rounded-xl bg-slate-950/50 p-3">
                        <p className="text-[0.65rem] uppercase tracking-widest text-cyan-300/80">Role</p>
                        <p className="mt-1 text-sm font-medium text-slate-200">{resume.role}</p>
                      </div>
                      <div className="rounded-xl bg-slate-950/50 p-3">
                        <p className="text-[0.65rem] uppercase tracking-widest text-cyan-300/80">Email</p>
                        <p className="mt-1 text-sm font-medium text-slate-200">{resume.email}</p>
                      </div>
                      <div className="rounded-xl bg-slate-950/50 p-3">
                        <p className="text-[0.65rem] uppercase tracking-widest text-cyan-300/80">Phone</p>
                        <p className="mt-1 text-sm font-medium text-slate-200">{resume.phone}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="glass-card rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6 sm:p-8 shadow-glow transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-cyan-400">⚡</span> Top skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill) => (
                        <span key={skill} className="rounded-lg border border-slate-700/40 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Education, Highlights & Certs */}
              <div className="space-y-6">
                <ScrollReveal delay={0.3}>
                  <div className="glass-card rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6 sm:p-8 shadow-glow transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-cyan-400">🎓</span> Journey & Highlights
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 mb-3">Education</p>
                        <ul className="space-y-2">
                          {resume.education.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="h-px bg-slate-800" />

                      <div>
                        <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 mb-3">Highlights</p>
                        <ul className="space-y-2">
                          {resume.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {certificates.length > 0 && (
                  <ScrollReveal delay={0.4}>
                    <div className="glass-card rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6 sm:p-8 shadow-glow transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                        <span className="text-cyan-400">🏆</span> Certifications
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {certificates.map((cert) => (
                          <div key={cert.id} className="rounded-xl border border-slate-700/40 bg-slate-950/50 p-4 flex flex-col h-full justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-200">{cert.title}</p>
                              <p className="text-[0.65rem] text-slate-500 mt-1 uppercase tracking-wider">{cert.issuer}</p>
                            </div>
                            {cert.credential_url && (
                              <a 
                                href={cert.credential_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
                              >
                                View Credential ↗
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
};

export default Resume;
