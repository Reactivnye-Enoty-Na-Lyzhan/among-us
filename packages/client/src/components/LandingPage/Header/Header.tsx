import './Header.css';

export default function () {
  return (
    <header className="header">
      <section className="game-title-section">
        <svg className="game-title-svg">
          <symbol id="game-title-href">
            <text
              className="game-title-svg__text"
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle">
              AMONG US
            </text>
          </symbol>

          <g className="game-title-text-copies">
            <use
              href="#game-title-href"
              className="game-title-svg__text-copy"></use>
            <use
              href="#game-title-href"
              className="game-title-svg__text-copy"></use>
          </g>
        </svg>
      </section>
    </header>
  );
}
