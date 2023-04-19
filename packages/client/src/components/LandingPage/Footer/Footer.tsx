import postcssLogo from 'images/landing-page/icons/postcss-logo.svg';
import reactLogo from 'images/landing-page/icons/react-logo.svg';
import reduxLogo from 'images/landing-page/icons/redux-logo.svg';
import viteLogo from 'images/landing-page/icons/vite-logo.svg';
import './Footer.css';

function TechnologyEntry({
  technologyWebsiteURL,
  imageSource,
  imageAlt,
}: {
  technologyWebsiteURL: string;
  imageSource: string;
  imageAlt: string;
}) {
  return (
    <li className="technologies-list-entry">
      <a
        href={technologyWebsiteURL}
        className="technologies-list-entry__link"
        target="_blank">
        <img
          className="technologies-list-entry__logo"
          src={imageSource}
          alt={imageAlt}
        />
      </a>
    </li>
  );
}

export default function () {
  return (
    <footer className="footer">
      <section className="technologies-list-section">
        <h3 className="technologies-list-section__header">Технологии:</h3>
        <ul className="technologies-list">
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
      <section className="media-links-section">
        <ul className="media-links-list">
          <li className="media-link-entry">
            <a
              className="media-link-entry__link"
              href="https://github.com/Reactivnye-Enoty-Na-Lyzhan/among-us"
              target="_blank">
              <h3 className="icon-github media-link-entry__header">GitHub</h3>
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
