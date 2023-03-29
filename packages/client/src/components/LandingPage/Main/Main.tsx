import gameDescriptionText from './game-description-text';
import './Main.css';

export default function () {
  return (
    <main>
      <section className="game-description-section">
        <span className="game-description__text">{gameDescriptionText}</span>
        <a href="" className="game-description__join-link">
          <h2>Play now and find out!</h2>
        </a>
      </section>
    </main>
  );
}
