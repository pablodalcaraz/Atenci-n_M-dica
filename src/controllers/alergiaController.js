import {obtenerAlergiaPorId, insertarAlergia, editarAlergia } from "../models/alergiaModel.js";

export const obtenerAlergia = async (req, res) => {
    try {
        const { id_alergia, id_consulta } = req.params;
        if (!id_alergia || !id_consulta) {
            return res.status(400).json({ success: false, message: 'Faltan parámetros' });
        }

        const resultados = await obtenerAlergiaPorId(id_alergia, id_consulta);

        if (resultados.length > 0) {
            return res.status(200).json({ success: true, alergia: resultados[0] });
        } else { 
            return res.status(404).json({ success: false, message: `Alergia con id: ${id_alergia} no encontrada` });
        }
    } catch (error) {
        console.error('❌ Error al obtenerAlergia:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

export const cargarAlergia = async (req,res) => {
     
    try {
        const {accionAlergia, id_alergia, id_consulta_actual, id_consulta_actualizar, id_descripcion_alergia,id_importancia_alergia,fecha_desde,fecha_hasta} = req.body
        console.log('id_consulta actual: ', id_consulta_actual)
        console.log('id_consulta_actualizar: ',id_consulta_actualizar)
        console.log('id_alergia: ',id_alergia)
        console.log('id descripcion ', id_descripcion_alergia)
        console.log('id importancia ', id_importancia_alergia)
        console.log('fecha desde ', fecha_desde)
        console.log('fecha hasta ', fecha_hasta)
        if (accionAlergia === 'update') {
            await editarAlergia(id_alergia, id_consulta_actualizar, id_descripcion_alergia || null, id_importancia_alergia || null, fecha_desde || null,fecha_hasta || null)
        } else {
            await insertarAlergia(id_consulta_actual, id_descripcion_alergia || null,id_importancia_alergia || null,fecha_desde || null,fecha_hasta || null)
        }
        
        return res.status(200).json({ success: true, message: 'Alergia guardada exitosamente' });
    } catch (error) {
        console.error('❌ Error al cargarAlergia:', error);
        return res.status(500).send('Error interno del servidor');
    }
}