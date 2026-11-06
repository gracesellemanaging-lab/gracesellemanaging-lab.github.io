import useScrollReveal from './hooks/useScrollReveal';
import { BackgroundDecor, CursorGlow, ScrollProgress } from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useScrollReveal();

  return (
    <>
      <BackgroundDecor />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
