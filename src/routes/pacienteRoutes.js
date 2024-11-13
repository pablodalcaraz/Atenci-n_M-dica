import { Router } from "express";
import { mostrarPaciente } from "../controllers/pacienteController.js";

const router = Router()

router.post('/', mostrarPaciente, (req,res) => {
    res.render('patientHeader')
})

export default router