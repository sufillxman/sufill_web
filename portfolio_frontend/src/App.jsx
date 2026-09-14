import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CustomCursor } from './components/animations/CustomCursor';
import { Agentation } from 'agentation';

function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative z-10">
        <CustomCursor />
        <Navbar />
        {/*
          Hero gets full-bleed (no horizontal padding) so it can
          control its own max-width internally (different on mobile vs desktop).
          All other sections get standard padding.
        */}
        <Hero />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
          <About />
          <Skills />
          <Resume />
          <Projects />
          <Contact />
        </main>
        <Footer />
        {import.meta.env.DEV && <Agentation />}
      </div>
    </div>
  );
}

export default App;
