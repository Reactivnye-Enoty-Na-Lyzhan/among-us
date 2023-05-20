import { Router } from 'express';
import { getPostById, getPosts } from '../../controllers/post/posts';

export const router = Router();

router.post('/', getPostById);

router.get('/', getPosts);
