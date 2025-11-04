//Para mostrar la informacion.
//se define que tipo de metodo HTTP se usa y con que funcion.

const datosDesdeControlador = require("../controladores/equipo.controlador");
const express = require('express');

//importa middleware de validacion
const { 
  validarNuevoEquipo, 
  validarTitulos, 
  validarCapacidad 
} = require('../middlewares/equipo.validateData.js');

//importa las funcionalidades del objeto router en express.
const router = express.Router();

//ruta para mostrar todos los datos.
router.get('/lista', datosDesdeControlador.mostrarDatos);

//ruta para mostrar equipos por ID. (ej: /idEquipo/5)
router.get('/idEquipo/:id', datosDesdeControlador.mostarPorID)

//ruta para mostrar titulos nacionales. (ej: /nacionales/25)
router.get('/nacionales/:nacionales', datosDesdeControlador.mostrarTitulos)

//ruta para mostrar titulos internacionales. (ej: /internacionales/25)
router.get('/internacionales/:internacionales', datosDesdeControlador.mostrarTitulosInter)

//ruta para mostrar capacidad del estadio. (ej: /capacidad/45000)
router.get('/capacidad/:capacidad', datosDesdeControlador.mostrarCapacidadEstadio)

//ruta para mostrar por fundacion. Se puede usar "anterior" o "posterior" en :tipo (ej: /fundacion/anterior/1910)
router.get('/fundacion/:tipo/:anio', datosDesdeControlador.mostrarEquiposPorFundacion);

//ruta para mostrar por 1 color (ej: /colores/rojo)
router.get('/colores/:color1', datosDesdeControlador.mostrarEquiposPorColor);

//ruta para mostrar por 2 colores (ej: /colores/rojo/blanco)
router.get('/colores/:color1/:color2', datosDesdeControlador.mostrarEquiposPorColor);

//ruta para mostrar equipos por nombre (ej: /nombre/real) puede usasrse nombre completo o parcial
router.get('/nombre/:nombre', datosDesdeControlador.mostrarEquiposPorNombre);

//ruta para filtrar por pais y que tengan titulos internacionales  (ej: /pais/España/internacionales)
router.get('/pais/:pais/internacionales', datosDesdeControlador.mostrarEquiposPorPaisConTitulosInt)

//ruta para mostrar equipos por pais (ej: /pais/Italia)
router.get('/pais/:pais', datosDesdeControlador.mostrarEquiposPorPais);

//ruta para mostrar equipos por liga (ej: /liga/Premier League)
router.get('/liga/:liga', datosDesdeControlador.mostrarEquiposPorLiga);

//ruta para filtrar por query (ej: /buscar?pais=Italia&liga=Serie A)
router.get('/buscar', datosDesdeControlador.mostrarEquiposConQuery);



//ruta para CREAR un nuevo equipo (usa el metodo POST)
router.post('/crear', validarNuevoEquipo, datosDesdeControlador.crearEquipo);



//ruta para ELIMINAR un equipo por ID (usa el metodo DELETE)
router.delete('/eliminar/:id', datosDesdeControlador.borrarEquipo);



//ruta para ACTUALIZAR (PATCH) solo los titulos nacionales (ej: PATCH /titulos/nacionales/1  el 1 corresponde al id) se ingresa un objeto {"titulos": 76}
router.patch('/titulos/nacionales/:id', validarTitulos, datosDesdeControlador.actualizarTitulosNac);

// Ruta para ACTUALIZAR (PATCH) solo los titulos internacionales (ej: PATCH /titulos/internacionales/1)
router.patch('/titulos/internacionales/:id', validarTitulos, datosDesdeControlador.actualizarTitulosInter);

// Ruta para ACTUALIZAR (PATCH) solo la capacidad del estadio (ej: PATCH /capacidad/1) ej: {"capacidad": 65432}
router.patch('/capacidad/:id', validarCapacidad, datosDesdeControlador.actualizarCapacidad);




//Exportacion de router.
module.exports = router

