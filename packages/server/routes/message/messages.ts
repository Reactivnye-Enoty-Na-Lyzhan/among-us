import { Router } from 'express';
import { getMessages, postMessage } from '../../controllers/message/messages';

export const router = Router();

router.post('/', postMessage);

router.get('/', getMessages);
