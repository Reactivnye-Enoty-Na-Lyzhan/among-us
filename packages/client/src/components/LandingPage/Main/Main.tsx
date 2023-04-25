import { Link } from 'react-router-dom';
import gameDescriptionText from './game-description';
import './Main.css';

export default function () {
  return (
    <main className="landing-page-main">
      <section className="landing-game-description">
        <p className="landing-game-description__text">{gameDescriptionText}</p>
        <Link to="/game" className="landing-game-description__join-link">
          <h2>Играйте сейчас и узнайте!</h2>
        </Link>
      </section>
    </main>
  );
}
