/*import { obtenerPacientePorDni } from "../models/pacienteModel";

export const mostrarPaciente = async (req,res) => {
    const {dni_paciente} = req.body 
    if (!dni_paciente) {
        return res.status(400).send('Paciente requerido');
    }
    const fechaNacimiento = new Date(paciente.fecha_nacimiento)
        const edad = calcularEdad(fechaNacimiento)
        paciente.fecha_nacimiento = new Date(fechaNacimiento).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    const paciente = await obtenerPacientePorDni(dni_paciente)
    return res.render('patientHeader', {
        paciente,
        edad
    })
}
const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}*/