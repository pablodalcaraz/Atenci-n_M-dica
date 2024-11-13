import connexion from "../database/db.js";

export const insertarHabito = async (id_consulta, descripcion_habito, fecha_desde, fecha_hasta) => {
    try {
       
        const query = `
        INSERT INTO habitos(id_consulta, descripcion_habito, fecha_desde, fecha_hasta)VALUES(?,?,?,?)
        `
        const params = [
            id_consulta, 
            descripcion_habito, 
            fecha_desde, 
            fecha_hasta || null
        ]
        const [results] = await connexion.execute(query,params)
        return results
    } catch (error) {
        console.error('❌ Error al insertarHabito:', error);
        throw error;
    }
}
export const obtenerHabitoPorPacienteYMedico  = async (dni_paciente, id_medico) => {
    try {
       
        const query = `
        SELECT h.id_habitos, h.id_consulta, h.descripcion_habito, h.fecha_desde, h.fecha_hasta
        FROM habitos h
        JOIN consulta c ON c.id_consulta = h.id_consulta
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN agenda ag ON ag.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = ag.id_especialidad_medico
        WHERE t.dni_paciente = ? AND em.id_medico = ?
        `
        const [results] = await connexion.execute(query, [dni_paciente, id_medico])
        return results

    } catch (error) {
        console.error('❌ Error al obtenerHabitoPorPacienteYMedico', error)
        throw error
    }
}

export const obtenerHabitoPorId = async (id_habitos, id_consulta) => {
    try {
        
        const query = `
        SELECT *
        FROM habitos
        WHERE id_habitos = ? AND id_consulta = ?
        `
        const [results] = await connexion.execute(query,[id_habitos,id_consulta])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerHabitoPorId:', error)
        throw error
    }
}

export const editarHabito = async (id_habitos,id_consulta,descripcion_habito,fecha_desde, fecha_hasta) => {
    try {
        
        const query = `
        UPDATE habitos
        SET 
        id_consulta = COALESCE(?,id_consulta),
        descripcion_habito = COALESCE(?,descripcion_habito),
        fecha_desde = COALESCE(?,fecha_desde), 
        fecha_hasta = COALESCE(?,fecha_hasta)
        WHERE id_habitos = ?
        `
        const params = [
            id_consulta,
            descripcion_habito || null,
            fecha_desde || null, 
            fecha_hasta || null,
            id_habitos
        ]
        const [results] = await connexion.execute(query,params)
        return results
    } catch (error) {
        console.error('❌ Error al editarHabito:', error); 
            throw error;
    }
}