// Validar ID de Mongo
export const deleteUserValidationRules = () => [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

// Registro de usuario
export const registerUserValidationRules = () => [
    body('firstName')
        .notEmpty().withMessage("Campo 'firstName' obligatorio.")
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.'),

    body('lastName')
        .notEmpty().withMessage("Campo 'lastName' obligatorio.")
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.'),

    body('username')
        .notEmpty().withMessage("Campo 'username' obligatorio.")
        .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres.')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guiones bajos.'),

    body('passwordHash')
        .notEmpty().withMessage("Campo 'passwordHash' obligatorio.")
        .isString().withMessage('La contraseña debe ser un string válido.'),

    body('role')
        .notEmpty().withMessage("Campo 'role' obligatorio.")
        .isIn(['Boss', 'Manager', 'Employee']).withMessage('El rol debe ser uno de: Boss, Manager, Employee.'),

    body('mustChangePassword')
        .optional()
        .isBoolean().withMessage('El campo "mustChangePassword" debe ser booleano.'),
];

// Actualización de usuario
export const updateUserValidationRules = () => [
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.'),

    body('lastName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.'),

    body('username')
        .optional()
        .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres.')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guiones bajos.'),

    body('passwordHash')
        .optional()
        .isString().withMessage('La contraseña debe ser un string válido.'),

    body('role')
        .optional()
        .isIn(['Boss', 'Manager', 'Employee']).withMessage('El rol debe ser uno de: Boss, Manager, Employee.'),

    body('mustChangePassword')
        .optional()
        .isBoolean().withMessage('El campo "mustChangePassword" debe ser booleano.'),
];
