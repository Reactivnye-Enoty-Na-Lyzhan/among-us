import { FC, memo } from 'react';
import Voting from './Voting/Voting';
import Chat from './Chat/Chat';
import './EmergencyMeeting.css';

const EmergencyMeeting: FC = () => {
  return (
    <div className="emergency-meeting">
      <div className="emergency-meeting__tablet-screen">
        <Voting />
        <Chat />
      </div>
    </div>
  );
};

export default memo(EmergencyMeeting);
