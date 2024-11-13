import connexion from "../database/db.js";

export const insertarConsulta = async (id_turno) => {
    try {
     
        const query = `
            INSERT INTO consulta(id_turno, inicio, fin)
            VALUES(?,NOW(),?)
        `;
        const [result] = await connexion.execute(query, [id_turno, null]);
        const id_consulta = result.insertId;
        return id_consulta; 
    } catch (error) {
        console.error('❌ Error al insertarAtencion:', error);
        throw error;
    }
};

export const obtenerConsultasPorPaciente = async (dni_paciente)=> {
    try {
        
        const query = `
        SELECT c.*,t.motivo_consulta, d.descripcion_diagnostico,ed.estado_diagnostico, m.genero_medico, m.apellido_medico, m.nombre_medico 
        FROM consulta c
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN diagnosticos d ON d.id_consulta = c.id_consulta
        JOIN estado_diagnostico ed ON ed.id_estado_diagnostico = d.id_estado_diagnostico
        JOIN agenda a ON a.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = a.id_especialidad_medico
        JOIN medico m ON m.id_medico = em.id_medico
        WHERE t.dni_paciente = ?;
        `
        const [results] = await connexion.execute(query, [dni_paciente])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAtencionesPorPaciente', error)
        throw error
    }
}

export const obtenerConsutasPorPacienteYMedico = async (dni_paciente, id_medico) => {
    try {
        
        const query = `
        SELECT c.inicio AS FECHA, c.id_consulta AS ID_CONSULTA, t.motivo_consulta AS MOTIVO, d.descripcion_diagnostico AS DIAGNOSTICO, d.id_diagnostico AS ID_DIAGNOSTICO, ed.estado_diagnostico AS ESTADO, d.fecha_desde AS DESDE, d.fecha_hasta AS HASTA, e.descripcion_evolucion AS EVOLUCION, e.id_evolucion AS ID_EVOLUCION, e.fecha_registro AS REGISTRO
        FROM consulta c
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN diagnosticos d ON d.id_consulta = c.id_consulta
        JOIN estado_diagnostico ed ON ed.id_estado_diagnostico = d.id_estado_diagnostico
        JOIN evoluciones e ON e.id_consulta = c.id_consulta
        JOIN agenda ag ON ag.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = ag.id_especialidad_medico
        WHERE t.dni_paciente = ? AND em.id_medico = ?
        ORDER BY FECHA DESC
        `
        
        const [results] = await connexion.execute(query, [dni_paciente, id_medico])
        
        return results
    } catch (error) {
        console.error('❌ Error al obtenerConsutasPorPacienteYMedico', error)
        throw error
    }
}

export const actualizarConsulta = async (id_consulta) => {
    try {
       
        const query = `
        UPDATE consulta 
        SET consulta.fin = NOW()
        WHERE id_consulta = ?
        `
        await connexion.execute(query, [id_consulta])
    } catch (error) {
        console.error('❌ Error al actualizarConsulta', error)
        throw error
    }
}