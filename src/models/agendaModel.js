import connexion from "../database/db.js";

export const obtenerAgendaPorIdMedico = async (req,res)=> {
    const id_medico =  req.session.medico?.id_medico
    if (!id_medico) {
        throw Error('El parámetro id_medico no puede ser undefined')
    }
    try {
        
        const query = `
        SELECT a.*
        FROM agenda a
        JOIN especialidad_medico em ON em.id_especialidad_medico = a.id_especialidad_medico
        JOIN medico m ON m.id_medico = em.id_medico
        WHERE m.id_medico = ?;
        `
        const [results] = await connexion.execute(query, [id_medico])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerAgendaPorIdMedico:', error);
        throw error;
    }
}