import connexion from "../database/db.js";

export const insertarEvolucion = async (id_consulta, descripcion_evolucion,fecha_registro,id_template) => {
    try {
        const connection = await connexion
        const query = `
        INSERT INTO evoluciones(id_consulta, descripcion_evolucion,fecha_registro,id_template)VALUES(?,?,?,?) 
        `
        const params = [
            id_consulta,
            descripcion_evolucion,
            fecha_registro,
            id_template
        ]
        const [result] = await connection.execute(query, params)
       
        return result 
    } catch (error) {
        console.error('❌ Error al insertarDiagnostico:', error);
        throw error;
    }
}

export const obtenerEvolucionesPorIdConsulta = async (id_consulta) => {
    try {
        const connection = await connexion
        const query = `
        SELECT e.* 
            FROM evoluciones e
            JOIN consulta c ON c.id_consulta = e.id_consulta
            WHERE c.id_consulta = ?
        `
        const [result] = await connection.execute(query, [id_consulta]);
        return result;
    } catch (error) {
        console.error('❌ Error al obtenerEvolucionesPorIdConsulta:', error);
        throw error;
    }
}

export const editarEvolucion = async (id_evolucion,id_consulta, descripcion_evolucion,fecha_registro,id_template) => {
    try {
        const connection = await connexion
        const query = `
        UPDATE evoluciones
        SET 
        id_evolucion = COALESCE(?,id_evolucion),
        descripcion_evolucion = COALESCE(?,descripcion_evolucion),
        fecha_registro = COALESCE(?,fecha_registro),
        id_template = COALESCE(?,id_template)        
        WHERE id_evolucion = ?
        `
        const params = [
            id_consulta, 
            descripcion_evolucion,
            fecha_registro,
            id_template,
            id_evolucion
        ]
        const [results] = await connection.execute(query, params)
        return results
    } catch (error) {
        console.error('❌ Error al editarEvolucion:', error); 
            throw error;
    }
}