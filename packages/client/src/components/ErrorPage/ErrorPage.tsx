import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

type Props = {
  code: string;
  message: string;
  linkLabel: string;
};

function ErrorPage({ code, message, linkLabel }: Props) {
  const navigate = useNavigate();
  const goBack: MouseEventHandler<HTMLAnchorElement> = evt => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="error-page">
      <h1 className="error-page__code">{code}</h1>
      <p className="error-page__message">{message}</p>
      <Link to=".." className="error-page__return-link" onClick={goBack}>
        {linkLabel}
      </Link>
    </div>
  );
}

export const Error404 = () => (
  <ErrorPage
    code="404"
    message="Игрок, ты, кажется, вышел не в тот шлюз.
                                    Здесь пустота..."
    linkLabel="Давай вернёмся назад?"
  />
);
export const Error500 = () => (
  <ErrorPage
    code="5**"
    message="Центр управления потерял связь с кораблём.
                                    Никто не знает, что там может происходить прямо сейчас..."
    linkLabel="Можем попробовать вернуться назад?"
  />
);
