import { ReactionsOnMessage } from '../../../../models/forum/reactionsOnMessage';
import { IncorrectDataError } from './errors';
import { WithMiddlewareErrorHandling } from '../../../../utils/errors/handlers/withMiddlewareErrorHandling';
import { SUCCESSFUL_RESPONSE } from '../../constants';
import { RequestsHandler, WithoutParamsRequest } from '../../types';

type RequestBody = {
  message_id: number;
  user_id: number;
  reaction_id: number;
};
type RequestType = WithoutParamsRequest<RequestBody>;

const toggleMessageReaction: RequestsHandler<RequestType> = async (
  request,
  response,
  next
) => {
  try {
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
        [reaction_id]: reaction_id,
      },
    });

    const currentValue = reactionsEntry.reactions[reaction_id];
    const toggledValue = currentValue === 1 ? 0 : 0;
    reactionsEntry.reactions[reaction_id] = toggledValue;
    reactionsEntry.changed('reactions', true);
    await reactionsEntry.save();

    response.send(SUCCESSFUL_RESPONSE);
  } catch (error) {
    next(error);
  }
};

export default WithMiddlewareErrorHandling(toggleMessageReaction);
