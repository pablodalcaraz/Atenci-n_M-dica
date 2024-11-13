import connexion from "../database/db.js";

export const obtenerPacientePorDni = async (dni_paciente)=> {
    
    try {
        const connection = await connexion
        const query = `
        SELECT p.*
        FROM paciente p
        WHERE p.dni_paciente = ?;
        `
        const [result] = await connection.execute(query, [dni_paciente])
        return result[0]
    } catch (error) {
        console.error('❌ Error al obtenerPacientePorDni', error)
        throw error
    }
}

export const obtenerPacientePorIdMedico = async (id_medico)=> {
    
    try {
    
        const query = `
        SELECT p.* 
        FROM paciente p
        JOIN turno t ON t.dni_paciente = p.dni_paciente
        JOIN agenda a ON a.id_agenda = t.id_agenda
        JOIN especialidad_medico em ON em.id_especialidad_medico = a.id_especialidad_medico
        JOIN medico m ON m.id_medico = em.id_medico
        WHERE m.id_medico = ?;
        `
        const [result] = await connexion.execute(query, [id_medico])
        return result
    } catch (error) {
        console.error('❌ Error al obtenerPacientePorDni', error)
        throw error
    }
}

