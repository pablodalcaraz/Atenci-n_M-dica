import { Router } from "express";
import {obtenerMedicamento, cargarMedicamento } from '../controllers/medicamentosController.js'

const router = Router()

router.get('/:id_medicamento/:id_consulta', obtenerMedicamento)
router.post('/', cargarMedicamento)

export default router