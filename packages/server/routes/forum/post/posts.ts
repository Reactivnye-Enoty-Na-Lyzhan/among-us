import { Router } from 'express';
import {
  getPostById,
  getPosts,
  postPost,
  deletePost,
  putPost,
} from '../../../controllers/post/posts';

export const router = Router();

router.post('/', postPost);

router.put('/', putPost);

router.get('/:postId', getPostById);

router.get('/', getPosts);

router.delete('/:postId', deletePost);
