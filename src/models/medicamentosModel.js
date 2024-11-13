import connexion from "../database/db.js";

export const insertarMedicamento = async (id_consulta, nombre_medicamento, fecha_registro, fecha_hasta) => {
    try {
        
        const query = `
        INSERT INTO medicamentos_en_uso(id_consulta, nombre_medicamento, fecha_registro, fecha_hasta)VALUES(?,?,?,?)
        `
        const [results] = await connexion.execute(query, [id_consulta, nombre_medicamento, fecha_registro,fecha_hasta])
        return results
    } catch (error) {
        console.error('❌ Error al insertarDiagnostico:', error);
        throw error;
    }
}
export const obtenerMedicamentoPorPacienteYMedico  = async (dni_paciente, id_medico) => {
    try {
       
        const query = `
        SELECT m.id_medicamento, m.id_consulta, m.nombre_medicamento, m.fecha_registro, m.fecha_hasta
        FROM medicamentos_en_uso m
        JOIN consulta c ON c.id_consulta = m.id_consulta
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN agenda ag ON ag.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = ag.id_especialidad_medico
        WHERE t.dni_paciente = ? AND em.id_medico = ?
        `
        const [results] = await connexion.execute(query, [dni_paciente, id_medico])
        return results

    } catch (error) {
        console.error('❌ Error al obtenerMedicamentoPorPacienteYMedico', error)
        throw error
    }
}

export const obtenerMedicamentoPorId = async (id_medicamento, id_consulta) => {
    try {
       
        const query = `
        SELECT *
        FROM medicamentos_en_uso
        WHERE id_medicamento = ? AND id_consulta = ?
        `
        const [results] = await connexion.execute(query,[id_medicamento,id_consulta])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerMedicamentoPorId:', error)
        throw error
    }
}

export const editarMedicamento = async (id_medicamento,id_consulta,nombre_medicamento,fecha_registro,fecha_hasta) => {
    try {
       
        const query = `
        UPDATE medicamentos_en_uso
        SET 
        nombre_medicamento = COALESCE(?,nombre_medicamento),
        fecha_registro = COALESCE(?,fecha_registro),
        fecha_hasta = COALESCE(?,fecha_hasta)
        WHERE id_medicamento = ? AND id_consulta = ?
        `
        const params = [
            
            nombre_medicamento || null,
            fecha_registro || null,
            fecha_hasta || null,
            id_medicamento,
            id_consulta
        ]
        const [results] = await connexion.execute(query,params)
        return results
    } catch (error) {
        console.error('❌ Error al editarMedicamento:', error); 
            throw error;
    }
}