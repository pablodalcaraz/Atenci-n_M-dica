import connexion from "../database/db.js";

/*export const obtenerTurnoPorIdAgenda = async (id_agenda)=> {
    try {
        const connection = await connexion
        const query = `
        SELECT t.*
        FROM turno t
        JOIN agenda a ON a.id_agenda = t.id_agenda
        WHERE t.id_agenda = ?
        `
        const [results] = await connection.execute(query, [id_agenda])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAgendaPorIdAgenda:', error);
        throw error;
    }
}*/

export const obtenerTurnoPorIdMedico = async (id_medico)=> {
    try {
        const connection = await connexion
        const query = `
        SELECT t.*, et.estado_turno,p.apellido_paciente, p.nombre_paciente
        FROM turno t 
        JOIN estado_turno et ON et.id_estado_turno = t.id_estado_turno
        JOIN agenda a ON a.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = a.id_especialidad_medico
        JOIN medico m ON m.id_medico = em.id_medico
        JOIN paciente p ON p.dni_paciente = t.dni_paciente 
        WHERE m.id_medico = ?
        ORDER BY t.fecha_turno ASC, t.hora_turno ASC
        `
        const [results] = await connection.execute(query, [id_medico])
        results.forEach(turno => {
            turno.fecha_turno = new Date(turno.fecha_turno).toLocaleDateString('es-AR', {
                day:'2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        });
       
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAgendaPorIdMedico:', error);
        throw error;
    }
}

export const obtenerTurnosPorFechaYEspecialidad = async (fecha_turno, nombre_especialidad,id_medico) => {
 
    try {
        const connection = await connexion
        const query = `
        SELECT t.*, et.estado_turno,p.apellido_paciente, p.nombre_paciente
        FROM turno t
        JOIN estado_turno et ON et.id_estado_turno = t.id_estado_turno
        JOIN agenda a ON a.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = a.id_especialidad_medico
        JOIN especialidad e ON e.id_especialidad = em.id_especialidad
        JOIN medico m ON m.id_medico = em.id_medico
        JOIN paciente p ON p.dni_paciente = t.dni_paciente 
        WHERE t.fecha_turno = ? AND e.nombre_especialidad = ? AND m.id_medico = ?
        ORDER BY t.hora_turno ASC;
        `
        const [results] = await connection.execute(query, [fecha_turno, nombre_especialidad, id_medico])

        return results
    } catch (error) {
        console.error('❌ Error al obtenerTurnosPorFechaYEspecialidad:', error);
        throw error;
    }
}

export const actualizarEstadoTurno = async (id_consulta) => {
    try {
        const connection = await connexion
        const query = `
        UPDATE turno t
        JOIN consulta c ON c.id_turno = t.id_turno
        SET t.id_estado_turno = 4
        WHERE c.id_consulta = ?;
        `
        const [result] = await connection.execute(query,[id_consulta])
        return result
    } catch (error) {
        console.error('❌ Error al actualizarEstadoConsulta:', error);
        throw error;
    }
}