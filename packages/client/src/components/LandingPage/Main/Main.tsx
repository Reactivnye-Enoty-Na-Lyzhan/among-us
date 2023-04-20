import { Link } from 'react-router-dom';
import gameDescriptionText from './game-description-text';
import './Main.css';

export default function () {
  return (
    <main className="main">
      <section className="game-description">
        <p className="game-description__text">{gameDescriptionText}</p>
        <Link to="/game" className="game-description__join-link">
          <h2>Играйте сейчас и узнайте!</h2>
        </Link>
      </section>
    </main>
  );
}
