import { body, param } from 'express-validator';

// Validar ID de Mongo
export const deleteEmployeeValidationRules = () => [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

// Registro de empleado
export const registerEmployeeValidationRules = () => [
    body('firstName')
        .notEmpty().withMessage("Campo 'firstName' obligatorio.")
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.'),

    body('lastName')
        .notEmpty().withMessage("Campo 'lastName' obligatorio.")
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.'),

    body('email')
        .notEmpty().withMessage("Campo 'email' obligatorio.")
        .isEmail().withMessage('Debe ser un email válido.'),

    body('phoneNumber')
        .optional()
        .matches(/^[0-9()\-\s+]+$/).withMessage('El teléfono solo puede contener números, espacios, +, - y ().'),

    body('position')
        .notEmpty().withMessage("Campo 'position' obligatorio.")
        .isLength({ min: 2, max: 100 }).withMessage('La posición debe tener entre 2 y 100 caracteres.'),

    body('rank')
        .notEmpty().withMessage("Campo 'rank' obligatorio.")
        .isInt({ min: 1, max: 10 }).withMessage('El rango debe ser un número entero entre 1 y 10.'),

    body('department')
        .notEmpty().withMessage("Campo 'department' obligatorio.")
        .isLength({ min: 2, max: 100 }).withMessage('El departamento debe tener entre 2 y 100 caracteres.'),

    body('hireDate')
        .notEmpty().withMessage("Campo 'hireDate' obligatorio.")
        .isISO8601().withMessage('La fecha de contratación debe estar en formato válido.'),

    body('isActive')
        .optional()
        .isBoolean().withMessage('El campo "isActive" debe ser booleano.'),

    body('salary')
        .notEmpty().withMessage("Campo 'salary' obligatorio.")
        .isFloat({ min: 0 }).withMessage('El salario debe ser un número positivo.'),

    body('birthday')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe estar en formato válido.'),

    body('sex')
        .optional()
        .isIn(['male', 'female', 'other']).withMessage('El sexo debe ser "male", "female" o "other".'),

    body('stressLevel')
        .optional()
        .isInt({ min: 0, max: 10 }).withMessage('El nivel de estrés debe ser un número entero entre 0 y 10.'),

    body('photo')
        .optional()
        .isURL().withMessage('El campo "photo" debe ser una URL válida.'),

    body('notes')
        .optional()
        .isLength({ max: 500 }).withMessage('Las notas no pueden superar los 500 caracteres.'),
];

// Actualización de empleado
export const updateEmployeeValidationRules = () => [
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.'),

    body('lastName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.'),

    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un email válido.'),

    body('phoneNumber')
        .optional()
        .matches(/^[0-9()\-\s+]+$/).withMessage('El teléfono solo puede contener números, espacios, +, - y ().'),

    body('position')
        .optional()
        .isLength({ min: 2, max: 100 }).withMessage('La posición debe tener entre 2 y 100 caracteres.'),

    body('rank')
        .optional()
        .isInt({ min: 1, max: 10 }).withMessage('El rango debe ser un número entero entre 1 y 10.'),

    body('department')
        .optional()
        .isLength({ min: 2, max: 100 }).withMessage('El departamento debe tener entre 2 y 100 caracteres.'),

    body('hireDate')
        .optional()
        .isISO8601().withMessage('La fecha de contratación debe estar en formato válido.'),

    body('isActive')
        .optional()
        .isBoolean().withMessage('El campo "isActive" debe ser booleano.'),

    body('salary')
        .optional()
        .isFloat({ min: 0 }).withMessage('El salario debe ser un número positivo.'),

    body('birthday')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe estar en formato válido.'),

    body('sex')
        .optional()
        .isIn(['male', 'female', 'other']).withMessage('El sexo debe ser "male", "female" o "other".'),

    body('stressLevel')
        .optional()
        .isInt({ min: 0, max: 10 }).withMessage('El nivel de estrés debe ser un número entero entre 0 y 10.'),

    body('photo')
        .optional()
        .isURL().withMessage('El campo "photo" debe ser una URL válida.'),

    body('notes')
        .optional()
        .isLength({ max: 500 }).withMessage('Las notas no pueden superar los 500 caracteres.'),
];