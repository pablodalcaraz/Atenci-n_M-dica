import { insertarEvolucion, editarEvolucion } from "../models/evolucionModel.js";

export const cargarEvolucion = async (req,res) => {
    try {
        const {accionEvolucion,id_evolucion, id_consulta_actual, id_consulta_actualizar, descripcion_evolucion,fecha_registro,id_template} = req.body 
        console.log('id_consulta_actual: ',id_consulta_actual)
        console.log('id_evolucion: ',id_evolucion)
        console.log('id_consulta_actualizar: ', id_consulta_actualizar)
        
        if (accionEvolucion==='update' && id_evolucion) {
            await editarEvolucion(id_evolucion,id_consulta_actualizar,descripcion_evolucion,fecha_registro,id_template)
        } else {
            await insertarEvolucion(id_consulta_actual,descripcion_evolucion,fecha_registro,id_template)
        }
        
        return res.status(204).send('Evolución guardada exitosamente');
    } catch (error) {
        console.error('❌ Error al cargarEvolucion:', error);
        return res.status(500).send('Error interno del servidor');
    }
}

