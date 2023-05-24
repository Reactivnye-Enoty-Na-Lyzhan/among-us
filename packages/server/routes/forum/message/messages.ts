import { Router } from 'express';
import {
  getMessages,
  postMessage,
  deleteMessage,
  replyToMessage,
} from '../../../controllers/message/messages';

export const router = Router();

router.post('/:postId/messages', postMessage);

router.get('/', getMessages);

router.delete('/:messageId', deleteMessage);

router.post('/reply', replyToMessage);
