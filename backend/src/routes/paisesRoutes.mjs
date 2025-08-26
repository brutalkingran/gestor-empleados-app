// Rutas de la API
// rutas API para paises
// 7)

import express from 'express';
import { mostrarTodosLosPaisesController, crearPaisController, editarPaisController, borrarPaisController } from '../controllers/paisesController.mjs';
import { deleteByIdValidationRules, registerValidationRules, updateValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors } from '../validations/errorMiddleware.mjs';

const router = express.Router();

// agregar
router.post('/pais/crear-pais', registerValidationRules(), handleValidationErrors, crearPaisController);
// editar
router.put('/pais/modificar-pais', updateValidationRules(), handleValidationErrors, editarPaisController);
// eliminar
router.delete('/pais/borrar/:id', deleteByIdValidationRules(), handleValidationErrors, borrarPaisController);
// mostrar
router.get('/pais', mostrarTodosLosPaisesController);

export default router;

// modelo:
// {
//     "name": { "official": "Argentina" },
//     "capital": ["Buenos Aires"],
//     "borders": ["BRA", "CHL"],
//     "area": 2780400,
//     "population": 45000000,
//     "gini": { "2019": 42.9 },
//     "timezones": ["UTC-03:00"],
//     "creador": "Tu nombre"
// }