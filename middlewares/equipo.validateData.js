const { body, validationResult } = require("express-validator");

// --- Función reutilizable para manejar errores de validación ---
const manejarResultadosValidacion = (req, res, next) => {
  const errors = validationResult(req);
  //revisa si no hay errores
  if (errors.isEmpty()) {
    return next();
  }
  //si hay errores devuelve un 400
  return res.status(400).json({
    errores: errors.array(),
  });
};

const validarNuevoEquipo = [
  //validacion de campo nombre
  body("nombre")
    .exists().withMessage("El nombre es obligatorio.")
    .isString().withMessage("El nombre debe ser una cadena de texto.")
    .trim()
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres."),

  //validacion de campo pais
  body("pais")
    .exists().withMessage("El pais es obligatorio.")
    .isString().withMessage("El pais debe ser una cadena de texto.")
    .trim()
    .isLength({ min: 3 }).withMessage("El pais debe tener al menos 3 caracteres."),

  //validacion de campo liga
  body("liga")
    .exists().withMessage("La liga es obligatoria.")
    .isString().withMessage("La liga debe ser una cadena de texto.")
    .trim()
    .isLength({ min: 3 }).withMessage("La liga debe tener al menos 3 caracteres."),

  //validacion de campo fundacion
  body("fundacion")
    .exists().withMessage("El año de fundacion es obligatorio.")
    .isInt({ min: 1800, max: 2025 }).withMessage("El año de fundacion debe ser un numero entero valido entre 1800 y 2025. Ej: 1950"),

  //validacion de campo cantidadTitulosNacionales
  body("cantidadDeTitulosNacionales")
    .exists().withMessage("Los titulos nacionales son obligatorios.")
    .isInt({ min: 0 }).withMessage("Los titulos nacionales deben ser un numero entero mayor o igual que 0. Ej: 6"),

  //validacion de campo cantiadTitulosInternacionales
  body("cantidadDeTitulosInternacionales")
    .exists().withMessage("Los titulos internacionales son obligatorios.")
    .isInt({ min: 0 }).withMessage("Los titulos internacionales deben ser un numero entero mayor o igual que 0. Ej: 4"),

  //validacion de campo capacidadEstadio
  body("capacidadEstadio")
    .exists().withMessage("La capacidad del estadio es obligatoria.")
    .isInt({ min: 10000 }).withMessage("La capacidad del estadio debe ser un numero entero superior a 10000. Ej: 19500"),

  //validacion de campo coloresCamiseta.color1
  body("coloresCamiseta.color1")
    .exists().withMessage("El color es obligatorio.")
    .isString().withMessage("El color de camiseta debe ser un string. Ej:azul")
    .trim()
    .isLength({ min: 3 }).withMessage("El color de camiseta debe tener al menos 3 caracteres."),

  //validacion de campo coloresCamiseta.color2
  body("coloresCamiseta.color2")
    .exists().withMessage("El color es obligatorio.")
    .isString().withMessage("El color de camiseta debe ser un string. Ej:azul")
    .trim()
    .isLength({ min: 3 }).withMessage("El color de camiseta debe tener al menos 3 caracteres."),

  
  manejarResultadosValidacion
];

//valida que el body contenga {"titulos": N}
const validarTitulos = [
    body('titulos')
        .exists().withMessage('El campo "titulos" es obligatorio en el body.')
        .isInt({ min: 0 }).withMessage('El valor de "titulos" debe ser un número entero mayor o igual a 0.'),
    
    
    manejarResultadosValidacion
];

//valida que el body contenga {"capacidad": N}
const validarCapacidad = [
    body('capacidad')
        .exists().withMessage('El campo "capacidad" es obligatorio en el body.')
        .isInt({ min: 10000 }).withMessage('La "capacidad" debe ser un número entero superior a 10000.'),
    
    // Manejador de resultados
    manejarResultadosValidacion
];



//para exportar
module.exports = {
  validarNuevoEquipo,
  validarTitulos,
  validarCapacidad
}



