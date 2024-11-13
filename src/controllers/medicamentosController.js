import { obtenerMedicamentoPorId, insertarMedicamento,editarMedicamento } from "../models/medicamentosModel.js";

export const obtenerMedicamento = async (req,res) => {
    try {
        const {id_medicamento, id_consulta} = req.params 
       if (!id_medicamento || !id_consulta) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
       }
       const resultados = await obtenerMedicamentoPorId(id_medicamento, id_consulta);

        if (resultados.length > 0) {
            return res.status(200).json({ success: true, medicamento: resultados[0] });
        } else { 
            return res.status(404).json({ success: false, message: `Medicamento con id: ${id_medicamento} no encontrado` });
        }
       
    } catch (error) {
        console.error('❌ Error al obtenerMedicamento:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' })
    }
}



export const cargarMedicamento = async (req,res) => {
    try {
        const {accionMedicamento, id_medicamento,id_consulta_actual,id_consulta_medicamento, nombre_medicamento, fecha_registro,fecha_hasta} = req.body 
        console.log('id consulta ', id_consulta_actual)
        console.log('id actualizar ', id_consulta_medicamento)
        console.log('id medicamento ',id_medicamento)

        if (accionMedicamento === 'update') {
            await editarMedicamento(id_medicamento, id_consulta_medicamento,nombre_medicamento || null,fecha_registro || null, fecha_hasta) || null
        } else {
            await insertarMedicamento(id_consulta_actual, nombre_medicamento || null, fecha_registro || null, fecha_hasta || null)
        }
    
        return res.status(200).json({ success: true, message: 'Medicamento guardado exitosamente' });
    } catch (error) {
        console.error('❌ Error al cargarMedicamento:', error);
        return res.status(500).send('Error interno del servidor');
    }
    
}