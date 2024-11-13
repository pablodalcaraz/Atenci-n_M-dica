import { insertarDiagnostico, editarDiagnostico } from "../models/diagnosticoModel.js";

export const cargarDiagnostico = async (req, res) => {
    try {
        const { accion,id_diagnostico,id_consulta_actual, id_consulta_actualizar, descripcion_diagnostico, id_estado_diagnostico, fecha_desde, fecha_hasta } = req.body;
        console.log('id_consulta actual: ', id_consulta_actual)
        console.log('id_consulta_actualizar: ',id_consulta_actualizar)
        console.log('id_diagnostico: ',id_diagnostico)

        if (accion==='update' && id_diagnostico) {
            await editarDiagnostico(id_diagnostico, id_consulta_actualizar,descripcion_diagnostico || null, id_estado_diagnostico || null, fecha_desde || null, fecha_hasta || null)
        } else {
            await insertarDiagnostico(id_consulta_actual, descripcion_diagnostico || null, id_estado_diagnostico || null, fecha_desde || null, fecha_hasta || null); 
        }
        
        
        return res.status(204).send('Diagnóstico guardado exitosamente');
    } catch (error) {
        console.error('❌ Error al cargarDiagnostico:', error);
        return res.status(500).send('Error interno del servidor');
    }
};



