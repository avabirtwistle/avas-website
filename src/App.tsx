import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatementSection } from './components/StatementSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollAmbient } from './components/ScrollAmbient';
import { LoadingScreen } from './components/LoadingScreen';
import { useAppLoader } from './hooks/useAppLoader';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function App() {
  const loaderPhase = useAppLoader();
  const isReady = loaderPhase === 'done';

  useSmoothScroll(isReady);
  useScrollAnimations(isReady);

  return (
    <>
      <LoadingScreen phase={loaderPhase} />
      <ScrollAmbient />
      <Header />
      <main>
        <HeroSection showChip={isReady} />
        <StatementSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
