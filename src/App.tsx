import { Dock, SideNav } from './components/Chrome';
import {
  Contact,
  Doodles,
  Experience,
  Header,
  Intro,
  Toolkit,
} from './components/Sections';
import Work from './components/Work';

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to projects
      </a>
      <SideNav />
      <main className="col" id="overview">
        <Header />
        <Intro />
        <Work />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Doodles />
      <Dock />
    </>
  );
}
