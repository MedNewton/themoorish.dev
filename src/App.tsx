import { useState } from 'react';
import Preloader from './components/Preloader';
import StickyNav from './components/StickyNav';
import Masthead from './components/Masthead';
import Ticker from './components/Ticker';
import FrontPage from './components/FrontPage';
import TradePages from './components/TradePages';
import Dispatches from './components/Dispatches';
import SpecialReport from './components/SpecialReport';
import Letters from './components/Letters';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <a className="skip-link" href="#front-page">
        Skip to content
      </a>
      <StickyNav />
      <Masthead ready={ready} />
      <Ticker />
      <main>
        <FrontPage ready={ready} />
        <TradePages />
        <Dispatches />
        <SpecialReport />
        <Letters />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
