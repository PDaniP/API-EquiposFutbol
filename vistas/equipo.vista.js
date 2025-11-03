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

//ruta para filtrar por pais y que tengan titulos internacionales  (ej: /pais/España/internacionales)
router.get('/pais/:pais/internacionales', datosDesdeControlador.mostrarEquiposPorPaisConTitulosInt);

//ruta para filtrar por query (ej: /buscar?pais=Italia&liga=Serie A)
router.get('/buscar', datosDesdeControlador.mostrarEquiposConQuery);
/*
Ejemplo de busquedas:
/buscar?pais=Argentina
/buscar?liga=premier
/buscar?titulosInternacionales=10
/buscar?pais=España&titulosNacionales=30
/buscar?pais=Inglaterra&liga=premier&titulosInternacionales=5
*/

//ruta para CREAR un nuevo equipo (usa el metodo POST)
router.post('/crear', datosDesdeControlador.crearEquipo);

//ruta para ELIMINAR un equipo por ID (usa el metodo DELETE)
router.delete('/eliminar/:id', datosDesdeControlador.borrarEquipo);

//ruta para ACTUALIZAR (PATCH) solo los titulos nacionales (ej: PATCH /titulos/nacionales/1  el 1 corresponde al id) se ingresa un objeto {"titulos": 76}
router.patch('/titulos/nacionales/:id', datosDesdeControlador.actualizarTitulosNac);

// Ruta para ACTUALIZAR (PATCH) solo los titulos internacionales (ej: PATCH /titulos/internacionales/1)
router.patch('/titulos/internacionales/:id', datosDesdeControlador.actualizarTitulosInter);



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