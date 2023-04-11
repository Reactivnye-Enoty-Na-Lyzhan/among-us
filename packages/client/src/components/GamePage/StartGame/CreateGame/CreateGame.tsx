import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form/Form';
import LeaveGame from './LeaveGame/LeaveGame';
import { InputsParamsType } from '@/utils/gameParams';
import './CreateGame.css';

type Props = {
  onStart: () => void;
};

// Создание новой игры
const CreateGame: FC<Props> = props => {
  const { onStart } = props;

  const [formStep, setFormStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const navigate = useNavigate();

  const heading =
    formStep === 1 ? 'Установите параметры игры' : 'Вы почти готовы';

  // Создание игры
  const createGame = (values: InputsParamsType) => {
    // Действия для создания игры
    onStart();
    // Просто вывод данных в консоль (прототип)
    console.log(values);
    setIsProcessing(false);
    navigate('../assembling');
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
