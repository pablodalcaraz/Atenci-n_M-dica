import connexion from "../database/db.js";

export const obtenerAlergias = async (req,res) => {
    try {
        const connection = await connexion
        const query = `
        SELECT * 
        FROM descripcion_alergia
        `
        const [results] = await connection.execute(query)
        
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAlergias', error)
        throw error
    }
}

export const obtenerImportanciaAlergia = async (req, res) => {
    try {
        const connection = await connexion
        const query = `
        SELECT * 
        FROM importancia_alergia
        `
        const [results] = await connection.execute(query)
        
        return results
    } catch (error) {
        console.error('❌ Error al obtenerImportanciaAlergia', error)
        throw error
    }
}

export const insertarAlergia = async (id_consulta, id_descripcion_alergia,id_importancia_alergia,fecha_desde,fecha_hasta) => {
    try {
        const connection = await connexion
        const query = `
        INSERT INTO alergias(id_consulta, id_descripcion_alergia,id_importancia_alergia,fecha_desde,fecha_hasta)VALUES(?,?,?,?,?)
        ` 
        const params = [
            id_consulta, 
            id_descripcion_alergia,
            id_importancia_alergia,
            fecha_desde,
            fecha_hasta || null
        ]
        const [result] = await connection.execute(query, params);
      
        return result;
    } catch (error) {
        console.error('❌ Error al insertarAlergia:', error);
        throw error;
    }
}
export const obtenerAlergiaPorId = async (id_alergia,id_consulta) => {
    try {
        const connection = await connexion
        const query = `
        SELECT * 
        FROM alergias 
        WHERE id_alergia = ? AND id_consulta = ?;
        `
        const [results] = await connection.execute(query,[id_alergia,id_consulta])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAlergiaPorId:', error);
        throw error;
    }
}

export const obtenerAlergiaPorPacienteYMedico  = async (dni_paciente, id_medico) => {
    try {
        const connection = await connexion
        const query = `
        SELECT da.descripcion_alergia,ia.nombre_importancia_alergia,a.id_consulta,a.id_alergia, a.fecha_desde, a.fecha_hasta
        FROM alergias a
        JOIN descripcion_alergia da ON da.id_descripcion_alergia = a.id_descripcion_alergia
        JOIN importancia_alergia ia ON ia.id_importancia_alergia = a.id_importancia_alergia
        JOIN consulta c ON c.id_consulta = a.id_consulta
        JOIN turno t ON t.id_turno = c.id_turno
        JOIN agenda ag ON ag.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = ag.id_especialidad_medico
        WHERE t.dni_paciente = ? AND em.id_medico = ?
        ORDER BY c.id_consulta ASC
        `
        const [results] = await connection.execute(query, [dni_paciente, id_medico])
        return results

    } catch (error) {
        console.error('❌ Error al obtenerAlergiaPorPacienteYMedico', error)
        throw error
    }
}

export const editarAlergia = async (id_alergia,id_consulta,id_descripcion_alergia,id_importancia_alergia,fecha_desde, fecha_hasta) => {
    try {
        const connection = await connexion
        const query = `
        UPDATE alergias
        SET 
           id_descripcion_alergia = COALESCE(?, id_descripcion_alergia),
           id_importancia_alergia = COALESCE(?, id_importancia_alergia),
           fecha_desde = COALESCE(?, fecha_desde), 
           fecha_hasta = COALESCE(?, fecha_hasta)
           WHERE id_alergia = ? AND id_consulta = ?
        `
        const params = [   
            id_descripcion_alergia , 
            id_importancia_alergia , 
            fecha_desde,
            fecha_hasta, 
            id_alergia, 
            id_consulta
        ]
        const [results] = await connection.execute(query,params)
        return results
    } catch (error) {
        console.error('❌ Error al editarAlergia:', error); 
            throw error;
    }
}