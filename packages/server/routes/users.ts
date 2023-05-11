import { Router } from 'express';
import { createUser } from '../controllers/users';
import { createUserValidation } from '../utils/validation/requestValidation';

const router = Router();

router.post('/create', createUserValidation, createUser);

export default router;
