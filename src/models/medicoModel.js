import connexion from "../database/db.js";

export const obtenerMedicoPorId = async (req,res) => {
    const id_medico =  req.session.medico?.id_medico
    try {
        const connection = await connexion
        const query = `
        SELECT * FROM medico WHERE id_medico = ?
        `
        const [result] = await connection.execute(query, [id_medico])
        return result[0]
    } catch (error) {
        console.error('❌ Error al obtenerMedicoPorId', error)
        throw error
    }
}

export const obtenerMedicoPorMail = async (mail) => {
    try {
        if (!mail) {
            throw new Error('El parámetro mail no puede ser undefined');
        }

        const connection = await connexion
        const query = 'SELECT * FROM medico WHERE mail = ?';
        const [result] = await connection.execute(query, [mail]);
       
        return result[0]; 
    } catch (error) {
        console.error('Error al obtener el médico por correo:', error);
        throw error;
    }
}