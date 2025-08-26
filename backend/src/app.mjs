import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import paisRoutes from './routes/paisesRoutes.mjs';
import ejsRoutes from './routes/ejsRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

import dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3000; // process.env.PORT para Render, si no usa puerto 3000

const __filename = fileURLToPath(import.meta.url); // resolved path to the file
const __dirname = path.dirname(__filename); // Get the name of the directory

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ajustar ruta

// Middleware para procesar datos de formulario
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios URL-encoded
app.use(express.json());
app.use(methodOverride('_method')); // Middleware para usar PUT o DELETE desde formularios

// EXPRESS-EJS-LAYOUTS
app.use(expressLayouts); // Activa middleware
app.set('layout', 'layout');

// Cambiar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // archivos estáticos

// conexión a mongoDB
connectDB();

// Configuración de rutas
app.use('/api', paisRoutes);
app.use('/', ejsRoutes);

// manejo de errores para rutas no encontradas
app.use((req, res) => res.status(404).send({ mensaje: "Ruta no encontrada" }));

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});