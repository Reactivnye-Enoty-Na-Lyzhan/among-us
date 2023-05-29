import {
  getReactionsList,
  toggleMessageReaction,
} from '../../../controllers/reactions-on-messages';
import { Router } from 'express';

const router = Router();

router.post('/toggle-reaction', toggleMessageReaction);
router.get('/get-list', getReactionsList);

export { router };
