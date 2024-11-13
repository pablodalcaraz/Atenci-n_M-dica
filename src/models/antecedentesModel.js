import connexion from "../database/db.js";

export const insertarAntecedente = async (id_consulta, descripcion_antecedente, fecha_desde,fecha_hasta) =>{
    try {
        const connection = await connexion
        const query = `
            INSERT INTO antecedentes(id_consulta, descripcion_antecedente, fecha_desde, fecha_hasta)
            VALUES (?, ?, ?, ?)        
            `
        const params = [
            id_consulta, 
            descripcion_antecedente, 
            fecha_desde,
            fecha_hasta || null
        ]
        const [results] = await connection.execute(query,params)
        return results
    } catch (error) {
        console.error('❌ Error al insertarAntecedente:', error);
        throw error;
    }
}
export const obtenerAntecedentePorPacienteYMedico  = async (dni_paciente, id_medico) => {
    try {
        const connection = await connexion
        const query = `
        SELECT an.id_antecedentes, an.id_consulta, an.descripcion_antecedente, an.fecha_desde, an.fecha_hasta
        FROM antecedentes an
        JOIN consulta c ON c.id_consulta = an.id_consulta
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN agenda ag ON ag.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = ag.id_especialidad_medico
        WHERE t.dni_paciente = ? AND em.id_medico = ?
        `

        const [results] = await connection.execute(query, [dni_paciente, id_medico])
       
        return results

    } catch (error) {
        console.error('❌ Error al obtenerAntecedentePorPacienteYMedico', error)
        throw error
    }
}

export const obtenerAntecedentePorId = async (id_antecedentes, id_consulta) => {
    try {
        const connection = await connexion
        const query = `
        SELECT *
        FROM antecedentes
        WHERE id_antecedentes = ? AND id_consulta = ?
        `
        const [results] = await connection.execute(query,[id_antecedentes,id_consulta])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAntecedentePorId:', error)
        throw error
    }
}

export const editarAntecedente = async (id_antecedentes, id_consulta, descripcion_antecedente, fecha_desde, fecha_hasta) => {
    try {
        const connection = await connexion;
        const query = `
        UPDATE antecedentes
        SET 
            descripcion_antecedente = COALESCE(?, descripcion_antecedente),
            fecha_desde = COALESCE(?, fecha_desde), 
            fecha_hasta = COALESCE(?, fecha_hasta)
        WHERE id_antecedentes = ? AND id_consulta = ?
        `;
        const params = [   
            descripcion_antecedente || null, 
            fecha_desde || null,
            fecha_hasta || null,
            id_antecedentes,
            id_consulta
        ];
        const [result] = await connection.execute(query, params);
        return result;
    } catch (error) {
        console.error('❌ Error al editarAntecedente:', error);
        throw error;
    }
};
