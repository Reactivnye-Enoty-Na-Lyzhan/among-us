/* import { FC, memo, useCallback } from 'react';
import './Informer.css'
import Meeting from '../MeetingScreen/MeetingScreen';

type IConditionTable = {
  [k in 'meeting' | 'role']: () => JSX.Element;
};

const Informer: FC = () => {
  const hashReturner: IConditionTable = {
    meeting: () => <Meeting />,
    role: () => <></>
  };

  const currentPage = useCallback(() => {
    return hashReturner['meeting']();
  }, []);

  return currentPage();
};

export default memo(Informer);
 */
