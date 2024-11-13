import { obtenerHabitoPorId,insertarHabito, editarHabito } from "../models/habitoModel.js";

export const obtenerHabito = async (req,res) => {
    try {
       const {id_habitos, id_consulta} = req.params 
       if (!id_habitos || !id_consulta) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
       }
       const resultados = await obtenerHabitoPorId(id_habitos, id_consulta);

        if (resultados.length > 0) {
            return res.status(200).json({ success: true, habito: resultados[0] });
        } else { 
            return res.status(404).json({ success: false, message: `Habito con id: ${id_habitos} no encontrado` });
        }
    } catch (error) {
        console.error('❌ Error al obtenerHabito:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export const cargarHabito = async (req,res) => {
    try {
        const {accionHabito, id_habitos, id_consulta_actual, id_consulta_habito, descripcion_habito, fecha_desde, fecha_hasta} = req.body 
        console.log('id consulta ', id_consulta_actual)
        console.log('id actualizar ', id_consulta_habito)
        console.log('id habitos ',id_habitos)
        
        if (accionHabito === 'update' && id_habitos) {
            await editarHabito(id_habitos, id_consulta_habito,descripcion_habito || null,fecha_desde || null,fecha_hasta || null)
        } else {
            await insertarHabito(id_consulta_actual, descripcion_habito || null, fecha_desde || null, fecha_hasta || null)
        }
       

        return res.status(200).json({ success: true, message: 'Hábito guardado exitosamente' });

    } catch (error) {
        console.error('❌ Error al cargarDiagnostico:', error);
        return res.status(500).send('Error interno del servidor');
    }
}