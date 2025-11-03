//Para mostrar la informacion.
//se define que tipo de metodo HTTP se usa y con que funcion.

const datosDesdeControlador = require("../controladores/equipo.controlador");
const express = require('express');
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

//ruta para mostrar por fundación. Se puede usar "anterior" o "posterior" en :tipo (ej: /fundacion/anterior/1910)
router.get('/fundacion/:tipo/:anio', datosDesdeControlador.mostrarEquiposPorFundacion);

//ruta para mostrar por 1 color (ej: /colores/rojo)
router.get('/colores/:color1', datosDesdeControlador.mostrarEquiposPorColor);

//ruta para mostrar por 2 colores (ej: /colores/rojo/blanco)
router.get('/colores/:color1/:color2', datosDesdeControlador.mostrarEquiposPorColor);

//ruta para mostrar equipos por nombre (ej: /nombre/real) puede usasrse nombre completo o parcial
router.get('/nombre/:nombre', datosDesdeControlador.mostrarEquiposPorNombre);

//ruta para mostrar equipos por país (ej: /pais/Italia)
router.get('/pais/:pais', datosDesdeControlador.mostrarEquiposPorPais);

//ruta para mostrar equipos por liga (ej: /liga/Premier League)
router.get('/liga/:liga', datosDesdeControlador.mostrarEquiposPorLiga);


//Exportacion de router.
module.exports = router


/*
//modelo para nuevos equipos
const { EquipoControlador } = require("../controladores/controlador");

//router.post("/nuevo", EquipoControlador.crearEquipo);
// Ruta POST
router.post("/nuevo", datosDesdeControlador.EquipoControlador.crearEquipo);

function renderNuevoEquipoJSON(equipo) {
  return {
    mensaje: "Nuevo equipo agregado correctamente",
    equipo: {
      id: equipo.id,
      nombre: equipo.nombre,
      pais: equipo.pais,
      liga: equipo.liga,
      fundacion: equipo.fundacion,
      cantidadDeTitulosNacionales: equipo.cantidadDeTitulosNacionales,
      cantidadDeTitulosInternacionales: equipo.cantidadDeTitulosInternacionales,
      capacidadEstadio: equipo.capacidadEstadio,
      coloresCamiseta: equipo.coloresCamiseta
    }
  };
}

module.exports = { 
    renderNuevoEquipoJSON, 
    router 
};*/


/*
//ruta DELETE
router.delete('/eliminar/:nombre', datosDesdeControlador.eliminarEquipo);

*/


/*
//Ruta POST para agregar un nuevo equipo
router.post('/agregar', datosDesdeControlador.agregarEquipo);
*/


/*
//Rutas PATCH (actualizar datos específicos)
router.PATCH('/actualizar/nacionales/:nombre', datosDesdeControlador.actualizarTitulosNacionales);
router.PATCH('/actualizar/internacionales/:nombre', datosDesdeControlador.actualizarTitulosInternacionales);
router.PATCH('/actualizar/capacidad/:nombre', datosDesdeControlador.actualizarCapacidad);
*/