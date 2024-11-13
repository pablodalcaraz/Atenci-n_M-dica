import { obtenerUsuarioPorMail } from '../models/usuarioModel.js';
import bcrypt from 'bcrypt'

export const getLogin = (req, res) => {
    res.render('login'); 
};
export const login = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).send('Email y contraseña son requeridos');
    }

    try {
        const usuario = await obtenerUsuarioPorMail(mail);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(401).send('Credenciales incorrectas');
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            console.error('Contraseña incorrecta');
            console.log('Enviando respuesta con error...');
            return res.status(400).json({ errorCredenciales: '*Credenciales incorrectas' });
        }
        req.session.medico= {
            id_medico: usuario.id_medico,
            apellido_medico: usuario.apellido_medico,
            nombre_medico: usuario.nombre_medico,
            genero_medico: usuario.genero_medico
        };

        
        req.session.save((error) => {
            if (error) {
                console.error('Error al guardar la sesión:', error);
                return res.status(500).send('Error al guardar sesión');
            } else {
                console.log('Sesión guardada con éxito ', req.session.medico);
                return res.redirect('/agenda'); 
            }
        });
    } catch (error) {
        console.error('Error en la consulta de login:', error);
        return res.status(500).send('Error interno del servidor');
    }
}