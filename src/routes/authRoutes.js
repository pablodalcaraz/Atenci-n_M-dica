import { Router } from 'express';
import { getLogin, login } from '../controllers/authController.js';

const router = Router();

router.get('/', getLogin)
router.post('/login', login)

export default router;
