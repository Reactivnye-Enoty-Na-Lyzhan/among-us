import './Header.css';

export default function () {
  return (
    <header className="landing-page-header">
      <h1 className="landing-seo-title">AMONG US WEB BROWSER GAME</h1>
      <section className="landing-title-section">
        <svg className="landing-title-svg">
          <symbol id="game-title-href">
            <text
              className="landing-title-svg__text"
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle">
              AMONG US
            </text>
          </symbol>

          <g className="landing-title-copies">
            <use
              href="#game-title-href"
              className="landing-title-svg__text-copy"></use>
            <use
              href="#game-title-href"
              className="landing-title-svg__text-copy"></use>
          </g>
        </svg>
      </section>
    </header>
  );
}
