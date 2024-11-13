import { obtenerPacientePorDni } from "../models/pacienteModel.js";
import { obtenerConsultasPorPaciente } from "../models/consultaModel.js";
import { formaterFechaCompleta } from "../scripts/dateFormatter.js";
import { formaterHoraSola } from "../scripts/dateFormatter.js";
import { formaterFecha } from "../scripts/dateFormatter.js";
import { calcularEdad } from "../scripts/dateFormatter.js";

export const mostrarHistoriaClinica = async (req, res) => {
    const medico = req.session.medico;
    if (!medico) {
        return res.redirect('/');
    }
    try {
        const { dni_paciente } = req.body
        if (!dni_paciente) {
            return res.status(400).send('El dni del paciente es requerido')
        }
        const paciente = await obtenerPacientePorDni(dni_paciente)
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado')
        }
        const atenciones = await obtenerConsultasPorPaciente(dni_paciente)
        if (!atenciones) {
            return res.status(404).send('No se encontraron atenciones')
        }
        
        atenciones.forEach(atencion => {
            atencion.inicio = formaterFechaCompleta(new Date(atencion.inicio))
        })
        atenciones.forEach(atencion => {
            atencion.fin = formaterHoraSola(new Date(atencion.fin))
        })
        
        const fechaNacimiento = new Date(paciente.fecha_nacimiento)
        const edad = calcularEdad(fechaNacimiento)

        paciente.fecha_nacimiento = formaterFecha(new Date(fechaNacimiento))

        res.render('hce', {
            medico: medico,
            paciente,
            edad,
            atenciones,
            });
    } catch (error) {
        console.error('❌ Error al mostrarHistoriaClinica', error)
        res.status(500).send('Error interno del servidor');
    }
    
};


