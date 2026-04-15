import styles from './App.module.css';
import { About } from '@/components/about/About';
import { Cursor } from '@/components/cursor/Cursor';
import { Home } from '@/components/home/Home';
import { Works } from '@/components/works/Works';

export default function App() {
  return (
    <>
      <div className={styles.frame}>
        <Home />
        <About />
        <Works />
      </div>
      <Cursor />
    </>
  );
}
