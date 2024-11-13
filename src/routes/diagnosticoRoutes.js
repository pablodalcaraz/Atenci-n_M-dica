import { Router } from 'express';
import { cargarDiagnostico } from '../controllers/diagnosticoController.js';

const router = Router()

router.post('/', cargarDiagnostico)

export default router