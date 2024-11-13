/*import { obtenerMedicoPorId } from "../models/medicoModel.js";

export const mostrarPerfilMedico = async (req,res) => {
    
    try {
        const medico = await obtenerMedicoPorId(req,res)
        return res.render('userHead', {
            medico: medico
            
        })
    } catch (error) {
        console.error('Error al mostrarPerfilMedico:', error);
        return res.status(500).send('Error interno del servidor');
    }
}*/