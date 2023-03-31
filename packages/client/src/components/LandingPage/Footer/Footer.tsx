import postcssLogo from 'images/landing-page/icons/postcss-logo.svg';
import reactLogo from 'images/landing-page/icons/react-logo.svg';
import viteLogo from 'images/landing-page/icons/vite-logo.svg';
import './Footer.css';

export default function () {
  return (
    <footer className="footer">
      <section className="technologies-list-section">
        <h3 className="technologies-list-section__header">
          Technologies Used:
        </h3>
        <ul className="technologies-list">
          <li className="technologies-list-entry">
            <a
              href="https://vitejs.dev/"
              className="technologies-list-entry__link"
              target="_blank">
              <img
                className="technologies-list-entry__logo"
                src={viteLogo}
                alt="vite logo"
              />
            </a>
          </li>
          <li className="technologies-list-entry">
            <a
              href="https://react.dev/"
              className="technologies-list-entry__link"
              target="_blank">
              <img
                className="technologies-list-entry__logo"
                src={reactLogo}
                alt="react logo"
              />
            </a>
          </li>
          <li className="technologies-list-entry">
            <a
              href="https://postcss.org/"
              className="technologies-list-entry__link"
              target="_blank">
              <img
                className="technologies-list-entry__logo"
                src={postcssLogo}
                alt="postcss logo"
              />
            </a>
          </li>
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
