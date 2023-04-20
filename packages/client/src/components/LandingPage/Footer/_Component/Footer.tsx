import { TechnologyEntry } from '../TechnologyEntry/TechnologyEntry';
import { MediaEntry } from '../MediaEntry/MediaEntry';
import postcssLogo from 'images/landing-page/icons/postcss-logo.svg';
import reactLogo from 'images/landing-page/icons/react-logo.svg';
import reduxLogo from 'images/landing-page/icons/redux-logo.svg';
import viteLogo from 'images/landing-page/icons/vite-logo.svg';
import './Footer.css';

export function LandingPageFooter() {
  return (
    <footer className="landing-page-footer">
      <section className="landing-technologies-section">
        <h3 className="landing-technologies-section__header">Технологии:</h3>
        <ul className="landing-technologies-list">
          <TechnologyEntry
            technologyWebsiteURL="https://vitejs.dev/"
            imageSource={viteLogo}
            imageAlt="vite logo"></TechnologyEntry>
          <TechnologyEntry
            technologyWebsiteURL="https://react.dev/"
            imageSource={reactLogo}
            imageAlt="react logo"></TechnologyEntry>
          <TechnologyEntry
            technologyWebsiteURL="https://redux.js.org/"
            imageSource={reduxLogo}
            imageAlt="redux logo"></TechnologyEntry>
          <TechnologyEntry
            technologyWebsiteURL="https://postcss.org/"
            imageSource={postcssLogo}
            imageAlt="postcss logo"></TechnologyEntry>
        </ul>
      </section>
      <section className="landing-media-section">
        <ul className="landing-media-entries">
          <MediaEntry
            linkName="GitHub"
            linkIcon="icon-github"
            linkURL="https://github.com/Reactivnye-Enoty-Na-Lyzhan/among-us"></MediaEntry>
        </ul>
      </section>
    </footer>
  );
}
