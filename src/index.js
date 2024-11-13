import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';
import hceRoutes from './routes/hceRoutes.js';
import consultaRoutes from './routes/consultaRoutes.js'
import diagnosticoRoutes from './routes/diagnosticoRoutes.js';
import evolucionRoutes from './routes/evolucionRoutes.js'
import cerrarRoutes from './routes/cerrarRoutes.js'
import alergiaRoutes from './routes/alergiaRoutes.js'
import antecedenteRoutes from './routes/antecedenteRoutes.js'
import habitoRoutes from './routes/habitoRoutes.js'
import medicamentoRoutes from './routes/medicamentoRoutes.js'


dotenv.config();

const app = express();
const port = process.env.PORT;

const initSessionStore = async () => {
    const MySQLStoreImport = await import('express-mysql-session');
    const MySQLStore = MySQLStoreImport.default(session);

    const options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };

    const sessionStore = new MySQLStore(options);

    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
};

initSessionStore().then(() => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', authRoutes);
    app.use('/agenda', agendaRoutes);
    app.use('/hce', hceRoutes)
    app.use('/consulta', consultaRoutes)
    app.use('/diagnostico', diagnosticoRoutes);
    app.use('/evolucion', evolucionRoutes)
    app.use('/cerrar', cerrarRoutes)
    app.use('/alergia', alergiaRoutes)
    app.use('/antecedente', antecedenteRoutes)
    app.use('/habito', habitoRoutes)
    app.use('/medicamento', medicamentoRoutes)

    app.listen(port, () => {
        console.log(`Servidor corriendo en puerto: ${port}`);
    });
}).catch(error => {
    console.error('Error al inicializar el store de sesión:', error);
});
