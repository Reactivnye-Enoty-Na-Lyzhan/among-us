import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form/Form';
import LeaveGame from './LeaveGame/LeaveGame';
import { useActions } from '@/hooks/useActions';
import { useCreateGameMutation } from '@/store/game/game.api';
import { InputsParamsType } from '@/utils/gameParams';
import './CreateGame.css';

// Создание новой игры
const CreateGame: FC = () => {
  const [formStep, setFormStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Запросы
  const [createServerGame] = useCreateGameMutation();

  const { setGame, setGameStatus } = useActions();
  const navigate = useNavigate();

  const heading =
    formStep === 1 ? 'Установите параметры игры' : 'Вы почти готовы';

  // Создание игры
  const createGame = async (values: InputsParamsType) => {
    // Действия для создания игры
    const game = await createServerGame({
      title: values.title,
      params: {
        impostors: Number(values.impostor),
        discussion: Number(values.discussion),
        meetings: Number(values.meeting),
        interval: Number(values.interval),
      }
    });

    if ('error' in game) return;

    setGame(game.data);
    setGameStatus('characterSelection');
    setIsProcessing(false);
    navigate('/game');
  };

  const changeFormStep = (step: number) => {
    setFormStep(step);
  };

  // Обработчик формы
  const handleFormSubmit = useCallback((values: InputsParamsType) => {
    if (isProcessing) return;

    setIsProcessing(true);
    createGame(values);
  }, []);

  return (
    <div className="create-game create-game_spacing_outer">
      <h1 className="create-game__title">{heading}</h1>
      <div className="create-game__container">
        <div className="create-game__crewman"></div>
        <Form
          formStep={formStep}
          onSubmit={handleFormSubmit}
          changeStep={changeFormStep}
        />
      </div>
      <LeaveGame />
    </div>
  );
};

export default memo(CreateGame);
