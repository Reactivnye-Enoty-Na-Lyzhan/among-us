import gameDescriptionText from './game-description-text';
import './Main.css';

export default function () {
  return (
    <main className="main">
      <section className="game-description">
        <p className="game-description__text">{gameDescriptionText}</p>
        <a href="" className="game-description__join-link">
          <h2>Play now and find out!</h2>
        </a>
      </section>
    </main>
  );
}
