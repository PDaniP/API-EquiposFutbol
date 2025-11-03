//Para mostrar la informacion.
//se define que tipo de metodo HTTP se usa y con que funcion.

const datosDesdeControlador = require("../controladores/equipo.controlador");
const express = require('express');
//importa las funcionalidades del objeto router en express.
const router = express.Router();

//ruta para mostrar todos los datos.
router.get('/lista', datosDesdeControlador.mostrarDatos);

//ruta para mostrar equipos por ID.
router.get('/idEquipo/:id', datosDesdeControlador.mostarPorID)

//ruta para mostrar titulos nacionales.
router.get('/nacionales/:nacionales', datosDesdeControlador.mostrarTitulos)

//ruta para mostrar titulos internacionales.
router.get('/internacionales/:internacionales', datosDesdeControlador.mostrarTitulosInter)

//ruta para mostrar capacidad del estadio.
router.get('/capacidad/:capacidad', datosDesdeControlador.mostrarCapacidadEstadio)

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