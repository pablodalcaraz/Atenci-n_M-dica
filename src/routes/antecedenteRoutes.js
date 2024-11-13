import { Router } from "express";
import { obtenerAntecedente, cargarAntecedente } from "../controllers/antecedentesController.js";

const router = Router()

router.get('/:id_antecedentes/:id_consulta', obtenerAntecedente)
router.post('/', cargarAntecedente)

export default router