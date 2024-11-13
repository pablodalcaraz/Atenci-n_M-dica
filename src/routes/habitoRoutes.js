import { Router } from "express";
import { obtenerHabito,cargarHabito } from "../controllers/habitoController.js";

const router = Router()

router.get('/:id_habitos/:id_consulta', obtenerHabito)
router.post('/', cargarHabito)

export default router