//Pido datos al modelo y los envio a vista
const importModelo = require("../modelos/modelo")
const importVista = require("../vistas/vista")


//Funcion para mostrar todos los datos.
function mostrarDatos(req, res) {
    const datos = importModelo.mostrarTodosLosDatos()
    res.status(200).json(datos)
}

//Funcion para mostrar titulos nacionales.
function mostrarTitulos(req, res) {
    const titulo = parseInt(req.params.nacionales)
    const datos = importModelo.titulosNacionales(titulo);
    res.status(200).json(datos)
}

//Funcion para mostrar titulos internacionales
function mostrarTitulosInter(req, res) {
    const titulo = req.params.internacionales
    const datos = importModelo.titulosInternacionales(titulo);
    res.status(200).json(datos)
}

//Funcion para mostrar capacidad del estadio.
function mostrarCapacidadEstadio(req, res) {
    const capacidad = req.params.capacidad
    const datos = importModelo.capEstadio(capacidad);
    res.status(200).json(datos)
}







//Export de funciones.
module.exports = {
    mostrarDatos,
    mostrarTitulos,
    mostrarTitulosInter,
    mostrarCapacidadEstadio,   
}

/*
//modelo para la carga de equipos
const fs = require("fs");

class EquipoControlador {
  static crearEquipo(req, res) {
    const nuevoEquipo = req.body;

    // Validación simple
    if (!nuevoEquipo.nombre || !nuevoEquipo.pais || !nuevoEquipo.liga) {
      return res.status(400).json({
        error: "Faltan datos obligatorios del equipo"
      });
    }

    const equipoCreado = importModelo.EquipoModelo.agregarEquipo(nuevoEquipo);
    
    // Usamos la vista para estructurar la respuesta JSON
    //const respuesta = importVista.renderNuevoEquipoJSON(equipoCreado);

    res.status(201).json({
  mensaje: "Nuevo equipo agregado correctamente",
  equipo: equipoCreado
});



    res.status(201).json(respuesta);
  }
}

//para export
EquipoControlador*/


/*
//Funcion para eliminar equipos por nombre
function eliminarEquipo(req, res) {
  const nombre = req.params.nombre;
  const eliminado = importModelo.eliminarEquipo(nombre);

  if (eliminado) {
    res.status(200).json({ mensaje: `El equipo '${nombre}' fue eliminado correctamente.` });
  } else {
    res.status(404).json({ mensaje: `No se encontró el equipo '${nombre}'.` });
  }
}

//para importar
eliminarEquipo
*/