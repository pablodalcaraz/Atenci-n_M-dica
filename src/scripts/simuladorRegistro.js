import connexion from '../database/db.js'
import bcrypt from 'bcrypt'

const simularRegistro = async (id_medico, plainPassword) => {
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(plainPassword,salt)
        const connection = await connexion
        const query = `
        INSERT INTO usuario (id_medico, password)VALUES(?,?)
        `
        const [result] = await connection.execute(query,[id_medico, hashedPassword])
        await connection.end()
        console.log(`El usuario con ID ${id_medico} fue registrado con éxito. ID de usuario: ${result.insertId}`);
    } catch (error) {
        console.error('❌ Error al isertarUsuario:', error.message);
        throw error;
    }
}

simularRegistro(null,null)