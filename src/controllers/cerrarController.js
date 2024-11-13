import { actualizarEstadoTurno } from "../models/turnoModel.js";
import { obtenerDiagnosticoPorIdConsulta } from "../models/diagnosticoModel.js";
import { obtenerEvolucionesPorIdConsulta } from "../models/evolucionModel.js";
import { actualizarConsulta } from "../models/consultaModel.js";

export const cerrarConsulta = async (req,res) => {
    const {id_consulta} = req.body
    console.log('ID de consulta recibido:', id_consulta); 
    try {
        const [diagnosticos,evoluciones] = await Promise.all([
            obtenerDiagnosticoPorIdConsulta(id_consulta),
            obtenerEvolucionesPorIdConsulta(id_consulta)
        ])
        if(diagnosticos.length === 0 || evoluciones.length === 0){
            return res.status(400).json({ message: "*Debe cargar al menos un diagnóstico y una evolución antes de cerrar la consulta." })
        }
        await actualizarConsulta(id_consulta)
        await actualizarEstadoTurno(id_consulta)
        return res.redirect('agenda')
    } catch (error) {
        console.error('❌ Error al cerrarConsulta:', error)
        return res.status(500).send('Error interno del servidor')
    }
}