import { Router } from 'express';
import {
  getMessageReactions,
  getReactionsList,
  toggleMessageReaction,
} from '../../../controllers/reactions-on-messages';
import { MESSAGE_ID_PARAMETER_NAME } from '../../../controllers/reactions-on-messages/constants';

const router = Router();

router.post('/toggle-reaction', toggleMessageReaction);
router.get('/get-list', getReactionsList);
router.get(`/:${MESSAGE_ID_PARAMETER_NAME}`, getMessageReactions);

export { router };
