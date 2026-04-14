import styles from './App.module.css';
import { About } from '@/components/about/About';
import { Cursor } from '@/components/cursor/Cursor';
import { Home } from '@/components/home/Home';

export default function App() {
  return (
    <>
      <div className={styles.frame}>
        <Home />
        <About />
      </div>
      <Cursor />
    </>
  );
}
