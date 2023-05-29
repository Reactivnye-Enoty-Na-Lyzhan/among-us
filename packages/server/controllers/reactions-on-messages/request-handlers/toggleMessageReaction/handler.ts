import { ReactionsOnMessage } from '../../../../models/forum/reactionsOnMessage';
import { PostRequestsHandler } from '../../../../types/requests';
import { WithMiddlewareErrorHandling } from '../../../../utils/errors/handlers/withMiddlewareErrorHandling';
import { SUCCESSFUL_RESPONSE } from '../../constants';
import { IncorrectDataError } from './errors';

type RequestBody = {
  message_id: number;
  user_id: number;
  reaction_id: number;
};

const toggleMessageReaction: PostRequestsHandler<RequestBody> = async (
  request,
  response
) => {
  const { message_id, user_id, reaction_id } = request.body;
  let [areCorrectIDs, incorrectIDName] = [true, ''];
  Object.entries({ message_id, user_id, reaction_id }).every(
    ([idName, idValue]) => {
      const isCorrectID = Number.isInteger(idValue) && idValue >= 0;
      if (!isCorrectID) {
        areCorrectIDs = false;
        incorrectIDName = idName;
      }
      return isCorrectID;
    }
  );

  if (!areCorrectIDs) {
    throw new IncorrectDataError(
      `${incorrectIDName}  must be not negative integer`
    );
  }

  const [reactionsEntry] = await ReactionsOnMessage.findOrCreate({
    where: {
      message_id,
      user_id,
    },
  });

  const currentValue = reactionsEntry.reactions[reaction_id];
  const toggledValue = !currentValue;
  reactionsEntry.reactions[`${reaction_id}`] = toggledValue;
  reactionsEntry.changed('reactions', true);
  await reactionsEntry.save();

  response.send(SUCCESSFUL_RESPONSE);
};

export default WithMiddlewareErrorHandling(toggleMessageReaction);
