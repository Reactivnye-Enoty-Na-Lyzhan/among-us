import { FC, memo } from "react";
import useParamsValidation from "@/hooks/useParamsValidation";
import NavigationButton from "../NavigationButton/NavigationButton";
import Params from "./Params/Params";
import GameParam from "../GameParam/GameParam";
import GameName from "./GameName/GameName";
import {
  InputsParamsType,
  defaultValidityState,
  gameParams,
  inputDefaultValues
} from '../../../../../utils/gameParams';
import './Form.css';

type Props = {
  formStep: number,
  changeStep: (step: number) => void,
  onSubmit: (values: InputsParamsType) => void,
};

const Form: FC<Props> = (props) => {
  const {
    formStep,
    changeStep,
    onSubmit,
  } = props;

  const test = { defaultValues: inputDefaultValues, defaultValidityState };
  const {
    values,
    isFormValid,
    inputsValidity,
    handleChange,
    handleIncrease,
    handleDecrease,
    checkInputValidity,
    resetValues,
  } = useParamsValidation(test);

  // Изменение шага формы
  const handlePrevButton = () => {
    if (formStep > 1) {
      changeStep(formStep - 1);
    }
  };

  // Обработчик кнопки перехода по форме
  const handleNextButton = () => {
    if (formStep === 1) {
      changeStep(2);
      return;
    }

    onSubmit(values);
  };

  // Обработчик формы
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(values);
  };

  return (
    <>
      {formStep === 2 && (
        <NavigationButton
          title={"Назад"}
          handleClick={handlePrevButton} />
      )}
      <form
        className="create-game__form"
        onSubmit={handleFormSubmit}
        noValidate>
        <div className="create-game__form-container">
          {
            formStep === 1 &&
            <Params onReset={resetValues}>
              {gameParams.map(gameParam => (
                <GameParam
                  key={gameParam.name}
                  title={gameParam.title}
                  name={gameParam.name}
                  min={gameParam.min}
                  max={gameParam.max}
                  rangeUnit={gameParam.rangeUnit}
                  inputValue={values[gameParam.name]}
                  onChange={handleChange}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onBlur={checkInputValidity}
                  validity={inputsValidity[gameParam.name]}
                />
              ))}
            </Params>
          }
          {
            formStep === 2 &&
            <GameName
              value={values.title}
              validity={inputsValidity.title}
              onChange={handleChange}
              onBlur={checkInputValidity}
            />
          }
        </div>
      </form>
      <NavigationButton
        title="Создать игру"
        handleClick={handleNextButton}
        action="next"
        isFormValid={isFormValid} />
    </>
  );
};

export default memo(Form);
