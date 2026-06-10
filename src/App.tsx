import { useEffect, useState } from 'react';
import clsx from 'clsx';
import WorldCanvas from '@/components/WorldCanvas';
import Hud from '@/components/Hud';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import AiAgents from '@/components/sections/AiAgents';
import Contact from '@/components/sections/Contact';
import styles from './App.module.css';

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setBooted(true), 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <a href="#contact" className={styles.skipLink}>
        Skip to contact
      </a>

      <WorldCanvas />

      <main className={styles.main}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AiAgents />
        <Contact />
      </main>

      <Hud />

      {/* subtle CRT scanlines + vignette over the world */}
      <div className={styles.grade} aria-hidden="true" />

      <div className={clsx(styles.boot, booted && styles.bootDone)} aria-hidden="true">
        <span className={styles.bootText}>ENTERING WORLD…</span>
      </div>
    </>
  );
}
