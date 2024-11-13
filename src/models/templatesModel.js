import connexion from "../database/db.js";

export const obtenerTemplates = async (req,res) => {
    try {
        const connection = await connexion
        const query = `
        SELECT *
        FROM templates
        `
        const [results] = await connection.execute(query)
        
        return results
    } catch (error) {
        console.error('❌ Error al obtenerTemplates', error)
        throw error
    }
}