import { Emoji } from '../../../../models/forum/emoji';
import { GetRequestsHandler } from '../../../../types/requests';
import { WithMiddlewareErrorHandling } from '../../../../utils/errors/handlers/withMiddlewareErrorHandling';
import { InferAttributes } from 'sequelize';

type ResponseBody = InferAttributes<Emoji>[];
const getReactionsList: GetRequestsHandler<ResponseBody> = async (
  _,
  response
) => {
  const dbResponse = await Emoji.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  });
  const reactionsList = dbResponse.map(row => row.toJSON());
  console.log(`GET REACTIONS LIST: ${JSON.stringify(reactionsList)}`);

  response.json(reactionsList);
};

export default WithMiddlewareErrorHandling(getReactionsList);
