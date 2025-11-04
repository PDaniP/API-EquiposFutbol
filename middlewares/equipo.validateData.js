const { body } = require('express-validator');


const validarNuevoEquipo = [

    //validacion de campo nombre
    body('nombre')
        .exists().withMessage('El nombre es obligatorio.')
        .isString().withMessage('El nombre debe ser una cadena de texto.')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),

    //validacion de campo pais
    body('pais')
        .exists().withMessage('El pais es obligatorio.')
        .isString().withMessage('El pais debe ser una cadena de texto.')
        .trim()
        .isLength({ min: 3 }).withMessage('El pais debe tener al menos 3 caracteres.'),

    //validacion de campo liga
    body('liga')
        .exists().withMessage('La liga es obligatoria.')
        .isString().withMessage('La liga debe ser una cadena de texto.')
        .trim()
        .isLength({ min: 3 }).withMessage('La liga debe tener al menos 3 caracteres.'),

    //validacion de campo fundacion
    body('fundacion')
        .exists().withMessage('El año de fundacion es obligatorio.')
        .isInt().withMessage('El año de fundacion debe ser un numero entero. Ej: 1950')
        .trim()
        .isLength({ min: 4 }).withMessage('El año de fundacion debe tener al menos 4 digitos. Ej: 1950'),

    //validacion de campo cantidadTitulosNacionales
    body('cantidadDeTitulosNacionales')
        .exists().withMessage('Los titulos nacionales son obligatorios.')
        .isInt().withMessage('Los titulos nacionales deben ser un numero entero. Ej: 6')
        .trim()
        .isLength({ min: 1 }).withMessage('Los titulos nacionales debe tener al menos un digito. Ej: 1'),

    //validacion de campo cantiadTitulosInternacionales
    body('cantidadDeTitulosInternacionales')
        .exists().withMessage('Los titulos internacionales son obligatorios.')
        .isInt().withMessage('Los titulos internacionales deben ser un numero entero. Ej: 4')
        .trim()
        .isLength({ min: 1 }).withMessage('Los titulos internacionales deben tener al menos 1 digito. Ej: 1'),

    //validacion de campo capacidadEstadio
    body('capacidadEstadio')
        .exists().withMessage('La capacidad del estadio es obligatoria.')
        .isInt().withMessage('La capacidad del estadio debe ser un numero entero. Ej: 19500')
        .trim()
        .isLength({ min: 4 }).withMessage('La capacidad del estadio debe tener al menos 4 digitos. Ej: 7950'),


    //validacion de campo coloresCamiseta.color1
    body('coloresCamiseta.color1')
        .exists().withMessage('El color es obligatorio.')
        .isString().withMessage('El color de camiseta debe ser un string. Ej:azul')
        .trim()
        .isLength({ min: 3 }).withMessage('El color de camiseta debe tener al menos 3 caracteres.'),

    //validacion de campo coloresCamiseta.color2
    body('coloresCamiseta.color2')
        .exists().withMessage('El color es obligatorio.')
        .isString().withMessage('El color de camiseta debe ser un string. Ej:azul')
        .trim()
        .isLength({ min: 3 }).withMessage('El color de camiseta debe tener al menos 3 caracteres.'),




    (req, res, next) => {
        const errors = validationResult(req)
        //revisa si no hay errores
        if (errors.isEmpty()) {
            return next()
        }

        //si hay errores devuelve un 400
        return res.status(400).json({
            errores: errors.array()
        })
    }
]


//para exportar
module.exports = validarNuevoEquipo
