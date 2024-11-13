import { Router } from 'express';
import { iniciarConsulta} from "../controllers/consultaController.js";
import { cargarDiagnostico } from '../controllers/diagnosticoController.js';
import { cargarEvolucion } from '../controllers/evolucionController.js';
import { cerrarConsulta } from '../controllers/cerrarController.js';
import { cargarAlergia } from '../controllers/alergiaController.js';
import { cargarAntecedente } from '../controllers/antecedentesController.js';
import { cargarHabito } from '../controllers/habitoController.js';
import { cargarMedicamento } from '../controllers/medicamentosController.js';


const router = Router()

router.post('/', iniciarConsulta)
router.post('/diagnostico', cargarDiagnostico)
router.post('/evolucion', cargarEvolucion)
router.post('/cerrar', cerrarConsulta)
router.post('/alergia', cargarAlergia)
router.post('/antecedente', cargarAntecedente)
router.post('/habito', cargarHabito)
router.post('/medicamento', cargarMedicamento)

export default router