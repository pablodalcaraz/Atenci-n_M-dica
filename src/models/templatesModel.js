import connexion from "../database/db.js";

export const obtenerTemplates = async (req,res) => {
    try {
      
        const query = `
        SELECT *
        FROM templates
        `
        const [results] = await connexion.execute(query)
        
        return results
    } catch (error) {
        console.error('❌ Error al obtenerTemplates', error)
        throw error
    }
}