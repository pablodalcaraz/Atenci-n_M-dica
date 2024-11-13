import { Router } from "express";
import { mostrarHistoriaClinica } from "../controllers/hceController.js";

const router = Router()

router.post('/', mostrarHistoriaClinica)

export default router