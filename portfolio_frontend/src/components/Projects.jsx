import { useEffect, useState } from 'react';
import { fetchProjectsApi } from '../services/api';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { ScrollReveal } from './animations/ScrollReveal';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchProjectsApi()
      .then((data) => {
        const fetchedData = data || [];
        setProjectsData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load projects'); 
        setLoading(false);
      });
  }, []);



  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

  return (
    <ScrollReveal
      className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-slate-950/70 shadow-panel backdrop-blur-sm overflow-hidden"
    >
      <section id="projects">
        <div className="h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />
        <div className="p-5 sm:p-7 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
            <SectionHeading
              title="Projects"
              subtitle="Selected fullstack systems and modern interfaces."
            />
            {/* Project count badge */}
            {!loading && projectsData.length > 0 && (
              <span className="shrink-0 self-start sm:self-auto rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                {projectsData.length} projects
              </span>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl sm:rounded-2xl border border-slate-700/30 bg-slate-900/50 p-4 sm:p-5 animate-pulse">
                  <div className="h-3 bg-slate-700/60 rounded-full w-1/3 mb-3" />
                  <div className="h-5 bg-slate-700/60 rounded-full w-3/4 mb-3" />
                  <div className="space-y-2 mb-5">
                    <div className="h-3 bg-slate-700/40 rounded-full" />
                    <div className="h-3 bg-slate-700/40 rounded-full w-4/5" />
                    <div className="h-3 bg-slate-700/40 rounded-full w-3/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 bg-slate-700/40 rounded-full w-12" />
                    <div className="h-2 bg-slate-700/40 rounded-full w-14" />
                  </div>
                  <div className="h-8 bg-slate-700/40 rounded-xl mt-4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-center">
              <p className="text-rose-300 text-sm">Failed to load projects. Is the backend running?</p>
              <p className="text-rose-400/60 text-xs mt-1">{error}</p>
            </div>
          ) : projectsData.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayedProjects.map((project, idx) => (
                  <ScrollReveal key={project.id} delay={(idx % 3) * 0.1}>
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
              
              {/* Show More Button */}
              {projectsData.length > 6 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="rounded-full border border-slate-700 bg-slate-800/40 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 active:scale-95"
                  >
                    {showAll ? 'Show Less' : `View All ${projectsData.length} Projects`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-slate-700/30 bg-slate-900/50 p-8 text-center text-slate-400 text-sm">
              No projects found.
            </div>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
};

export default Projects;