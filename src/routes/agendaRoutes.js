import { Router } from 'express';
import { mostrarTurnosPorMedico, aplicarFiltros } from '../controllers/agendaController.js';
import { iniciarConsulta } from '../controllers/consultaController.js';


const router = Router();

router.get('/', mostrarTurnosPorMedico);
router.post('/filtros', aplicarFiltros)
router.post('/consulta', iniciarConsulta);

export default router;