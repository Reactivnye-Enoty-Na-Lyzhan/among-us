import './LoaderScreen.css';

export function LoaderScreen() {
  return (
    <div className="loader">
      <div className="loader__stars"></div>
      <div className="loader__stars loader__stars_position_middle"></div>
      <div className="loader__rocket-container">
        <div className="loader__flame"></div>
        <div className="loader__rocket"></div>
      </div>
      <p className="loader__title">Доставляем удовольствие. Ожидайте</p>
    </div>
  );
}
