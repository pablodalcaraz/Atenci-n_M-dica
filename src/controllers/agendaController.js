import { obtenerTurnoPorIdMedico } from "../models/turnoModel.js"
import { obtenerEspecialidadesPorMedico } from "../models/especialidadesModel.js";
import { obtenerTurnosPorFechaYEspecialidad } from "../models/turnoModel.js";
import { obtenerPacientePorIdMedico } from "../models/pacienteModel.js";
import { formaterFecha } from "../scripts/dateFormatter.js";



export const mostrarTurnosPorMedico = async (req,res) => {
    const id_medico = req.session.medico?.id_medico; 
    if (!id_medico) { 
        return res.redirect('/') 
    }
    try {
        const turnos = await obtenerTurnoPorIdMedico(id_medico) || []
        const especialidades = await obtenerEspecialidadesPorMedico(id_medico) || []
        const paciente = await obtenerPacientePorIdMedico(id_medico) || []
        return res.render('agenda', {
            turnos : turnos || [],
            medico: req.session.medico,
            especialidades,
            paciente
        })
    } catch (error) {
        console.error('Error al mostrarTurnosPorMedico:', error)
        return res.status(500).send('Error interno del servidor')
    }
}


export const aplicarFiltros = async (req,res) => {
    const { nuevaFecha, nombre_especialidad } = req.body
    console.log('Ejecutando aplicarFiltros', req.body);
    const id_medico = req.session.medico?.id_medico; 
    if (!id_medico) { 
        return res.redirect('/'); 
    } 
    try {
        const turnos = await obtenerTurnosPorFechaYEspecialidad(nuevaFecha, nombre_especialidad, id_medico)
        const especialidades = await obtenerEspecialidadesPorMedico(id_medico)
        const paciente = await obtenerPacientePorIdMedico(id_medico)
        turnos.forEach((turno) => {
            turno.fecha_turno = formaterFecha(new Date(turno.fecha_turno))
        })
        
        res.render('agenda', {
            turnos: turnos || [], 
            medico: req.session.medico,
            especialidades,
            paciente
            
        })
    } catch (error) {
        console.error('Error al aplicarFiltros:', error);
        return res.status(500).send('Error interno del servidor');
    }
}



