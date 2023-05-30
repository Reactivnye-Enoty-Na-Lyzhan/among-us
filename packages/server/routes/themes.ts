import { Router } from 'express';
import { addThemeValidation } from '../utils/validation/requestValidation';
import { addTheme, getTheme } from '../controllers/themes';

const router = Router();

router.post('/', addThemeValidation, addTheme);
router.get('/', getTheme);

export default router;
