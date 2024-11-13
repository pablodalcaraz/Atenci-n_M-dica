import { insertarConsulta } from "../models/consultaModel.js";
import { obtenerPacientePorDni } from "../models/pacienteModel.js";
import { formaterFecha, calcularEdad } from "../scripts/dateFormatter.js";
import { obtenerEstadosDiagnosticos } from "../models/diagnosticoModel.js";
import { obtenerTemplates } from "../models/templatesModel.js";
import { obtenerAlergias, obtenerImportanciaAlergia, obtenerAlergiaPorPacienteYMedico } from "../models/alergiaModel.js";
import { obtenerConsutasPorPacienteYMedico } from "../models/consultaModel.js";
import { obtenerAntecedentePorPacienteYMedico } from "../models/antecedentesModel.js";
import { obtenerHabitoPorPacienteYMedico } from "../models/habitoModel.js";
import { obtenerMedicamentoPorPacienteYMedico } from "../models/medicamentosModel.js";

export const iniciarConsulta = async (req, res) => {
    try {
        const { dni_paciente, id_turno } = req.body;
        if (!dni_paciente || !id_turno) {
            return res.status(400).send('DNI y id turno requeridos');
        }
        const paciente = await obtenerPacientePorDni(dni_paciente);
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }
        const id_medico = req.session.medico?.id_medico;
        if (!id_medico) {
            return res.redirect('/');
        }

        const id_consulta = await insertarConsulta(id_turno, id_medico);
        req.session.id_consulta = id_consulta;
        console.log('ID de atención médica guardado en la sesión:', req.session.id_consulta);

        const fechaNacimiento = new Date(paciente.fecha_nacimiento);
        const edad = calcularEdad(fechaNacimiento);

        paciente.fecha_nacimiento = formaterFecha(fechaNacimiento);
        
        const estado_diagnostico = await obtenerEstadosDiagnosticos(req, res);
        const templates = await obtenerTemplates(req, res);
        const historial = await obtenerConsutasPorPacienteYMedico(dni_paciente, id_medico);
        console.log('historial: ',historial)

        const alergiasPPYM = await obtenerAlergiaPorPacienteYMedico(dni_paciente, id_medico);
        alergiasPPYM.forEach(alergia => {
            alergia.fecha_desde = formaterFecha(new Date(alergia.fecha_desde));
            alergia.fecha_hasta = alergia.fecha_hasta ?formaterFecha(new Date(alergia.fecha_hasta)): 'En vigencia';
        });

        const antecedentesPPYM = await obtenerAntecedentePorPacienteYMedico(dni_paciente, id_medico);
        antecedentesPPYM.forEach(consulta => {
            consulta.fecha_desde = formaterFecha(new Date(consulta.fecha_desde));
            consulta.fecha_hasta =consulta.fecha_hasta? formaterFecha(new Date(consulta.fecha_hasta )): 'En vigencia';
        });

        const habitosPPYM = await obtenerHabitoPorPacienteYMedico(dni_paciente, id_medico);
        habitosPPYM.forEach(consulta => {
            consulta.fecha_desde = formaterFecha(new Date(consulta.fecha_desde));
            consulta.fecha_hasta =consulta.fecha_hasta? formaterFecha(new Date(consulta.fecha_hasta )): 'En vigencia';
        });

        const medicamentosPPYM = await obtenerMedicamentoPorPacienteYMedico(dni_paciente, id_medico);
        medicamentosPPYM.forEach(consulta => {
            consulta.fecha_registro = formaterFecha(new Date(consulta.fecha_registro));
        });
        medicamentosPPYM.forEach(consulta => {
            consulta.fecha_hasta =consulta.fecha_hasta? formaterFecha(new Date(consulta.fecha_hasta )): 'En vigencia';
        });

        historial.forEach(consulta => {
            consulta.FECHA = formaterFecha(new Date(consulta.FECHA));
            consulta.DESDE = formaterFecha(new Date(consulta.DESDE));
            consulta.HASTA = consulta.HASTA ? formaterFecha(new Date(consulta.HASTA)) : 'En vigencia';
            consulta.REGISTRO = formaterFecha(new Date(consulta.REGISTRO));
        });

        const alergias = await obtenerAlergias(req, res);
        const importancias = await obtenerImportanciaAlergia(req, res);

        return res.render('consulta', {
            medico: req.session.medico,
            id_consulta,
            paciente,
            edad,
            estado_diagnostico,
            templates,
            historial,
            alergias,
            importancias,
            historialAlergias: alergiasPPYM,
            historialAntecedentes: antecedentesPPYM,
            historialHabitos: habitosPPYM,
            historialMedicamentos: medicamentosPPYM
        });
    } catch (error) {
        console.error('❌ Error al iniciarConsulta:', error);
        return res.status(500).send('Error interno del servidor');
    }
};




