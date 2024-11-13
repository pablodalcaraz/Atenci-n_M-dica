import { Router } from "express";
import { obtenerAlergia, cargarAlergia } from "../controllers/alergiaController.js";

const router = Router()

router.get('/:id_alergia/:id_consulta', obtenerAlergia); 
router.post('/', cargarAlergia )


export default router