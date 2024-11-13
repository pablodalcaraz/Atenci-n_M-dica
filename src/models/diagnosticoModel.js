import connexion from "../database/db.js";

export const insertarDiagnostico = async (id_consulta, descripcion_diagnostico, id_estado_diagnostico, fecha_desde, fecha_hasta) => {
    try {
        
        const query = `
            INSERT INTO diagnosticos(id_consulta, descripcion_diagnostico, id_estado_diagnostico, fecha_desde, fecha_hasta)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const params = [
            id_consulta,
            descripcion_diagnostico,
            id_estado_diagnostico,
            fecha_desde,
            fecha_hasta || null
        ];

        const [result] = await connexion.execute(query, params);
      
        return result;
    } catch (error) {
        console.error('❌ Error al insertarDiagnostico:', error);
        throw error;
    }
};


export const obtenerDiagnosticoPorIdConsulta = async (id_consulta) => {
    try {
       
        const query = `
            SELECT d.* 
            FROM diagnosticos d
            JOIN consulta c ON c.id_consulta = d.id_consulta
            WHERE c.id_consulta = ?
        `;
        const [result] = await connexion.execute(query, [id_consulta]);
        return result;
    } catch (error) {
        console.error('❌ Error al obtenerDiagnosticoPorId:', error);
        throw error;
    }
};

export const obtenerEstadosDiagnosticos = async (req,res) => {
    try {
     
        const query = `
        SELECT ed.*
        FROM estado_diagnostico ed
        `
        const [results] = await connexion.execute(query)
        return results
    } catch (error) {
        console.error('❌ Error al obtenerEstadosDiagnosticos:', error);
        throw error;
    }
}

    
    
export const editarDiagnostico = async (id_diagnostico,id_consulta, descripcion_diagnostico, id_estado_diagnostico, fecha_desde, fecha_hasta) =>{
    try {
  
        const query = `
        UPDATE diagnosticos
        SET 
        descripcion_diagnostico = COALESCE(?,descripcion_diagnostico),
        id_estado_diagnostico = COALESCE(?,id_estado_diagnostico), 
        fecha_desde = COALESCE(?,fecha_desde), 
        fecha_hasta = COALESCE(?,fecha_hasta )
        WHERE id_diagnostico = ? AND id_consulta = ?
        `
        const params = [   
            descripcion_diagnostico, 
            id_estado_diagnostico, 
            fecha_desde, 
            fecha_hasta,
            id_diagnostico,
            id_consulta
        ]
        const [result] = await connexion.execute(query, params)
        return result
    } catch (error) {
        console.error('❌ Error al editarDiagnostico:', error); 
            throw error;
    }
} 