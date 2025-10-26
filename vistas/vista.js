//Para mostrar la informacion
//se define que tipo de metodo HTTP se usa y con que funcion

const datosDesdeControlador = require("../controladores/controlador");
const express = require('express')

//importa las funcionalidades del objeto router en express
const router = express.Router();

//ruta para mostrar todos los datos
router.get('/lista', datosDesdeControlador.mostrarDatos);

router.get('/nacionales/:nacionales', datosDesdeControlador.mostrarTitulos)



//Exportacion de router
module.exports = router
