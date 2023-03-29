import './Header.css';

export default function () {
  return (
    <header>
      <div className="header-container">
        <section className="game-title-section">
          <svg className="game-title__svg">
            <symbol id="game-title-href">
              <text
                className="game-title__svg-text"
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle">
                AMONG US
              </text>
            </symbol>

            <g className="g-ants">
              <use
                href="#game-title-href"
                className="game-title__svg-text-copy"></use>
              <use
                href="#game-title-href"
                className="game-title__svg-text-copy"></use>
            </g>
          </svg>
        </section>
      </div>
    </header>
  );
}
