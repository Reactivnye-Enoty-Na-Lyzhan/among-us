import { Router } from 'express';
import { getPostById, getPosts, postPost } from '../../controllers/post/posts';

export const router = Router();

router.post('/', postPost);

router.post('/', getPostById);

router.get('/', getPosts);
