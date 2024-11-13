import connexion from "../database/db.js";

export const obtenerEspecialidadesPorMedico = async (id_medico) => {
    
    try {
        const connection = await connexion
        const query = `
        SELECT e.nombre_especialidad
        FROM especialidad e
        JOIN especialidad_medico em ON em.id_especialidad = e.id_especialidad
        JOIN medico m ON m.id_medico = em.id_medico
        WHERE m.id_medico = ?;
        `
        const [results] = await connection.execute(query,[id_medico])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerEspecialidadesPorMedico:', error);
        throw error;
    }

}