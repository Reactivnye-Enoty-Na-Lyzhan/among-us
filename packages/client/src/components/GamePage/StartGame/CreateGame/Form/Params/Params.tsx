import { FC, PropsWithChildren, memo } from "react";
import { ResetValuesType } from "@/hooks/useParamsValidation.types";
import './Params.css';

type Props = PropsWithChildren & {
  onReset: ResetValuesType,
};

const Params: FC<Props> = (props) => {
  const { children, onReset } = props;

  return (
    <>
      <ul className="create-game__params">
        {children}
      </ul>
      <button
        className="create-game__reset-params"
        onClick={onReset}
        type="button">
        Сбросить настройки
      </button>
    </>
  );
};

export default memo(Params);
