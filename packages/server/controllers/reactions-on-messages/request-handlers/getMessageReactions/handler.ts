// import { sequelize } from '../../../../utils/connectDataBase';
import { InferAttributes, QueryTypes } from 'sequelize';
import type { Emoji } from '../../../../models/forum/emoji';
import { GetRequestsHandler } from '../../../../types/requests';
import { sequelize } from '../../../../utils/connectDataBase';
import { WithMiddlewareErrorHandling } from '../../../../utils/errors/handlers/withMiddlewareErrorHandling';
import { MESSAGE_ID_PARAMETER_NAME } from '../../constants';
import { IncorrectDataError } from '../toggleMessageReaction/errors';

type RequestParams = {
  [MESSAGE_ID_PARAMETER_NAME]: string;
};

type ReactionCountEntry = Pick<InferAttributes<Emoji>, 'id' | 'symbol'> & {
  reactionsTotalCount: number;
};
type ResponseBody = ReactionCountEntry[];

const getMessageReactions: GetRequestsHandler<
  ResponseBody,
  RequestParams
> = async (request, response) => {
  const messageIDString = request.params[MESSAGE_ID_PARAMETER_NAME];
  const messageID = parseInt(messageIDString);
  const isCorrectID = Number.isInteger(messageID) && messageID >= 0;
  if (!isCorrectID) {
    throw new IncorrectDataError('message id must be not negative integer');
  }
  const reactionsCount = await sequelize.query<ReactionCountEntry>(
    dbQuery({ messageID }),
    {
      type: QueryTypes.SELECT,
      raw: true,
    }
  );

  response.send(reactionsCount);
};

export default WithMiddlewareErrorHandling(getMessageReactions);

const dbQuery = ({ messageID }: { messageID: number }) => `
SELECT emoji_id AS "emojiID", symbol, "reactionsTotalCount"  FROM (
  SELECT key::integer AS emoji_id , SUM(value::bool::int) AS "reactionsTotalCount"  
  FROM reactions_on_messages, jsonb_each_text(reactions)  
  WHERE message_id = ${messageID}
  GROUP BY key
) AS counts
JOIN emojis
ON counts.emoji_id = emojis.id  AND "reactionsTotalCount" > 0;
`;
