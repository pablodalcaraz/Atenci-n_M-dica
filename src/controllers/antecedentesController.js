import { obtenerAntecedentePorId,insertarAntecedente, editarAntecedente } from "../models/antecedentesModel.js";

export const obtenerAntecedente = async (req,res) => {
    try {
       const {id_antecedentes, id_consulta} = req.params 
       if (!id_antecedentes || !id_consulta) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
       }
       const resultados = await obtenerAntecedentePorId(id_antecedentes, id_consulta);

        if (resultados.length > 0) {
            return res.status(200).json({ success: true, antecedente: resultados[0] });
        } else { 
            return res.status(404).json({ success: false, message: `Antecedente con id: ${id_antecedentes} no encontrado` });
        }
    } catch (error) {
        console.error('❌ Error al obtenerAntecedente:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export const cargarAntecedente = async (req,res) => {
    try {
        const {accionAntecedente, id_antecedentes,id_consulta_actual,id_consulta_antecedente, descripcion_antecedente, fecha_desde,fecha_hasta=null } = req.body 
        console.log('id actual: ', id_consulta_actual)
        console.log('id actualizar: ', id_consulta_antecedente)
        console.log('id antecedente: ', id_antecedentes)
        console.log('descripcion_antecedente: ', descripcion_antecedente)
        console.log('fecha_desde ', fecha_desde)
        console.log('fecha_hasta ', fecha_hasta)
        
        if (accionAntecedente === 'update' && id_antecedentes) {
            await editarAntecedente(id_antecedentes, id_consulta_antecedente, descripcion_antecedente || null, fecha_desde || null, fecha_hasta || null)
        }else{
            await insertarAntecedente(id_consulta_actual, descripcion_antecedente || null, fecha_desde || null,fecha_hasta || null)
        }

        return res.status(200).json({ success: true, message: 'Antecedente guardado exitosamente' });
    } catch (error) {
        console.error('❌ Error al cargarAntecedente:', error);
        return res.status(500).send('Error interno del servidor');
    }
}