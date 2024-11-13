import connexion from "../database/db.js";

export const obtenerUsuarioPorMail = async (mail) => {
    try {
        if (!mail) {
            throw new Error('El parámetro mail no puede ser undefined');
        }

        const connection = await connexion
        const query = `
            SELECT u.*, m.*
            FROM usuario u
            JOIN medico m ON u.id_medico = m.id_medico
            WHERE m.mail = ?
            `
        const [result] = await connection.execute(query, [mail]);
        return result[0];
    } catch (error) {
        console.error('❌ Error al obtenerUsuarioPorMail:', error);
        throw error;
    }
}

