import { Classifieds } from './components/Classifieds';
import { Dispatches } from './components/Dispatches';
import { Footer } from './components/Footer';
import { FrontPage } from './components/FrontPage';
import { Markets } from './components/Markets';
import { Masthead } from './components/Masthead';
import { SpecialReport } from './components/SpecialReport';
import { Ticker } from './components/Ticker';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.desk}>
      <div className={styles.sheet}>
        <Ticker />
        <div className={styles.page}>
          <Masthead />
          <main>
            <FrontPage />
            <Markets />
            <Dispatches />
            <SpecialReport />
            <Classifieds />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
