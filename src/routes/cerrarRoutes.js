import { Router } from 'express';
import { cerrarConsulta } from '../controllers/cerrarController.js';

const router = Router()

router.post('/', cerrarConsulta)

export default router