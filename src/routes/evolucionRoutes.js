import { Router } from "express";
import { cargarEvolucion } from "../controllers/evolucionController.js";

const router= Router()

router.post('/', cargarEvolucion)

export default router