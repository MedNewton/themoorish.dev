import { Dock, SideNav } from './components/Chrome';
import {
  Contact,
  Doodles,
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
        <Toolkit />
        <Contact />
      </main>
      <Doodles />
      <Dock />
    </>
  );
}
